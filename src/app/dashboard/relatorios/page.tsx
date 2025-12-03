"use client";

import Card from "@/components/common/Card";
import Grid from "@/components/common/Grid";
import { LineChartComponent } from "@/components/charts/LineChart";
import { LuCalendar, LuTicket, LuDollarSign, LuFilter, LuChevronDown, LuChevronRight } from "react-icons/lu";
import styles from "./Relatorios.module.scss";

type StatCard = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

type ChartData = {
  month: string;
  value: number;
  percentage: string;
};

type ActivitySegment = {
  label: string;
  value: number;
  percentage: string;
  color: string;
};

type UpcomingEvent = {
  name: string;
  date: string;
  image?: string;
};

type Notification = {
  icon: React.ReactNode;
  message: string;
};

const statCards: StatCard[] = [
  {
    title: "Todos Eventos",
    value: "280",
    icon: <LuCalendar size={24} />
  },
  {
    title: "Ingressos",
    value: "2500",
    icon: <LuTicket size={24} />
  },
  {
    title: "Arrecadado",
    value: "22000$",
    icon: <LuDollarSign size={24} />
  }
];

const chartData: ChartData[] = [
  { month: "Jan", value: 35000, percentage: "17.3%" },
  { month: "Fev", value: 22000, percentage: "10.9%" },
  { month: "Mar", value: 46000, percentage: "22.7%" },
  { month: "Abr", value: 15000, percentage: "7.4%" },
  { month: "Mai", value: 34000, percentage: "16.8%" },
  { month: "Jun", value: 28000, percentage: "13.8%" },
  { month: "Jul", value: 22500, percentage: "11.1%" }
];

const activitySegments: ActivitySegment[] = [
  { label: "Evento A", value: 450, percentage: "29.4%", color: "#4E46E5" },
  { label: "Evento B", value: 250, percentage: "16.3%", color: "#6366F1" },
  { label: "Evento C", value: 370, percentage: "24.2%", color: "#9A95EF" },
  { label: "Evento D", value: 290, percentage: "19.0%", color: "#6B7280" },
  { label: "Evento E", value: 170, percentage: "11.1%", color: "#D1D5DB" }
];

const upcomingEvents: UpcomingEvent[] = [
  { name: "Show na Praça", date: "31 de fevereiro 2026" },
  { name: "Halloween", date: "25 de Outubro 2025" },
  { name: "Festival Cultura", date: "16 de Setembro 2025" },
  { name: "Florescer", date: "10 de Agosto 2025" },
  { name: "Festa da Mandioca", date: "15 abril 2025" }
];

const notifications: Notification[] = [
  {
    icon: <LuDollarSign size={20} />,
    message: "Pagamento liberado para os Artistas da Banda @SeuVigia"
  },
  {
    icon: <LuDollarSign size={20} />,
    message: "Total arrecadado foi transferido para o seu banco."
  },
  {
    icon: <LuCalendar size={20} />,
    message: "O show de @PabloDoArrocha começa daqui 3 horas."
  },
  {
    icon: <LuDollarSign size={20} />,
    message: "Pagamento liberado para os colaboradores do evento!"
  },
  {
    icon: <LuDollarSign size={20} />,
    message: "Pagamento liberado para os fornecedores do evento!"
  }
];

const buildGradient = (segments: ActivitySegment[]) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let current = 0;

  return segments
    .map(segment => {
      const start = (current / total) * 100;
      current += segment.value;
      const end = (current / total) * 100;
      return `${segment.color} ${start}% ${end}%`;
    })
    .join(", ");
};

// Mock seat grid data
const generateSeatGrid = () => {
  const rows = 8;
  const cols = 10;
  const seats: Array<{ status: "paid" | "reserved" | "available" }> = [];
  const totalSeats = rows * cols;

  // 30% paid, 20% reserved, 50% available
  for (let i = 0; i < totalSeats; i++) {
    const rand = Math.random();
    if (rand < 0.3) {
      seats.push({ status: "paid" });
    } else if (rand < 0.5) {
      seats.push({ status: "reserved" });
    } else {
      seats.push({ status: "available" });
    }
  }

  return seats;
};

