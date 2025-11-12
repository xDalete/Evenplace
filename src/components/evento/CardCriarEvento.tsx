"use client";
import React from "react";
import styles from "./CardCriarEvento.module.scss";
import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import Grid from "../common/Grid";

const CardCriarEvento: React.FC = () => {
  return (
    <Card>
      <Grid gap="md">
        <Grid item xs={12} sm={6} md={4} className={styles.itemGroup}>
          <h1>Criar Evento</h1>
          <div className={styles.row}>
            <Button fullWidth>Novo Evento</Button>
            <Select
              fullWidth
              placeholder="Localizar"
              options={[{ value: "1", label: "Opção 1" }]}
              value=""
              onChange={() => {}}
            />
          </div>
        </Grid>
        <Grid item xs={0} md={4}></Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.itemGroup}>
          <Input fullWidth type="text" placeholder="LOCALIZAR" />
          <div className={styles.row}>
            <Select
              fullWidth
              placeholder="Filtro"
              options={[{ value: "1", label: "Opção 1" }]}
              value=""
              onChange={() => {}}
            />
            <Input
              fullWidth
              type="date"
              placeholder="Data"
              onChange={e => {
                console.log(e);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardCriarEvento;
