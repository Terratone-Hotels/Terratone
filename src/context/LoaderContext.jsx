"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PageLoader from "./PageLoader";

const LoaderContext = createContext(null);

const GRACE_WINDOW_MS = 150;
const SAFETY_TIMEOUT_MS = 4000;

/**
 * Mobile / touch / reduced-motion: no curtain.
 * Desktop: branded wipe from first paint.
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
  // Desktop first paint needs curtain in the tree; CSS hides it on mobile
  // so SSR never paints a black screen under 768px.
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
