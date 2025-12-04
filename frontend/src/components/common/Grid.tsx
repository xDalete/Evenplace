import React from "react";
import styles from "./Grid.module.scss";
import { ColumnSize, Sizes } from "@/lib/Types/Types";

type GridProps = {
  item?: false;
  gap?: Sizes;
  children: React.ReactNode;
  className?: string;
};
type GridItemProps = React.HTMLAttributes<HTMLDivElement> & {
  item: true;
  xs?: ColumnSize;
  sm?: ColumnSize;
  md?: ColumnSize;
  lg?: ColumnSize;
  xl?: ColumnSize;
};

const Grid: React.FC<GridProps | GridItemProps> = ({ children, className = "", ...rest }) => {
  if (rest.item) {
    const { xs = 12, sm, md, lg, xl } = rest;
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
