import React from "react";
import styles from "./Select.module.scss";

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  label?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  fullWidth = false,
  onChange,
  placeholder,
  ...rest
}) => (
  <div>
    {label && <label className={`${styles.label}`}>{label}</label>}
    <select
      className={`${styles.select} ${error ? styles.error : ""} ${fullWidth ? styles.fullWidth : ""}`}
      onChange={onChange}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(option => (
        <option key={option.value} value={option.value} className={styles.option}>
          {option.label}
        </option>
      ))}
    </select>
    {error ? (
      <span className={`${styles.errorText}`}>{error}</span>
    ) : (
      helperText && <span className={`${styles.helperText}`}>{helperText}</span>
    )}
  </div>
);

export default Select;
