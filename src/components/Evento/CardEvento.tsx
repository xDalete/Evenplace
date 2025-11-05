import React from "react";
import styles from "./CardEvento.module.scss";
import Card from "../common/Card";
import Divider from "../common/Divider";
import { FaTicketAlt, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { EventWithInfo } from "@/lib/Types/EventTypes";
import { formatCurrency, formatDate, formatHours } from "@/lib/utils/format";
import { Variants } from "@/lib/Types/Types";
import Icon from "../common/Icon";

type CardEventoProps = {
  evento: EventWithInfo;
};

const CardEvento: React.FC<CardEventoProps> = ({
  evento: { name, startDate, ticketsAvailable, attendeesCount, attendeesLimit, ticketsPrice, location, status }
}) => {
  return (
    <Card bgColor="light" status={status}>
      <Image src="/image1.jpg" alt="Evento" className={styles.eventImage} width={1000} height={700} />
      <h2 className={styles.eventName}>{name}</h2>
      <div className={styles.rowInfo}>
        <EventInfo icon={<Icon icon={FaMoneyBillWave} color="success" />} info={formatCurrency(ticketsPrice)} />
        <EventInfo icon={<Icon icon={FaUsers} color="danger" />} info={attendeesLimit - attendeesCount} />
        <EventInfo icon={<Icon icon={FaTicketAlt} color="info" />} info={ticketsAvailable} />
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
