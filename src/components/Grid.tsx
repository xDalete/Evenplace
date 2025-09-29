import React from "react";
import styles from "./Grid.module.scss";
import { ColumnSize, Sizes } from "@/lib/Types/Types";

type GridProps = {
  xs?: ColumnSize;
  sm?: ColumnSize;
  md?: ColumnSize;
  lg?: ColumnSize;
  gap?: Sizes;
  children: React.ReactNode;
  className?: string;
};

const getColClass = (breakpoint: string, value?: ColumnSize) => {
  if (!value) return "";
  return styles[`cols-${breakpoint}-${value}`] || "";
};

const Grid: React.FC<GridProps> = ({ xs = 1, sm, md, lg, gap = "md", children, className = "" }) => {
  const classes = [
    styles.grid,
    getColClass("xs", xs),
    getColClass("sm", sm),
    getColClass("md", md),
    getColClass("lg", lg),
    gap && styles[`gap-${gap}`],
    className
  ].join(" ");

  return <div className={classes}>{children}</div>;
};

export default Grid;
