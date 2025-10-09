import React from "react";
import styles from "./Container.module.scss";
import { Sizes } from "@/lib/Types/Types";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  margin?: Sizes;
  padding?: Sizes;
};

const Container: React.FC<ContainerProps> = ({ margin, padding, children, className = "", ...props }) => {
  const classes = [
    styles.container,
    margin ? styles[`margin-${margin}`] : "",
    padding ? styles[`padding-${padding}`] : "",
    className
  ].join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Container;
