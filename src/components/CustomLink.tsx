import React from "react";
import Link, { LinkProps } from "next/link";
import styles from "./CustomLink.module.scss";

interface CustomLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={`${styles.customLink} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
