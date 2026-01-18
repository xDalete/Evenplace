import React from "react";

import styles from "./Button.module.scss";
import Loading from "./Loading";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  variant?: "danger" | "info" | "primary" | "secondary" | "success" | "warning";
};

const Button: React.FC<ButtonProps> = ({ children, fullWidth = false, loading, variant = "primary", ...rest }) => {
  return (
    <button className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} ${styles[variant]}`} {...rest}>
      {!loading ? children : <Loading />}
    </button>
  );
};

export default Button;
