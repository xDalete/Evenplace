import React from "react";
import { Plus } from "lucide-react";
import styles from "./SideBar.module.scss";

const AddEventButton: React.FC = () => {
  return (
    <button className={styles.addButton}>
      <Plus size={20} />
      <span>Adicionar Eventos</span>
    </button>
  );
};

export default AddEventButton;
