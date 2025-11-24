"use client";

import React, { useState } from "react";
import { EventImage } from "./EventImage";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Grid from "@/components/common/Grid";
import styles from "./EventForm.module.scss";

export const EventForm: React.FC = () => {
  const [eventData, setEventData] = useState({
    name: "NOME DO EVENTO",
    date: "2025-07-12",
    location: "LOCAL DO EVENTO",
    time: "19:00:00",
    description: "INSIRA UMA DESCRIÇÃO",
    price: "R$ 40,00",
    totalSeats: "1200 vagas",
    availableSeats: "523 vagas",
    salesGoal: ""
  });

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
                value={eventData.date}
                onChange={e => setEventData({ ...eventData, date: e.target.value })}
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
                value={eventData.time}
                onChange={e => setEventData({ ...eventData, time: e.target.value })}
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
            value={eventData.price}
            onChange={e => setEventData({ ...eventData, price: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Quantidade de Vagas Totais"
            value={eventData.totalSeats}
            onChange={e => setEventData({ ...eventData, totalSeats: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Vagas disponíveis"
            value={eventData.availableSeats}
            onChange={e => setEventData({ ...eventData, availableSeats: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Meta de Vendas"
            value={eventData.salesGoal}
            onChange={e => setEventData({ ...eventData, salesGoal: e.target.value })}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EventForm;

