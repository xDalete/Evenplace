import React, { ReactNode } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`${styles.card} ${className}`}>{children}</div>
);

export default Card;
