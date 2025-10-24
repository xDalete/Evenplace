import React from "react";
import styles from "./NavBarItem.module.scss";
import Link from "next/link";

interface NavBarItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

const NavBarItem: React.FC<NavBarItemProps> = ({ icon, label, href = "#" }) => {
  return (
    <Link href={href} className={styles.navItem}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default NavBarItem;