import React from "react";
import Button from "@/components/common/Button";
import { LuArrowLeft } from "react-icons/lu";
import Icon from "@/components/common/Icon";
import styles from "./EventConfigHeader.module.scss";

interface EventConfigHeaderProps {
  onSave?: () => void;
  onInsight?: () => void;
  onBack?: () => void;
}

const EventConfigHeader: React.FC<EventConfigHeaderProps> = ({ onSave, onInsight, onBack }) => {
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={onBack} type="button">
        <Icon icon={LuArrowLeft} size={24} />
      </button>
      <h2 className={styles.title}>Configuração de Eventos</h2>
      <div className={styles.actions}>
        <Button variant="primary" onClick={onSave}>
          Salvar
        </Button>
        <Button variant="secondary" onClick={onInsight}>
          Insight
        </Button>
      </div>
    </div>
  );
};

export default EventConfigHeader;

