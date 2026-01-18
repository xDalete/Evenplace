"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react"; // ← Make sure to import React

import { getEventoById } from "@/api/Evento";
import Card from "@/components/common/Card";
import Loading from "@/components/common/Loading";
import { Evento } from "@/lib/Types/EventTypes";

import EventConfigHeader from "./components/EventConfigHeader";
import EventForm from "./components/EventForm";
import styles from "./ConfigurarEvento.module.scss";

export default function ConfigurarEvento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [evento, setEvento] = useState<Evento | undefined>(undefined);

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const eventoData = await getEventoById(id);
        setEvento(eventoData.data);
      } catch (error) {
        console.error("Error fetching event:", error);
        setEvento(undefined);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!evento) {
    //TODO: Mostrar mensagem de erro mais amigável
    return <div>Evento não encontrado</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.contentCard}>
        <EventConfigHeader onBack={handleBack} />
        <EventForm evento={evento} loading={loading} />
      </Card>
    </div>
  );
}
