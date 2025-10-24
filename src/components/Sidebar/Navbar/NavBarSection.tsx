import React from "react";
import styles from "./NavBarSection.module.scss";

interface NavBarSectionProps {
  title: string;
  children?: React.ReactNode;
}

const NavBarSection: React.FC<NavBarSectionProps> = ({ title, children }) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.nav}>{children}</div>
    </div>
  );
};

export default NavBarSection;