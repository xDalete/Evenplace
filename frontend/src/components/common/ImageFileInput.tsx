"use client";

import React, { useState } from "react";
import { FaImage, FaUpload } from "react-icons/fa";
import styles from "./ImageFileInput.module.scss"; // Create this SCSS file for styling

interface ImageFileInputProps {
  label?: string;
  name: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  fullWidth?: boolean;
  preview?: boolean;
}

const ImageFileInput: React.FC<ImageFileInputProps> = ({
  label = "Image",
  name,
  value,
  onChange,
  accept = "image/*",
  fullWidth = true,
  preview = true,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);

    if (file && preview) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Cleanup on unmount
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ""}`}>
      <label htmlFor={name} className={styles.label}>
        <FaImage className={styles.icon} />
        {label}
      </label>
      <input
        id={name}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className={styles.input}
      />
      <label htmlFor={name} className={styles.uploadLabel}>
        <FaUpload className={styles.uploadIcon} />
        Choose Image
      </label>
      {preview && previewUrl && (
        <img src={previewUrl} alt="Preview" className={styles.preview} />
      )}
    </div>
  );
};

export default ImageFileInput;