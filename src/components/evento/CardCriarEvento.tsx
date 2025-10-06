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
        <select className="select-localizar">
          <option value="">LOCALIZAR</option>
          {/* Adicione outras opções aqui */}
        </select>
      </Grid>
      <Grid xs={6} className={styles.elementosDireita}>
        <select className="select-localizar">
          <option value="">FILTRO: Status</option>
          {/* Adicione outras opções aqui */}
        </select>
        <select className="select-localizar">
          <option value="">DATA</option>
          {/* Adicione outras opções aqui */}
        </select>
      </Grid>
    </Grid>
    </Card>
  );
};

export default CardCriarEvento;
