import React from "react";
import styles from "./SideBarItem.module.scss";
import Link from "next/link";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

const SideBarItem: React.FC<SidebarItemProps> = ({ icon, label, href = "#" }) => {
  return (
    <Link href={href} className={styles.navItem}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default SideBarItem;
