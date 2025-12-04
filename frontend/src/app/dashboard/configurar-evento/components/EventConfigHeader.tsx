import React from "react";
import { LuArrowLeft } from "react-icons/lu";
import Icon from "@/components/common/Icon";
import styles from "./EventConfigHeader.module.scss";

interface EventConfigHeaderProps {
  onBack?: () => void;
}

const EventConfigHeader: React.FC<EventConfigHeaderProps> = ({ onBack }) => {
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={onBack} type="button">
        <Icon icon={LuArrowLeft} size={24} />
      </button>
      <h2 className={styles.title}>Configuração de Eventos</h2>
    </div>
  );
};

export default EventConfigHeader;
