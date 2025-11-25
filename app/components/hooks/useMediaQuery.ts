"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setIsMatch(event.matches);

    setIsMatch(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return isMatch;
}
