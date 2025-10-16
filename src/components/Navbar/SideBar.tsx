import React from "react";
import {
  LuChartBar,
  LuSettings,
  LuDollarSign,
  LuTrendingUp,
  LuFileText,
  LuHeadphones,
  LuBell,
  LuUser,
  LuLogOut
} from "react-icons/lu";
import styles from "./SideBar.module.scss";
import AddEventButton from "./AddEventButton";
import SideBarSection from "./SideBarSection";
import Image from "next/image";
import Divider from "../common/Divider";
import Container from "../common/Container";
import Icon from "../common/Icon";
import SideBarItem from "./SideBarItem";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <Container padding="md" className={styles.sidebar}>
      <nav>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Logo Evenplace" width={40} height={40} className={styles.logoIcon} />
            <span className={styles.logoText}>Evenplace</span>
          </div>
          <AddEventButton />
        </Link>
        <Divider margin="md" />
        <SideBarSection title="Principal">
          <SideBarItem icon={<Icon icon={LuChartBar} />} label={"Visualização de Eventos"} href="#" />
          <SideBarItem icon={<Icon icon={LuSettings} />} label={"Configurar Eventos"} href="#" />
          <SideBarItem icon={<Icon icon={LuDollarSign} />} label={"Ingressos"} href="#" />
          <SideBarItem icon={<Icon icon={LuTrendingUp} />} label={"Dados Estatísticos"} href="#" />
          <SideBarItem icon={<Icon icon={LuFileText} />} label={"Relatório"} href="#" />
        </SideBarSection>
        <Divider margin="md" />
        <SideBarSection title="Atendimento">
          <SideBarItem icon={<Icon icon={LuHeadphones} />} label={"Contatar Suporte"} href="#" />
          <SideBarItem icon={<Icon icon={LuBell} />} label={"Notificações"} href="#" />
          <SideBarItem icon={<Icon icon={LuSettings} />} label={"Configurações"} href="#" />
        </SideBarSection>
        <Divider margin="md" />
        <SideBarSection title="Conta">
          <SideBarItem icon={<Icon icon={LuUser} />} label={"Usuário"} href="#" />
          <SideBarItem icon={<Icon icon={LuLogOut} />} label={"Sair"} href="#" />
        </SideBarSection>
      </nav>
    </Container>
  );
};

export default Sidebar;
