"use client";

import { AlertCircle, Calendar, Lock, MapPin, Users, X, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Evento } from "@/lib/Types/EventTypes";
import { formatCurrency, formatDateWithHours } from "@/lib/utils/format";

import styles from "./EventRegistrationModal.module.scss";

interface EventRegistrationModalProps {
  event?: Evento;
  isOpen: boolean;
  onClose: () => void;
}

type TicketType = {
  badge: null | string;
  description: string;
  highlight: boolean;
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ event, isOpen, onClose }) => {
  const router = useRouter(); // Hook de navegação
  const [selectedTicketType, setSelectedTicketType] = useState<null | number>(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !event) return null;

  const ticketTypes: TicketType[] = [
    {
      badge: null,
      description: "Acesso completo ao evento",
      highlight: false,
      id: 1,
      name: "Ingresso Inteira",
      price: event.valor_ingresso || 40.0,
      quantity: event.vagas_disponiveis || 100
    },
    {
      badge: "ECONOMIA",
      description: "Estudante, idoso, PCD",
      highlight: false,
      id: 2,
      name: "Meia Entrada",
      price: (event.valor_ingresso || 40.0) / 2,
      quantity: event.vagas_disponiveis || 100
    },
    {
      badge: "PREMIUM",
      description: "Acesso prioritário + área exclusiva",
      highlight: true,
      id: 3,
      name: "Ingresso VIP",
      price: (event.valor_ingresso || 40.0) * 1.5,
      quantity: Math.floor((event.vagas_disponiveis || 100) * 0.2)
    }
  ];

  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketType);
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  const occupancy = event.vagas_disponiveis || 0;
  const limit = event.quantidade_vagas || 2500;
  const occupancyPercent = Math.min((occupancy / limit) * 100, 100);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <img alt={event.nome} className={styles.headerImage} src="/image1.jpg" />

          <div className={styles.headerOverlay} />

          <div className={styles.headerContent}>
            <div className={styles.headerTop}>
              <div>
                <div className={styles.badge}>✨ EM ALTA DEMANDA</div>
                <h1 className={styles.title}>{event.nome}</h1>
                <div className={styles.eventDetails}>
                  <div className={styles.detailItem}>
                    <MapPin size={18} />
                    <span>{event.local}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Calendar size={18} />
                    <span>{formatDateWithHours(`${event.data} ${event.horario}`)}</span>
                  </div>
                </div>
              </div>

              <button className={styles.closeButton} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

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
              {event.descricao || "Descrição do evento não disponível. Prepare-se para uma experiência inesquecível!"}
            </p>
          </div>

          {/* Tickets Grid */}
          <div className={styles.ticketsSection}>
            <h2>Escolha seu Ingresso</h2>
            <div className={styles.ticketsGrid}>
              {ticketTypes.map(ticket => (
                <button
                  className={`${styles.ticketCard} ${
                    selectedTicketType === ticket.id ? styles.selected : ""
                  } ${ticket.highlight ? styles.highlight : ""} ${ticket.quantity === 0 ? styles.disabled : ""}`}
                  disabled={ticket.quantity === 0}
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicketType(ticket.id);
                    setQuantity(1);
                  }}
                >
                  <div className={styles.ticketCardGradient} />

                  <div className={styles.ticketCardContent}>
                    <div className={styles.ticketCardHeader}>
                      <p className={styles.ticketName}>{ticket.name}</p>
                      {ticket.badge && <span className={styles.ticketBadge}>{ticket.badge}</span>}
                    </div>

                    <p className={styles.ticketDescription}>{ticket.description}</p>

                    <div className={styles.ticketPrice}>
                      <p>{formatCurrency(ticket.price)}</p>
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
                <button className={styles.quantityButton} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>
                <input
                  className={styles.quantityInput}
                  max={selectedTicket.quantity}
                  min="1"
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  type="number"
                  value={quantity}
                />
                <button
                  className={styles.quantityButton}
                  onClick={() => setQuantity(Math.min(selectedTicket.quantity, quantity + 1))}
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
              checked={agreeToTerms}
              id="terms"
              onChange={e => setAgreeToTerms(e.target.checked)}
              type="checkbox"
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
            <button className={styles.buttonSecondary} onClick={onClose}>
              Voltar
            </button>
            <button
              className={styles.buttonPrimary}
              disabled={!selectedTicket || !agreeToTerms}
              onClick={() => {
                if (selectedTicket && agreeToTerms) {
                  // Lógica adicionada: Redirecionar para login
                  router.push("/login");
                }
              }}
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
