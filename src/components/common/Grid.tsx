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

const Grid: React.FC<GridProps> = ({ xs = 1, sm, md, lg, gap = "md", children, className = "" }) => {
  const classes = [
    styles.grid,
    xs ? styles[`cols-xs-${xs}`] : "",
    sm ? styles[`cols-sm-${sm}`] : "",
    md ? styles[`cols-md-${md}`] : "",
    lg ? styles[`cols-lg-${lg}`] : "",
    styles[`gap-${gap}`],
    className
  ].join(" ");

  return <div className={classes}>{children}</div>;
};

export default Grid;
