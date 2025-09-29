import React from "react";
import styles from "./SideBar.module.scss";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href = "#" }) => {
  return (
    <a href={href} className={styles.navItem}>
      {icon}
      <span>{label}</span>
    </a>
  );
};

export default SidebarItem;
