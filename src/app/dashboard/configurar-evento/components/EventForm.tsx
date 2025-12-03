"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Grid from "@/components/common/Grid";
import styles from "./EventForm.module.scss";
import { EventImage } from "./EventImage";
import { getEventoById } from "@/api/Evento";
import { Evento } from "@/lib/Types/EventTypes";

export const EventForm: React.FC = () => {
  const [eventData, setEventData] = useState<Evento>();

  useEffect(() => {
    getEventoById(1).then(response => {
      setEventData(response.data);
    });
  }, []);
  if (!eventData) {
    return <div>Carregando...</div>;
  }
  return (
    <div className={styles.formContainer}>
      <Grid gap="md">
        <Grid item xs={12} md={4}>
          <EventImage />
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid gap="md">
            <Grid item xs={12} sm={6}>
              <Input
                label="Nome do Evento"
                value={eventData.nome}
                onChange={e => setEventData({ ...eventData, nome: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Data do Evento"
                type="date"
                value={eventData.data}
                onChange={e => setEventData({ ...eventData, data: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label="Local do Evento"
                value={eventData.local}
                onChange={e => setEventData({ ...eventData, local: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Horário do Evento"
                type="time"
                value={eventData.horario}
                onChange={e => setEventData({ ...eventData, horario: e.target.value })}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Textarea
        label="Descrição do Evento"
        value={eventData.descricao}
        placeholder="INSIRA UMA DESCRIÇÃO"
        onChange={e => setEventData({ ...eventData, descricao: e.target.value })}
        fullWidth
      />

      <Grid gap="md">
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Valor do Ingresso"
            value={eventData.valor_ingresso}
            onChange={e => setEventData({ ...eventData, valor_ingresso: parseFloat(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Quantidade de Vagas Totais"
            value={eventData.quantidade_vagas}
            onChange={e => setEventData({ ...eventData, quantidade_vagas: parseInt(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Vagas disponíveis"
            value={eventData.vagas_disponiveis}
            onChange={e => setEventData({ ...eventData, vagas_disponiveis: parseInt(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Meta de Vendas"
            value={eventData.meta_vendas}
            onChange={e => setEventData({ ...eventData, meta_vendas: parseInt(e.target.value) })}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EventForm;
