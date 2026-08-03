"use client";

import { useCallback, useLayoutEffect } from "react";

const DEFAULT_STORAGE_KEY = "portfolio-home-scroll";

export function useProjectScrollRestoration(
  storageKey = DEFAULT_STORAGE_KEY,
) {
  useLayoutEffect(() => {
    const savedScroll = sessionStorage.getItem(storageKey);
    if (!savedScroll) return;

    const scrollPosition = Number(savedScroll);
    if (!Number.isFinite(scrollPosition)) {
      sessionStorage.removeItem(storageKey);
      return;
    }

    window.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: 'instant' // Overrides any smooth scroll CSS rules
    });
    sessionStorage.removeItem(storageKey);
  }, [storageKey]);

  const saveScrollPosition = useCallback(() => {
    
    console.log(window.scrollY)
    sessionStorage.setItem(storageKey, String(window.scrollY));
  }, [storageKey]);

  return { saveScrollPosition };
}
