import React from "react";

import { ColumnSize, Sizes } from "@/lib/Types/Types";

import styles from "./Grid.module.scss";

type GridItemProps = React.HTMLAttributes<HTMLDivElement> & {
  item: true;
  lg?: ColumnSize;
  md?: ColumnSize;
  sm?: ColumnSize;
  xl?: ColumnSize;
  xs?: ColumnSize;
};
type GridProps = {
  children: React.ReactNode;
  className?: string;
  gap?: Sizes;
  item?: false;
};

const Grid: React.FC<GridItemProps | GridProps> = ({ children, className = "", ...rest }) => {
  if (rest.item) {
    const { lg, md, sm, xl, xs = 12 } = rest;
    const classes = [
      styles.gridItem,
      xs != undefined ? styles[`cols-xs-${xs}`] : "",
      sm != undefined ? styles[`cols-sm-${sm}`] : "",
      md != undefined ? styles[`cols-md-${md}`] : "",
      lg != undefined ? styles[`cols-lg-${lg}`] : "",
      xl != undefined ? styles[`cols-xl-${xl}`] : "",
      className
    ].join(" ");
    return <div className={classes}>{children}</div>;
  } else {
    const { gap } = rest;
    const classes = [styles.grid, gap ? styles[`gap-${gap}`] : "", className].join(" ");
    return <div className={classes}>{children}</div>;
  }
};

export default Grid;
