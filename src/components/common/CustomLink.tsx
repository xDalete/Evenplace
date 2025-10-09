import React from "react";
import Link, { LinkProps } from "next/link";
import styles from "./CustomLink.module.scss";
import { Sizes } from "@/lib/Types/Types";

interface CustomLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  size?: Sizes;
}

const CustomLink: React.FC<CustomLinkProps> = ({ size = "md", children, className, ...props }) => {
  return (
    <Link className={`${styles.customLink} ${styles[`size-${size}`]} ${className}`} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
