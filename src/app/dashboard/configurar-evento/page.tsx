"use client";

import React from "react";
import EventConfigHeader from "@/app/dashboard/configurar-evento/components/EventConfigHeader";
import EventForm from "@/app/dashboard/configurar-evento/components/EventForm";
//import SeatAllocation from "@/components/Evento/SeatAllocation";
import Card from "@/components/common/Card";
import styles from "./ConfigurarEvento.module.scss";

export default function ConfigurarEvento() {
  const handleSave = () => {
    console.log("Salvando evento...");
  };

  const handleInsight = () => {
    console.log("Abrindo insights...");
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.pageContainer}>
      <Card className={styles.contentCard}>
        <EventConfigHeader onSave={handleSave} onInsight={handleInsight} onBack={handleBack} />

        <EventForm />

        <div className={styles.seatSection}>
          {/* <SeatAllocation seats={mockSeats} /> */}
          <div className={styles.placeholderBox} />
        </div>
      </Card>
    </div>
  );
}
