import React from "react";

import styles from "./Select.module.scss";

export interface Option {
  label: string;
  value: number | string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  error,
  fullWidth = false,
  helperText,
  label,
  onChange,
  options,
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
        <option className={styles.option} key={option.value} value={option.value}>
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
