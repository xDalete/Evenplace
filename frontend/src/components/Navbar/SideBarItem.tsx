import React from "react";
import styles from "./SideBarItem.module.scss";
import Link, { type LinkProps } from "next/link";
type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
} & LinkProps;

const SideBarItem: React.FC<SidebarItemProps> = ({ icon, label, ...props }) => {
  return (
    <Link className={styles.navItem} {...props}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default SideBarItem;
