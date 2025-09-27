import React from "react";
import styles from "./CardEvento.module.scss";
import Card from "./Card";
import Divider from "./Divider";
import { FaTicketAlt, FaMoneyBillWave, FaUsers } from "react-icons/fa";

type CardEventoProps = {
    title: string;
    date: string;
    ticketsAvailable: number;
    ticketPrice: number;
    hour: string;
    placesAvailable: number;
    location: string;
};

const CardEvento: React.FC<CardEventoProps> = ({
    title,
    date,
    ticketsAvailable,
    ticketPrice,
    placesAvailable,
    location,
    hour,
}) => {
    return (
        <Card className={styles.cardEvento}>
            <img
                src="https://galile.com.br/wp-content/uploads/2023/08/Copia-de-Copia-de-Copia-de-Copia-de-Sem-nome-1500-%C3%97-770-px-9.jpg"
                alt="Event Icon"
                className={styles.icon}
            />
            <Divider />
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.rowInfo}>
                <EventInfo infoTitle="" icon={<FaTicketAlt />} info={ticketsAvailable} />
                <EventInfo infoTitle="" icon={<FaMoneyBillWave/>} info={`R$ ${ticketPrice.toFixed(2)}`} />
                <EventInfo infoTitle="" icon={<FaUsers />} info={placesAvailable} />
            </div>
            <div className={styles.eventInfo}>
                <EventInfo infoTitle="Localização:" info={location} />
                <EventInfo infoTitle="Data:" info={date} />
                <EventInfo infoTitle="Horário:" info={hour} />
            </div>
        </Card>
    );
};

export default CardEvento;

type EventInfoProps = {
    info: number | string;
    infoTitle: string;
    icon?: React.ReactNode;
};

const EventInfo: React.FC<EventInfoProps> = ({ infoTitle, info, icon }) => {
    return (
        <p>
            {icon && <span style={{ marginRight: "5px" }}>{icon}</span>}
            <strong>{infoTitle}</strong> {info}
        </p>
    );
};
