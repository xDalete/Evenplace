import { Variants } from "@/lib/Types/Types";
import React from "react";
import { IconType } from "react-icons";
import styles from "./Icon.module.scss";

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  icon: IconType;
  size?: number | string;
  color?: Variants | string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 24, color = "", className = "" }) => {
  return typeof styles[color] !== "undefined" ? (
    <IconComponent size={size} className={`${styles[color]} ${className}`} />
  ) : (
    <IconComponent size={size} className={`${className}`} color={color} />
  );
};

export default Icon;
