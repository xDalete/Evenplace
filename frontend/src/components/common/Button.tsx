import React from "react";
import styles from "./Button.module.scss";
import Loading from "./Loading";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "warning" | "success" | "info";
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, fullWidth = false, loading, ...rest }) => {
  return (
    <button className={`${styles.button} ${fullWidth ? styles.fullWidth : ""} ${styles[variant]}`} {...rest}>
      {!loading ? children : <Loading />}
    </button>
  );
};

export default Button;
