import Link, { type LinkProps } from "next/link";
import React from "react";

import styles from "./SideBarItem.module.scss";
type SidebarItemProps = LinkProps & {
  icon: React.ReactNode;
  label: string;
};

const SideBarItem: React.FC<SidebarItemProps> = ({ icon, label, ...props }) => {
  return (
    <Link className={styles.navItem} {...props}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default SideBarItem;
