import React from "react";
import styles from "./CardEvento.module.scss";
import Card from "./Card";
import Divider from "./Divider";
import { FaTicketAlt, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { EventWithInfo } from "@/lib/Types/EventTypes";
import { formatDate, formatHours } from "@/lib/utils/format";

type CardEventoProps = {
  evento: EventWithInfo;
};

const CardEvento: React.FC<CardEventoProps> = ({
  evento: { name, startDate, ticketsAvailable, attendeesCount, attendeesLimit, ticketsPrice, location }
}) => {
  return (
    <Card>
      <Image src="/image1.jpg" alt="Evento" className={styles.eventImage} width={1000} height={700} />
      <h2 className={styles.eventName}>{name}</h2>
      <div className={styles.rowInfo}>
        <EventInfo icon={<FaTicketAlt />} info={ticketsAvailable} />
        <EventInfo icon={<FaMoneyBillWave />} info={`R$ ${ticketsPrice.toFixed(2)}`} />
        <EventInfo icon={<FaUsers />} info={attendeesLimit - attendeesCount} />
      </div>
      <Divider />
      <div className={styles.eventInfo}>
        <EventInfo infoTitle="Localização:" info={location} />
        <EventInfo infoTitle="Data:" info={formatDate(startDate)} />
        <EventInfo infoTitle="Horário:" info={formatHours(startDate)} />
      </div>
    </Card>
  );
};

export default CardEvento;

type EventInfoProps = {
  info: number | string;
  infoTitle?: string;
  icon?: React.ReactNode;
};

const EventInfo: React.FC<EventInfoProps> = ({ infoTitle, info, icon }) => {
  return (
    <p>
      {icon && <span className={styles.infoIcon}>{icon}</span>}
      {infoTitle && <strong>{infoTitle}</strong>} {info}
    </p>
  );
};
