import React, { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  InputContainerProps?: HtmlHTMLAttributes<HTMLDivElement>;
}

const Input: React.FC<InputProps> = ({ label, error, helperText, InputContainerProps, ...props }) => (
  <div className={styles.inputContainer} {...InputContainerProps}>
    {label && <label className={`${styles.label}`}>{label}</label>}
    <input {...props} className={`${styles.input} ${error ? styles.Error : ""}`} />
    {error ? (
      <span className={`${styles.errorText}`}>{error}</span>
    ) : (
      helperText && <span className={`${styles.helperText}`}>{helperText}</span>
    )}
  </div>
);

export default Input;
