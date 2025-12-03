import React from "react";
import styles from "./Card.module.scss";
import { BgColors } from "@/lib/Types/Types";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: BgColors;
}

const Card: React.FC<CardProps> = ({ children, className = "", bgColor = "default" }) => (
  <div className={`${styles.card} ${styles[bgColor]} ${className}`}>{children}</div>
);

export default Card;
