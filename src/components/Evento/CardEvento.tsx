"use client";

import React, { useState } from "react";
import styles from "./CardEvento.module.scss";
import Card from "../common/Card";
import Divider from "../common/Divider";
import { FaTicketAlt, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { Evento } from "@/lib/Types/EventTypes";
import { formatCurrency, formatDate, formatHours } from "@/lib/utils/format";
import { Variants } from "@/lib/Types/Types";
import Icon from "../common/Icon";
import EventRegistrationModal from "./EventRegistrationModal";

type CardEventoProps = {
  evento: Evento;
};

const CardEvento: React.FC<CardEventoProps> = ({ evento }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { nome, local, data, horario, status, quantidade_vagas, vagas_disponiveis, valor_ingresso, descricao } = evento;

  return (
    <>
      <div
        className={styles.cardEvento}
        onClick={() => {
          console.log("Abrindo modal do evento:", name);
          setIsModalOpen(true);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.15)" : "0 2px 2px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Card bgColor="light">
          <Image src="/image1.jpg" alt="Evento" className={styles.eventImage} width={1000} height={700} />
          <h2 className={styles.eventName}>{nome}</h2>
          <div className={styles.rowInfo}>
            <EventInfo icon={<Icon icon={FaMoneyBillWave} color="success" />} info={formatCurrency(valor_ingresso)} />
            <EventInfo icon={<Icon icon={FaUsers} color="danger" />} info={quantidade_vagas} />
            <EventInfo icon={<Icon icon={FaTicketAlt} color="info" />} info={vagas_disponiveis} />
          </div>
          <Divider />
          <div className={styles.eventInfo}>
            <EventInfo infoTitle="Localização:" info={local} />
            <EventInfo infoTitle="Data:" info={formatDate(`${data} ${horario}`)} />
            <EventInfo infoTitle="Horário:" info={formatHours(`${data} ${horario}`)} />
          </div>
        </Card>
      </div>

      <EventRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={evento} />
    </>
  );
};

export default CardEvento;

type EventInfoProps = {
  info: number | string;
  infoTitle?: string;
  icon?: React.ReactNode;
  iconColor?: Variants;
};

const EventInfo: React.FC<EventInfoProps> = ({ infoTitle, info, icon }) => {
  return (
    <div>
      {icon && icon}
      {infoTitle && <strong>{infoTitle}</strong>} <span>{info}</span>
    </div>
  );
};
