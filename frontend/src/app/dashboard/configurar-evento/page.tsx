"use client";

import React from "react";
import EventConfigHeader from "@/app/dashboard/configurar-evento/components/EventConfigHeader";
import EventForm from "@/app/dashboard/configurar-evento/components/EventForm";
//import SeatAllocation from "@/components/Evento/SeatAllocation";
import Card from "@/components/common/Card";
import styles from "./ConfigurarEvento.module.scss";
import { useRouter } from "next/navigation";

export default function ConfigurarEvento() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.contentCard}>
        <EventConfigHeader onBack={handleBack} />
        <EventForm />
      </Card>
    </div>
  );
}
