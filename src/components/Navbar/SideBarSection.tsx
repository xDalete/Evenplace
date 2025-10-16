import React from "react";
import styles from "./SideBarSection.module.scss";

interface SidebarSectionProps {
  title: string;
  children?: React.ReactNode;
}

const SideBarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.nav}>{children}</div>
    </div>
  );
};

export default SideBarSection;
