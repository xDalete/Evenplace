"use client";

import React, { useState } from "react";
import EventConfigHeader from "@/components/Evento/EventConfigHeader";
import EventForm from "@/components/Evento/EventForm";
//import SeatAllocation from "@/components/Evento/SeatAllocation";
import Card from "@/components/common/Card";
import styles from "./ConfigurarEvento.module.scss";

const mockSeats = [
  { status: "available" as const },
  { status: "paid" as const },
  { status: "reserved" as const },
  { status: "paid" as const },
  { status: "available" as const },
  { status: "reserved" as const },
  { status: "paid" as const },
  { status: "paid" as const },
  { status: "available" as const },
  { status: "available" as const },

  { status: "available" as const },
  { status: "available" as const },
  { status: "reserved" as const },
  { status: "reserved" as const },
  { status: "paid" as const },
  { status: "reserved" as const },
  { status: "paid" as const },
  { status: "paid" as const },
  { status: "available" as const },
  { status: "reserved" as const },

  { status: "paid" as const },
  { status: "reserved" as const },
  { status: "available" as const },
  { status: "paid" as const },
  { status: "reserved" as const },
  { status: "reserved" as const },
  { status: "paid" as const },
  { status: "paid" as const },
  { status: "paid" as const },
  { status: "available" as const },

  { status: "available" as const },
  { status: "reserved" as const },
  { status: "reserved" as const },
  { status: "paid" as const },
  { status: "reserved" as const },
  { status: "reserved" as const },
  { status: "paid" as const },
  { status: "paid" as const },
  { status: "paid" as const },
  { status: "available" as const }
];

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

