"use client";

import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import useTheme from "@/lib/hooks/useTheme";

import Icon from "../common/Icon";
import styles from "./ThemeToggle.module.scss";


const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className={styles.ThemeToggle} onClick={toggleTheme}>
      {theme === "light" ? <Icon icon={MdOutlineLightMode} size={16} /> : <Icon icon={MdOutlineDarkMode} size={16} />}
    </div>
  );
};

export default ThemeToggle;
