import React from "react";
import styles from "./SideBar.module.scss";
import SidebarItem from "./SideBarItem";

interface SidebarSectionProps {
  title: string;
  items: { icon: React.ReactNode; label: string; href?: string }[];
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <nav className={styles.nav}>
        {items.map((item, index) => (
          <SidebarItem key={index} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </nav>
    </div>
  );
};

export default SidebarSection;
