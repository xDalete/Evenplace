import React from "react";
import { LuPlus } from "react-icons/lu";

import Icon from "../common/Icon";
import styles from "./AddEventButton.module.scss";

const AddEventButton: React.FC = () => {
  return (
    <button className={styles.addButton}>
      <Icon icon={LuPlus} />
      <span>Adicionar Eventos</span>
    </button>
  );
};

export default AddEventButton;
