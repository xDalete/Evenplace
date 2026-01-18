"use client";

import React, { useState } from "react";
import { FaMoneyBillWave, FaTicketAlt, FaUsers } from "react-icons/fa";

import { Evento } from "@/lib/Types/EventTypes";
import { Variants } from "@/lib/Types/Types";
import { formatCurrency, formatDate, formatHours } from "@/lib/utils/format";

import Card from "../common/Card";
import Divider from "../common/Divider";
import Icon from "../common/Icon";
import Image from "../common/Image";
import styles from "./CardEvento.module.scss";
import EventRegistrationModal from "./EventRegistrationModal";

type CardEventoProps = {
  evento: Evento;
};

const CardEvento: React.FC<CardEventoProps> = ({ evento }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { banner, data, horario, local, nome, quantidade_vagas, vagas_disponiveis, valor_ingresso } = evento;

  return (
    //TODO: Remover o modal de registro de evento para um componente separado
    <>
      <Card bgColor="light" className={styles.cardEvento}>
        <div
          onClick={() => {
            console.log("Abrindo modal do evento:", nome);
            setIsModalOpen(true);
          }}
        >
          <Image alt="Evento" className={styles.eventImage} height={700} src={banner} width={1000} />
          <h2 className={styles.eventName}>{nome}</h2>
          <div className={styles.rowInfo}>
            <EventInfo icon={<Icon color="success" icon={FaMoneyBillWave} />} info={formatCurrency(valor_ingresso)} />
            <EventInfo icon={<Icon color="danger" icon={FaUsers} />} info={quantidade_vagas} />
            <EventInfo icon={<Icon color="info" icon={FaTicketAlt} />} info={vagas_disponiveis} />
          </div>
          <Divider />
          <div className={styles.eventInfo}>
            <EventInfo info={local} infoTitle="Localização:" />
            <EventInfo info={formatDate(`${data} ${horario}`)} infoTitle="Data:" />
            <EventInfo info={formatHours(`${data} ${horario}`)} infoTitle="Horário:" />
          </div>
        </div>
      </Card>

      <EventRegistrationModal event={evento} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CardEvento;

type EventInfoProps = {
  icon?: React.ReactNode;
  iconColor?: Variants;
  info: number | string;
  infoTitle?: string;
};

const EventInfo: React.FC<EventInfoProps> = ({ icon, info, infoTitle }) => {
  return (
    <div>
      {icon && icon}
      {infoTitle && <strong>{infoTitle}</strong>} <span>{info}</span>
    </div>
  );
};
