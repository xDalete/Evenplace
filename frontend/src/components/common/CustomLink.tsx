import Link, { LinkProps } from "next/link";
import React from "react";

import { Sizes } from "@/lib/Types/Types";

import styles from "./CustomLink.module.scss";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  size?: Sizes;
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, className, size = "md", ...rest }) => {
  return (
    <Link className={`${styles.customLink} ${styles[`size-${size}`]} ${className}`} {...rest}>
      {children}
    </Link>
  );
};

export default CustomLink;
