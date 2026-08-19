"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * The server can't know the preference. Assume motion is fine and let the
 * client correct on hydration — the alternative (assuming reduce) would ship
 * every visitor a static page and only start the counters after hydration.
 */
function getServerSnapshot() {
  return false;
}

/**
 * Reads the OS reduced-motion preference and re-renders when it changes.
 * useSyncExternalStore rather than an effect + setState: the value is derived
 * from an external system, so it doesn't need a synchronous state write on
 * mount (which React 19 flags as a cascading render).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
