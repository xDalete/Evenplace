"use client";
import { useEffect, useState } from "react";

import { getAllEventos } from "@/api/Evento";
import Card from "@/components/common/Card";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import Loading from "@/components/common/Loading";
import CardCriarEvento from "@/components/Evento/CardCriarEvento";
import CardEvento from "@/components/Evento/CardEvento";
// CORREÇÃO 1: Importamos 'Evento' em vez de 'EventWithInfo'
import { Evento } from "@/lib/Types/EventTypes";

import styles from "./Home.module.scss";

export default function Home() {
  // CORREÇÃO 2: Definimos o estado como uma lista de 'Evento' (Português)
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    getAllEventos()
      .then(response => {
        // Agora o TypeScript aceita, pois response.data deve ser do tipo Evento[]
        setEventos(response.data);
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
            {eventos.map(item => (
              <Grid item key={item.id} md={4} sm={6} xl={3} xs={12}>
                {/* CORREÇÃO 3: O componente espera a prop 'evento' */}
                <CardEvento evento={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Container className={styles.loadingContainer}>
            <Loading />
          </Container>
        )}
      </Card>
    </div>
  );
}
