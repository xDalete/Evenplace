"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import styles from "./ThemeToggle.module.scss";

const THEME_KEY = "theme";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme =
      stored === "dark" || stored === "light"
        ? stored
        : prefersDark
          ? "dark"
          : "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    localStorage.setItem(THEME_KEY, initialTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      return newTheme;
    });
  };

  if (!isMounted) {
    return (
      <button className={styles.ThemeToggle}>
        <MdOutlineLightMode size={24} />
      </button>
    );
  }

  return (
    <div className={styles.ThemeToggle} onClick={toggleTheme}>
      {theme === "light" ? (
        <MdOutlineLightMode size={24} />
      ) : (
        <MdOutlineDarkMode size={24} />
      )}
    </div>
  );
};

export default ThemeToggle;
