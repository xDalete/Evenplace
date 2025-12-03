"use client";

import React, { useState } from "react";
import { X, AlertCircle, Lock, MapPin, Calendar, Users, Zap } from "lucide-react";
import styles from "./EventRegistrationModal.module.scss";
import { Evento } from "@/lib/Types/EventTypes";
import { formatDateWithHours } from "@/lib/utils/format";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  evento?: Evento;
}

type TicketType = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  badge: string | null;
  highlight: boolean;
};

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ isOpen, onClose, evento }) => {
  const [selectedTicketType, setSelectedTicketType] = useState<number | null>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !evento) return null;

  const ticketTypes: TicketType[] = [
    {
      id: 1,
      name: "Ingresso Inteira",
      price: evento.valor_ingresso || 40.0,
      description: "Acesso completo ao evento",
      quantity: evento.vagas_disponiveis || 100,
      badge: null,
      highlight: false
    },
    {
      id: 2,
      name: "Meia Entrada",
      price: (evento.valor_ingresso || 40.0) / 2,
      description: "Estudante, idoso, PCD",
      quantity: evento.vagas_disponiveis || 100,
      badge: "ECONOMIA",
      highlight: false
    },
    {
      id: 3,
      name: "Ingresso VIP",
      price: (evento.valor_ingresso || 40.0) * 1.5,
      description: "Acesso prioritário + área exclusiva",
      quantity: Math.floor((evento.vagas_disponiveis || 100) * 0.2),
      badge: "PREMIUM",
      highlight: true
    }
  ];

  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketType);
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  const occupancy = evento.vagas_disponiveis || 0;
  const limit = evento.quantidade_vagas || 2500;
  const occupancyPercent = Math.min((occupancy / limit) * 100, 100);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.header}>
          <img src="/image1.jpg" alt={evento.nome} className={styles.headerImage} />

          <div className={styles.headerOverlay} />

          <div className={styles.headerContent}>
            <div className={styles.headerTop}>
              <div>
                <div className={styles.badge}>✨ EM ALTA DEMANDA</div>
                <h1 className={styles.title}>{evento.nome}</h1>
                <div className={styles.eventDetails}>
                  <div className={styles.detailItem}>
                    <MapPin size={18} />
                    <span>{evento.local}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Calendar size={18} />
                    <span>{formatDateWithHours(`${evento.data} ${evento.horario}`)}</span>
                  </div>
                </div>
              </div>

              <button onClick={onClose} className={styles.closeButton}>
                <X size={24} />
              </button>
            </div>

            {/* Occupancy Bar */}
            <div className={styles.occupancySection}>
              <div className={styles.occupancyInfo}>
                <Users size={16} />
                <span>
                  {occupancy} de {limit} pessoas
                </span>
              </div>
              <div className={styles.occupancyBar}>
                <div className={styles.occupancyFill} style={{ width: `${occupancyPercent}%` }} />
              </div>
              {occupancyPercent > 80 && (
                <p className={styles.occupancyWarning}>
                  <Zap size={14} /> Poucos ingressos disponíveis!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className={styles.content}>
          {/* Description */}
          <div className={styles.description}>
            <p>
              {evento.descricao || "Descrição do evento não disponível. Prepare-se para uma experiência inesquecível!"}
            </p>
          </div>

          {/* Tickets Grid */}
          <div className={styles.ticketsSection}>
            <h2>Escolha seu Ingresso</h2>
            <div className={styles.ticketsGrid}>
              {ticketTypes.map(ticket => (
                <button
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicketType(ticket.id);
                    setQuantity(1);
                  }}
                  disabled={ticket.quantity === 0}
                  className={`${styles.ticketCard} ${
                    selectedTicketType === ticket.id ? styles.selected : ""
                  } ${ticket.highlight ? styles.highlight : ""} ${ticket.quantity === 0 ? styles.disabled : ""}`}
                >
                  <div className={styles.ticketCardGradient} />

                  <div className={styles.ticketCardContent}>
                    <div className={styles.ticketCardHeader}>
                      <p className={styles.ticketName}>{ticket.name}</p>
                      {ticket.badge && <span className={styles.ticketBadge}>{ticket.badge}</span>}
                    </div>

                    <p className={styles.ticketDescription}>{ticket.description}</p>

                    <div className={styles.ticketPrice}>
                      <p>R$ {ticket.price.toFixed(2)}</p>
                      <p>por pessoa</p>
                    </div>

                    <div className={styles.ticketFooter}>
                      <p>{ticket.quantity > 0 ? `${ticket.quantity} disponíveis` : "Esgotado"}</p>
                      {selectedTicketType === ticket.id && <div className={styles.checkmark} />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          {selectedTicket && (
            <div className={styles.quantitySection}>
              <label>Quantidade de Ingressos</label>
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={styles.quantityButton}>
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={selectedTicket.quantity}
                  className={styles.quantityInput}
                />
                <button
                  onClick={() => setQuantity(Math.min(selectedTicket.quantity, quantity + 1))}
                  className={styles.quantityButton}
                >
                  +
                </button>
                <div className={styles.quantityTotal}>
                  <p>Total</p>
                  <p>R$ {totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Refund Policy */}
          <div className={styles.refundPolicy}>
            <div className={styles.refundIcon}>
              <AlertCircle size={22} />
            </div>
            <div>
              <h4>⚠️ Política de Reembolso Importante</h4>
              <p>
                O <strong>gestor do evento</strong> é <strong>única e exclusivamente responsável</strong> por qualquer
                política de reembolso, cancelamento ou alteração no evento. A{" "}
                <strong>plataforma Evenplace se isenta completamente</strong> de qualquer responsabilidade em relação a
                devoluções, reembolsos ou problemas relacionados à organização do evento. Para dúvidas sobre reembolso,{" "}
                <strong>contate diretamente o organizador</strong>.
              </p>
            </div>
          </div>

          {/* Terms */}
          <div className={styles.termsContainer}>
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={e => setAgreeToTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              Concordo com a <strong>política de reembolso</strong> e com os <strong>termos do evento</strong>{" "}
              estabelecidos pelo gestor. Entendo que <strong>Evenplace não é responsável</strong> por qualquer questão
              relacionada a reembolsos.
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {selectedTicket && (
            <div className={styles.summary}>
              <div>
                <p>Ingresso Selecionado</p>
                <p>
                  {selectedTicket.name} × {quantity}
                </p>
              </div>
              <div>
                <p>Valor Total</p>
                <p>R$ {totalPrice.toFixed(2)}</p>
              </div>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button onClick={onClose} className={styles.buttonSecondary}>
              Voltar
            </button>
            <button
              onClick={() => {
                if (selectedTicket && agreeToTerms) {
                  alert(`Redirecionando para login com ${quantity} ${selectedTicket.name}(s)...`);
                }
              }}
              disabled={!selectedTicket || !agreeToTerms}
              className={styles.buttonPrimary}
            >
              <Lock size={20} />
              Continuar com Login
            </button>
          </div>

          {(!selectedTicket || !agreeToTerms) && (
            <p className={styles.helperText}>
              {!selectedTicket && "Selecione um tipo de ingresso"}
              {selectedTicket && !agreeToTerms && "☑️ Concordar com os termos para continuar"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;
