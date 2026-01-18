import React from "react";

import styles from "./SideBarSection.module.scss";

interface SidebarSectionProps {
  children?: React.ReactNode;
  title: string;
}

const SideBarSection: React.FC<SidebarSectionProps> = ({ children, title }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.nav}>{children}</div>
    </div>
  );
};

export default SideBarSection;
