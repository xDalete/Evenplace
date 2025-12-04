import React from "react";
import Link, { LinkProps } from "next/link";
import styles from "./CustomLink.module.scss";
import { Sizes } from "@/lib/Types/Types";

interface CustomLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  size?: Sizes;
}

const CustomLink: React.FC<CustomLinkProps> = ({ size = "md", children, className, ...rest }) => {
  return (
    <Link className={`${styles.customLink} ${styles[`size-${size}`]} ${className}`} {...rest}>
      {children}
    </Link>
  );
};

export default CustomLink;
