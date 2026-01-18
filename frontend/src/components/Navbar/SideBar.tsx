"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  LuBell,
  LuChartBar,
  LuDollarSign,
  LuFileText,
  LuHeadphones,
  LuLogOut,
  LuSettings,
  LuTrendingUp,
  LuUser
} from "react-icons/lu";

import { useAuth } from "@/lib/hooks/useAuth";

import Container from "../common/Container";
import Divider from "../common/Divider";
import Icon from "../common/Icon";
import AddEventButton from "./AddEventButton";
import styles from "./SideBar.module.scss";
import SideBarItem from "./SideBarItem";
import SideBarSection from "./SideBarSection";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Container className={styles.sidebar} padding="md">
      <nav>
        <Link href="/">
          <div className={styles.logo}>
            <Image alt="Logo Evenplace" className={styles.logoIcon} height={40} src="/logo.png" width={40} />
            <span className={styles.logoText}>Evenplace</span>
          </div>
          <AddEventButton />
        </Link>
        <Divider margin="md" />
        <SideBarSection title="Principal">
          <SideBarItem href="/dashboard" icon={<Icon icon={LuChartBar} />} label={"Visualização de Eventos"} />
          <SideBarItem
            href="/dashboard/configurar-evento"
            icon={<Icon icon={LuSettings} />}
            label={"Configurar Eventos"}
          />
          <SideBarItem href="#" icon={<Icon icon={LuDollarSign} />} label={"Ingressos"} />
          <SideBarItem
            href="/dashboard/dados-estatisticos"
            icon={<Icon icon={LuTrendingUp} />}
            label={"Dados Estatísticos"}
          />
          <SideBarItem href="#" icon={<Icon icon={LuFileText} />} label={"Relatório"} />
        </SideBarSection>
        <Divider margin="md" />
        <SideBarSection title="Atendimento">
          <SideBarItem href="#" icon={<Icon icon={LuHeadphones} />} label={"Contatar Suporte"} />
          <SideBarItem href="#" icon={<Icon icon={LuBell} />} label={"Notificações"} />
          <SideBarItem href="#" icon={<Icon icon={LuSettings} />} label={"Configurações"} />
        </SideBarSection>
        <Divider margin="md" />
        <SideBarSection title="Conta">
          <SideBarItem href="#" icon={<Icon icon={LuUser} />} label={"Usuário"} />
          <SideBarItem href="#" icon={<Icon icon={LuLogOut} />} label={"Sair"} onClick={logout} />
        </SideBarSection>
      </nav>
    </Container>
  );
};

export default Sidebar;
