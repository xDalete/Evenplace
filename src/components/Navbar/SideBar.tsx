import React from "react";
import { BarChart3, Settings, DollarSign, TrendingUp, FileText, Headphones, Bell, User, LogOut } from "lucide-react";
import styles from "./Sidebar.module.scss";
import AddEventButton from "./AddEventButton";
import SidebarSection from "./SideBarSection";
import Image from "next/image";
import Divider from "../Divider";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src="/LOGO.png" alt="Logo Evenplace" width={40} height={40} className={styles.logoIcon} />
          <span className={styles.logoText}>Evenplace</span>
        </div>
        <AddEventButton />
      </div>

      <Divider />

      <SidebarSection
        title="Principal"
        items={[
          { icon: <BarChart3 size={20} />, label: "Visualização de Eventos" },
          { icon: <Settings size={20} />, label: "Configurar Eventos" },
          { icon: <DollarSign size={20} />, label: "Ingressos" },
          { icon: <TrendingUp size={20} />, label: "Dados Estatísticos" },
          { icon: <FileText size={20} />, label: "Relatório" }
        ]}
      />

      <Divider />

      <SidebarSection
        title="Atendimento"
        items={[
          { icon: <Headphones size={20} />, label: "Contatar Suporte" },
          { icon: <Bell size={20} />, label: "Notificações" },
          { icon: <Settings size={20} />, label: "Configurações" }
        ]}
      />

      <Divider />

      <SidebarSection
        title="Conta"
        items={[
          { icon: <User size={20} />, label: "Usuário" },
          { icon: <LogOut size={20} />, label: "Sair" }
        ]}
      />
    </div>
  );
};

export default Sidebar;
