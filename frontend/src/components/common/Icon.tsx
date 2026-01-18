import React from "react";
import { IconType } from "react-icons";

import { Variants } from "@/lib/Types/Types";

import styles from "./Icon.module.scss";

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  color?: string | Variants;
  icon: IconType;
  size?: number | string;
}

const Icon: React.FC<IconProps> = ({ className = "", color = "", icon: IconComponent, size = 24 }) => {
  return typeof styles[color] !== "undefined" ? (
    <IconComponent className={`${styles[color]} ${className}`} size={size} />
  ) : (
    <IconComponent className={`${className}`} color={color} size={size} />
  );
};

export default Icon;
