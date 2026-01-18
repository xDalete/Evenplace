// src/lib/hooks/useTheme.ts
"use client"; // ← THIS IS REQUIRED

import { useEffect, useState } from "react";

const THEME_KEY = "theme";

type Theme = "dark" | "light";

function useTheme() {
  const [theme, setTheme] = useState<Theme>("light"); // temporary fallback

  // Runs only in the browser (after mount + on every render)
  useEffect(() => {
    // 1. Read the real initial value
    const stored = localStorage.getItem(THEME_KEY) as null | Theme;

    const initial =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    localStorage.setItem(THEME_KEY, initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return [theme, setTheme] as const;
}

export default useTheme;
