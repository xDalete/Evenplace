"use client";

import React from "react";
import styles from "./CardIngresso.module.scss";
import Card from "../common/Card";
import Divider from "../common/Divider";
import { LuTicket, LuCalendar, LuMapPin, LuClock, LuDollarSign, LuCheck, LuX, LuLoader } from "react-icons/lu";
import Image from "next/image";
import { Ingresso } from "@/lib/Types/IngressoTypes";
import { formatCurrency, formatDate, formatHours } from "@/lib/utils/format";
import Icon from "../common/Icon";

type CardIngressoProps = {
  ingresso: Ingresso;
};

const CardIngresso: React.FC<CardIngressoProps> = ({ ingresso }) => {
  const { evento, quantidade, valorTotal, tipoIngresso, status, codigoBarras } = ingresso;
  const { nome, local, data, horario } = evento;

  const getStatusIcon = () => {
    switch (status) {
      case "pago":
        return <Icon icon={LuCheck} color="success" />;
      case "pendente":
        return <Icon icon={LuLoader} color="warning" />;
      case "cancelado":
        return <Icon icon={LuX} color="danger" />;
      default:
        return null;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "pago":
        return "Pago";
      case "pendente":
        return "Pendente";
      case "cancelado":
        return "Cancelado";
      default:
        return "";
    }
  };

  const getTipoIngressoLabel = () => {
    switch (tipoIngresso) {
      case "inteira":
        return "Inteira";
      case "meia":
        return "Meia Entrada";
      case "vip":
        return "VIP";
      default:
        return "";
    }
  };

  return (
    <div className={styles.cardIngresso}>
      <Card bgColor="light" className={styles.card}>
        <div className={styles.imageContainer}>
          <Image src="/image1.jpg" alt={nome} className={styles.eventImage} width={1000} height={700} />
          <div className={styles.statusBadge}>
            {getStatusIcon()}
            <span>{getStatusLabel()}</span>
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={styles.eventName}>{nome}</h2>

          <div className={styles.ticketInfo}>
            <div className={styles.infoRow}>
              <Icon icon={LuTicket} color="primary" />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Tipo:</span>
                <span className={styles.infoValue}>{getTipoIngressoLabel()}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Icon icon={LuTicket} color="primary" />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Quantidade:</span>
                <span className={styles.infoValue}>{quantidade}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Icon icon={LuDollarSign} color="success" />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Valor Total:</span>
                <span className={styles.infoValue}>{formatCurrency(valorTotal)}</span>
              </div>
            </div>
          </div>

          <Divider />

          <div className={styles.eventDetails}>
            <div className={styles.detailItem}>
              <Icon icon={LuMapPin} color="info" />
              <div>
                <span className={styles.detailLabel}>Local:</span>
                <span className={styles.detailValue}>{local}</span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <Icon icon={LuCalendar} color="info" />
              <div>
                <span className={styles.detailLabel}>Data:</span>
                <span className={styles.detailValue}>{formatDate(`${data} ${horario}`)}</span>
              </div>
            </div>
            <div className={styles.detailItem}>
              <Icon icon={LuClock} color="info" />
              <div>
                <span className={styles.detailLabel}>Horário:</span>
                <span className={styles.detailValue}>{formatHours(`${data} ${horario}`)}</span>
              </div>
            </div>
          </div>

          {codigoBarras && (
            <>
              <Divider />
              <div className={styles.barcodeContainer}>
                <span className={styles.barcodeLabel}>Código do Ingresso:</span>
                <span className={styles.barcode}>{codigoBarras}</span>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CardIngresso;

