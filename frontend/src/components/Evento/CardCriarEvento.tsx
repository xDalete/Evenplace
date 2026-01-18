"use client";
import React from "react";

import Button from "../common/Button";
import Card from "../common/Card";
import Grid from "../common/Grid";
import Input from "../common/Input";
import Select from "../common/Select";
import styles from "./CardCriarEvento.module.scss";

interface CardCriarEventoProps {
  className?: string;
}

const CardCriarEvento: React.FC<CardCriarEventoProps> = ({ className }) => {
  return (
    <Card className={className}>
      <Grid gap="md">
        <Grid className={styles.itemGroup} item md={4} sm={6} xs={12}>
          <h1>Criar Evento</h1>
          <div className={styles.row}>
            <Button fullWidth>Novo Evento</Button>
            <Select
              fullWidth
              onChange={() => {}}
              options={[{ label: "Opção 1", value: "1" }]}
              placeholder="Localizar"
              value=""
            />
          </div>
        </Grid>
        <Grid item md={4} xs={0}></Grid>
        <Grid className={styles.itemGroup} item md={4} sm={6} xs={12}>
          <Input fullWidth placeholder="LOCALIZAR" type="text" />
          <div className={styles.row}>
            <Select
              fullWidth
              onChange={() => {}}
              options={[{ label: "Opção 1", value: "1" }]}
              placeholder="Filtro"
              value=""
            />
            <Input
              fullWidth
              onChange={e => {
                console.log(e);
              }}
              placeholder="Data"
              type="date"
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardCriarEvento;
