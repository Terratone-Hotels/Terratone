"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// Static import — dynamic/ssr:false caused a frame (or more) with no curtain = hero flash.
import PageLoader from "./PageLoader";

const LoaderContext = createContext(null);

// Time to let child effects register a blocker before we assume there are none.
const GRACE_WINDOW_MS = 150;
// One stuck asset must never hang the whole site.
const SAFETY_TIMEOUT_MS = 4000;

/**
 * Mobile / touch / reduced-motion: no curtain (LCP / SI).
 * Desktop: branded wipe from the very first paint (no hero flash).
 */
export function shouldSkipCurtain() {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  return coarse || narrow || reduceMotion;
}

export function LoaderProvider({ children }) {
  const blockersRef = useRef(new Set());
  const hasWipedRef = useRef(false);
  const graceTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);

  const [shouldWipe, setShouldWipe] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  // TRUE on first render so desktop never paints hero without a black cover.
  // Mobile clears this in useLayoutEffect before the browser paints.
  const [showCurtain, setShowCurtain] = useState(true);

  const attemptWipe = useCallback(() => {
    if (hasWipedRef.current) return;
    if (blockersRef.current.size > 0) return;
    hasWipedRef.current = true;
    clearTimeout(safetyTimerRef.current);
    setShouldWipe(true);
  }, []);

  const addBlocker = useCallback((id) => {
    if (hasWipedRef.current) return;
    blockersRef.current.add(id);
  }, []);

  const removeBlocker = useCallback(
    (id) => {
      blockersRef.current.delete(id);
      attemptWipe();
    },
    [attemptWipe],
  );

  useLayoutEffect(() => {
    if (shouldSkipCurtain()) {
      hasWipedRef.current = true;
      setShowCurtain(false);
      setIsRevealed(true);
      return;
    }

    // Desktop: curtain already on screen from first render — start wipe timers only.
    graceTimerRef.current = setTimeout(attemptWipe, GRACE_WINDOW_MS);
    safetyTimerRef.current = setTimeout(() => {
      hasWipedRef.current = true;
      setShouldWipe(true);
    }, SAFETY_TIMEOUT_MS);

    return () => {
      clearTimeout(graceTimerRef.current);
      clearTimeout(safetyTimerRef.current);
    };
  }, [attemptWipe]);

  const handleRevealed = useCallback(() => {
    setIsRevealed(true);
    // Unmount after wipe so we don't leave a display:none layer forever
    setShowCurtain(false);
  }, []);

  return (
    <LoaderContext.Provider value={{ addBlocker, removeBlocker, isRevealed }}>
      {showCurtain && (
        <PageLoader shouldWipe={shouldWipe} onRevealed={handleRevealed} />
      )}
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return ctx;
}
