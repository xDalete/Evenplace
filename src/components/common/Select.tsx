import React from "react";
import styles from "./Select.module.scss";

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string | number;
  error?: boolean;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  error,
  fullWidth = false,
  onChange,
  placeholder,
  ...rest
}) => (
  <select
    value={value}
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
);

export default Select;
