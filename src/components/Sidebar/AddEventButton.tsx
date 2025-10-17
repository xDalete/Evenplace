import React from "react";
import { LuPlus } from "react-icons/lu";
import styles from "./AddEventButton.module.scss";
import Icon from "../common/Icon";

const AddEventButton: React.FC = () => {
  return (
    <button className={styles.addButton}>
      <Icon icon={LuPlus} />
      <span>Adicionar Eventos</span>
    </button>
  );
};

export default AddEventButton;