export default function RelatoriosPage() {
  const seats = generateSeatGrid();
  const totalArrecadado = chartData.reduce((sum, item) => sum + item.value, 0);
  const totalIngressos = activitySegments.reduce((sum, seg) => sum + seg.value, 0);
  const totalEventos = 32;

  return (
    <div className={styles.pageContainer}>
      <Grid gap="md" className={styles.statsGrid}>
        {statCards.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card className={styles.statCard}>
              <div className={styles.statIcon}>{card.icon}</div>
              <div className={styles.statContent}>
                <span className={styles.statTitle}>{card.title}</span>
                <p className={styles.statValue}>{card.value}</p>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid gap="md" className={styles.contentGrid}>
        <Grid item xs={12} lg={8}>
          <Card className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitleGroup}>
                <h2>Gráfico</h2>
                <LuChevronDown size={20} className={styles.chevronIcon} />
              </div>
              <button className={styles.filterButton}>
                <LuFilter size={16} />
                Filtro Mensal
              </button>
            </div>

            <div className={styles.chartSummary}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Arrecadado</span>
                <strong className={styles.summaryValue}>
                  {totalArrecadado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </strong>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total Ingressos</span>
                <strong className={styles.summaryValue}>{totalIngressos}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total de Eventos</span>
                <strong className={styles.summaryValue}>{totalEventos}</strong>
              </div>
            </div>

            <div className={styles.chartContainer}>
              <LineChartComponent data={chartData} />
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className={styles.activitiesCard}>
            <h2 className={styles.activitiesTitle}>Atividades Recentes</h2>
            <div className={styles.donutContent}>
              <div
                className={styles.donut}
                style={{ backgroundImage: `conic-gradient(${buildGradient(activitySegments)})` }}
              >
                <div className={styles.donutHole}>
                  <span>Total</span>
                  <strong>{totalIngressos}</strong>
                </div>
              </div>

              <div className={styles.legend}>
                {activitySegments.map(segment => (
                  <div key={segment.label} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: segment.color }} />
                    <div>
                      <p>{segment.label}</p>
                      <small>
                        {segment.value} • {segment.percentage}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>

      <Grid gap="md" className={styles.bottomGrid}>
        <Grid item xs={12} lg={4}>
          <Card className={styles.upcomingCard}>
            <div className={styles.cardHeader}>
              <h3>Disponíveis Em Breve</h3>
              <LuChevronRight size={20} />
            </div>
            <div className={styles.eventsList}>
              {upcomingEvents.map((event, index) => (
                <div key={index} className={styles.eventItem}>
                  <div className={styles.eventImage}></div>
                  <div className={styles.eventInfo}>
                    <p className={styles.eventName}>Evento: {event.name}</p>
                    <span className={styles.eventDate}>Data: {event.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className={styles.seeAllLink}>
              Ver Todos
            </a>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card className={styles.lastEventCard}>
            <h3 className={styles.lastEventTitle}>Últimos eventos</h3>
            <div className={styles.eventDetails}>
              <div className={styles.eventInfoSection}>
                <p className={styles.eventDetail}>
                  <strong>Nome do Evento:</strong> Apresentação Pharus
                </p>
                <p className={styles.eventDetail}>
                  <strong>Data do Evento:</strong> 28 de Março, 2025
                </p>
              </div>
              <div className={styles.seatLegend}>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.legendPaid}`}></span>
                  <span>Lugares pagos</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.legendReserved}`}></span>
                  <span>Lugares reservados</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.legendAvailable}`}></span>
                  <span>Disponível para venda</span>
                </div>
              </div>
            </div>
            <div className={styles.seatGrid}>
              {seats.map((seat, index) => {
                const seatClass =
                  seat.status === "paid"
                    ? styles.seatPaid
                    : seat.status === "reserved"
                      ? styles.seatReserved
                      : styles.seatAvailable;
                return (
                  <div key={index} className={`${styles.seat} ${seatClass}`}></div>
                );
              })}
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Card className={styles.notificationsCard}>
            <div className={styles.cardHeader}>
              <h3>Notificações</h3>
              <LuChevronRight size={20} />
            </div>
            <div className={styles.notificationsList}>
              {notifications.map((notification, index) => (
                <div key={index} className={styles.notificationItem}>
                  <div className={styles.notificationIcon}>{notification.icon}</div>
                  <p className={styles.notificationMessage}>{notification.message}</p>
                </div>
              ))}
            </div>
            <a href="#" className={styles.seeAllLink}>
              Ver todos
            </a>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

