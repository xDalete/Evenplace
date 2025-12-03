"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Grid from "@/components/common/Grid";
import styles from "./EventForm.module.scss";
import { EventImage } from "./EventImage";
import { EventWithInfo } from "@/lib/Types/EventTypes";
import { getEventoById } from "@/api/Evento";

export const EventForm: React.FC = () => {
  const [eventData, setEventData] = useState<EventWithInfo>();

  useEffect(() => {
    getEventoById("1").then(data => {
      setEventData(data);
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
                value={eventData.name}
                onChange={e => setEventData({ ...eventData, name: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Data do Evento"
                type="date"
                value={eventData.startDate}
                onChange={e => setEventData({ ...eventData, startDate: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Input
                label="Local do Evento"
                value={eventData.location}
                onChange={e => setEventData({ ...eventData, location: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Horário do Evento"
                type="time"
                value={eventData.attendeesCount}
                onChange={e => setEventData({ ...eventData, attendeesCount: e.target.value })}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Textarea
        label="Descrição do Evento"
        value={eventData.description}
        placeholder="INSIRA UMA DESCRIÇÃO"
        onChange={e => setEventData({ ...eventData, description: e.target.value })}
        fullWidth
      />

      <Grid gap="md">
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Valor do Ingresso"
            value={eventData.ticketsPrice}
            onChange={e => setEventData({ ...eventData, ticketsPrice: parseFloat(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Quantidade de Vagas Totais"
            value={eventData.attendeesLimit}
            onChange={e => setEventData({ ...eventData, attendeesLimit: parseInt(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Vagas disponíveis"
            value={eventData.attendeesCount}
            onChange={e => setEventData({ ...eventData, attendeesCount: parseInt(e.target.value) })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Meta de Vendas"
            value={eventData.ticketsAvailable}
            onChange={e => setEventData({ ...eventData, ticketsAvailable: parseInt(e.target.value) })}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EventForm;
