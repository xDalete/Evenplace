import React, { HtmlHTMLAttributes, TextareaHTMLAttributes } from "react";

import styles from "./Textarea.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  label?: string;
  TextareaContainerProps?: HtmlHTMLAttributes<HTMLDivElement>;
}

const Textarea: React.FC<TextareaProps> = ({
  error,
  fullWidth = false,
  helperText,
  label,
  TextareaContainerProps,
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
