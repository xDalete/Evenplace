import React from "react";

import { BgColors } from "@/lib/Types/Types";

import styles from "./Card.module.scss";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: BgColors;
}

const Card: React.FC<CardProps> = ({ bgColor = "default", children, className = "" }) => (
  <div className={`${styles.card} ${styles[bgColor]} ${className}`}>{children}</div>
);

export default Card;
