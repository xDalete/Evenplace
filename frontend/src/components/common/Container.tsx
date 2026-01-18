import React from "react";

import { Sizes } from "@/lib/Types/Types";

import styles from "./Container.module.scss";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  margin?: Sizes;
  padding?: Sizes;
};

const Container: React.FC<ContainerProps> = ({ children, className = "", margin, padding, ...rest }) => {
  const classes = [
    styles.container,
    margin ? styles[`margin-${margin}`] : "",
    padding ? styles[`padding-${padding}`] : "",
    className
  ].join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Container;
