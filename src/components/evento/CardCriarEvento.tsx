import React from "react";
import styles from "./CardCriarEvento.module.scss";
import Card from "../Card";
import { EventWithInfo } from "@/lib/Types/EventTypes";
import Button from "../Button";
import Grid from "../Grid";

type CardCriarEventoProps = {
  evento: EventWithInfo;
};

const CardCriarEvento: React.FC<CardCriarEventoProps> = () => {
  return (
    <Card>
      <Grid className={styles.cardHeader}>
        <h1>Criar Evento</h1>
        <input type="text" placeholder="LOCALIZAR" />
      </Grid>

    <Grid xs={12} className={styles.rowInfo}>
      <Grid xs={6} className={styles.elementosEsquerda}>
        <Button>Pesquisar</Button>
        <select className={styles["select-localizar"]}>
          <option value="">LOCALIZAR</option>
          {/* Adicione outras opções aqui */}
        </select>
      </Grid>
      <Grid xs={6} className={styles.elementosDireita}>
        <select className={styles["select-localizar"]}>
          <option value="">FILTRO:  Status</option>
          {/* Adicione outras opções aqui */}
        </select>
        <select className={styles["select-localizar"]}>
          <option value="">DATA</option>
          {/* Adicione outras opções aqui */}
        </select>
      </Grid>
    </Grid>
    </Card>
    //  <div className={styles["eventos-container"]}>
    //   <div className={styles["header-eventos"]}>
    //     <h1 className={styles["titulo"]}>Criar Eventos</h1>
    //     <div className={styles["acoes-esquerda"]}>
    //       <button className={styles["btn-novo-evento"]}>
    //        Novo Evento
    //       </button>
    //       <select className={styles["select-localizar"]}>
    //         <option value="">LOCALIZAR</option>
    //         {/* Adicione outras opções aqui */}
    //       </select>
    //     </div>
    //     <div className={styles["acoes-direita"]}>
    //       <div className={styles["campo-busca"]}>
    //         <input className={styles["icone-busca"]} type="text" placeholder="LOCALIZAR" />
    //       </div>
    //       <select className={styles["filtro-status"]}>
    //         <option value="">FILTRO: Status</option>
    //         {/* Adicione outras opções de status aqui */}
    //       </select>
    //       <button className={styles["btn-data"]}>
    //         DATA
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CardCriarEvento;
