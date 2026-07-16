"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PageLoader from "./PageLoader";

const LoaderContext = createContext(null);

// Time to let child effects register a blocker before we assume there are none.
const GRACE_WINDOW_MS = 150;
// One stuck asset must never hang the whole site.
const SAFETY_TIMEOUT_MS = 4000;

export function LoaderProvider({ children }) {
  const blockersRef = useRef(new Set());
  const hasWipedRef = useRef(false);
  const graceTimerRef = useRef(null);
  const safetyTimerRef = useRef(null);

  const [shouldWipe, setShouldWipe] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const attemptWipe = useCallback(() => {
    if (hasWipedRef.current) return;
    if (blockersRef.current.size > 0) return;
    hasWipedRef.current = true;
    clearTimeout(safetyTimerRef.current);
    setShouldWipe(true);
  }, []);

  const addBlocker = useCallback((id) => {
    // Too late to block — curtain has already committed to wiping.
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

  useEffect(() => {
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

  const handleRevealed = useCallback(() => setIsRevealed(true), []);

  return (
    <LoaderContext.Provider value={{ addBlocker, removeBlocker, isRevealed }}>
      <PageLoader shouldWipe={shouldWipe} onRevealed={handleRevealed} />
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