import React from "react";
import styles from "./Card.module.scss";
import { BgColors } from "@/lib/Types/Types";
import { EventStatus } from "@/lib/Types/EventTypes";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: BgColors;
  status?: EventStatus;
}

const Card: React.FC<CardProps> = ({ children, className = "", bgColor = "default", status = "" }) => (
  <div className={`${styles.card} ${styles[bgColor]} ${className} ${styles[status]}`}>{children}</div>
);

export default Card;
