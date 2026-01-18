"use client";

import React, { useEffect, useMemo } from "react";
import { FaUpload } from "react-icons/fa";

import Icon from "./Icon";
import Image from "./Image";
import styles from "./ImageFileInput.module.scss"; // Create this SCSS file for styling

interface ImageFileInputProps {
  accept?: string;
  fullWidth?: boolean;
  initialPreviewUrl?: string;
  label?: string;
  name: string;
  onChange: (file: File | null) => void;
  preview?: boolean;
  value?: File | null;
}

const ImageFileInput: React.FC<ImageFileInputProps> = ({
  accept = "image/*",
  fullWidth = true,
  initialPreviewUrl,
  label = "Image",
  name,
  onChange,
  preview = true,
  value
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const previewUrl = useMemo(() => {
    if (!preview) return null;
    if (!value) return initialPreviewUrl;
    return URL.createObjectURL(value);
  }, [preview, value, initialPreviewUrl]);

  useEffect(() => {
    if (!previewUrl) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ""}`}>
      {label && <label className={`${styles.label}`}>{label}</label>}

      <input
        accept={accept}
        className={styles.input}
        id={name}
        name={name}
        onChange={handleFileChange}
        type="file"
      ></input>
      <label className={styles.uploadLabel} htmlFor={name}>
        {preview && previewUrl && (
          <Image alt="Preview" className={styles.preview} height={1000} src={previewUrl} width={700} />
        )}
        <div className={styles.overlay}>
          <Icon icon={FaUpload} />
          Upload image
        </div>
      </label>
    </div>
  );
};

export default ImageFileInput;
