import React from "react";

import { Sizes } from "@/lib/Types/Types";

import styles from "./Divider.module.scss";

type DividerProps = {
  className?: string;
  margin?: Sizes;
};

const Divider: React.FC<DividerProps> = ({ className, margin }) => (
  <hr className={`${styles.divider} ${styles[`margin-${margin}`]} ${className}`} />
);

export default Divider;
