import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "warning" | "success" | "info";
  children: React.ReactNode;
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, fullWidth = false, ...rest }) => {
  return (
    <button className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} ${styles[variant]}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
