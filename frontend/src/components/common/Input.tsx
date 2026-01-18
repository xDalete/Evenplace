import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";

import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  InputContainerProps?: HtmlHTMLAttributes<HTMLDivElement>;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  error,
  fullWidth = false,
  helperText,
  InputContainerProps,
  label,
  ...props
}) => (
  <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ""}`} {...InputContainerProps}>
    {label && <label className={`${styles.label}`}>{label}</label>}
    <input {...props} className={`${styles.input} ${error ? styles.error : ""}`} />
    {error ? (
      <span className={`${styles.errorText}`}>{error}</span>
    ) : (
      helperText && <span className={`${styles.helperText}`}>{helperText}</span>
    )}
  </div>
);

export default Input;
