import React, { HtmlHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  TextareaContainerProps?: HtmlHTMLAttributes<HTMLDivElement>;
  fullWidth?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  TextareaContainerProps,
  fullWidth = false,
  ...props
}) => (
  <div className={`${styles.textareaContainer} ${fullWidth ? styles.fullWidth : ""}`} {...TextareaContainerProps}>
    {label && <label className={`${styles.label}`}>{label}</label>}
    <textarea {...props} className={`${styles.textarea} ${error ? styles.error : ""}`} />
    {error ? (
      <span className={`${styles.errorText}`}>{error}</span>
    ) : (
      helperText && <span className={`${styles.helperText}`}>{helperText}</span>
    )}
  </div>
);

export default Textarea;

