"use client";
import CardEvento from "@/components/Evento/CardEvento";
import Grid from "@/components/common/Grid";
import Card from "@/components/common/Card";
import CardCriarEvento from "@/components/Evento/CardCriarEvento";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import { getAllEventos } from "@/api/Evento";
import { EventWithInfo } from "@/lib/Types/EventTypes";
import Container from "@/components/common/Container";
import Loading from "@/components/common/Loading";

export default function Home() {
  const [eventos, setEventos] = useState<EventWithInfo[]>([]);

  useEffect(() => {
    getAllEventos()
      .then(response => {
        setEventos(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar eventos:", error);
      });
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.stickyHeader}>
        <CardCriarEvento />
      </div>
      <Card className={styles.contentCard}>
        <div className={styles.legendContainer}>
          <div className={styles.legendItem}>
            <div className={`${styles.bolaBase} ${styles.bolaCadastrados}`}></div>
            <span> Cadastrados</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.bolaBase} ${styles.bolaPendentes}`}></div>
            <span> Pendentes</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.bolaBase} ${styles.bolaDisponiveis}`}></div>
            <span> Disponíveis</span>
          </div>
        </div>
        {eventos.length > 0 ? (
          <Grid className={styles.gridContainer} gap="md">
            {eventos.map(evento => (
              <Grid item xs={12} sm={6} md={4} xl={3} key={evento.id}>
                <CardEvento evento={evento} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Container className={styles.loadingContainer}>
            <Loading/>
          </Container>
        )}
      </Card>
    </div>
  );
}
