"use client";

import React, { useState } from "react";
import { 
  LuChartBar, 
  LuSettings, 
  LuDollarSign, 
  LuTrendingUp, 
  LuFileText, 
  LuHeadphones, 
  LuBell, 
  LuUser, 
  LuLogOut,
  LuMenu,
  LuX
} from "react-icons/lu";
import styles from "./NavBar.module.scss";
import AddEventButton from "../AddEventButton";
import NavBarSection from "./NavBarSection";
import Image from "next/image";
import Divider from "@/components/common/Divider";
import Container from "@/components/common/Container";
import Icon from "@/components/common/Icon";
import NavBarItem from "./NavBarItem";
import Link from "next/link";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Container padding="md" className={styles.navbar}>
      <div className={styles.navbarHeader}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Logo Evenplace"
            width={40}
            height={40}
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>Evenplace</span>
        </Link>

        <button className={styles.menuToggle} onClick={toggleMenu}>
          <Icon icon={isMenuOpen ? LuX : LuMenu} />
        </button>
      </div>

      <nav className={`${styles.navContent} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.addButtonWrapper}>
          <AddEventButton />
        </div>

        <Divider margin="md" />

        <NavBarSection title="Principal">
          <NavBarItem 
            icon={<Icon icon={LuChartBar} />} 
            label={"Visualização de Eventos"} 
            href="#" 
          />
          <NavBarItem 
            icon={<Icon icon={LuSettings} />} 
            label={"Configurar Eventos"} 
            href="#" 
          />
          <NavBarItem 
            icon={<Icon icon={LuDollarSign} />} 
            label={"Ingressos"} 
            href="#" 
          />
          <NavBarItem 
            icon={<Icon icon={LuTrendingUp} />} 
            label={"Dados Estatísticos"} 
            href="#" 
          />
          <NavBarItem 
            icon={<Icon icon={LuFileText} />} 
            label={"Relatório"} 
            href="#" 
          />
        </NavBarSection>

        <Divider margin="md" />

        <NavBarSection title="Atendimento">
          <NavBarItem 
            icon={<Icon icon={LuHeadphones} />} 
            label={"Contatar Suporte"} 
            href="#" 
          />
          <NavBarItem 
            icon={<Icon icon={LuBell} />} 
            label={"Notificações"} 
            href="#" 
          />
          <NavBarItem 
            icon={<Icon icon={LuSettings} />} 
            label={"Configurações"} 
            href="#" 
          />
        </NavBarSection>

        <Divider margin="md" />

        <NavBarSection title="Conta">
          <NavBarItem 
            icon={<Icon icon={LuUser} />} 
            label={"Usuário"} 
            href="#" 
          />
          <NavBarItem 
            icon={<Icon icon={LuLogOut} />} 
            label={"Sair"} 
            href="#" 
          />
        </NavBarSection>
      </nav>
    </Container>
  );
};

export default NavBar;