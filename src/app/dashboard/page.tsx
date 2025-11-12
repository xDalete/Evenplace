import CardEvento from "@/components/Evento/CardEvento";
import Grid from "@/components/common/Grid";
import { EventWithInfo } from "@/lib/Types/EventTypes";
import Card from "@/components/common/Card";
import CardCriarEvento from "@/components/evento/CardCriarEvento";
import styles from "./Home.module.scss";

const eventos: EventWithInfo[] = [
  {
    id: "1",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "upcoming"
  },
  {
    id: "2",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "ongoing"
  },
  {
    id: "3",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "upcoming"
  },
  {
    id: "4",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "ongoing"
  },
  {
    id: "5",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "upcoming"
  },
  {
    id: "6",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "completed"
  },
  {
    id: "7",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "upcoming"
  },
  {
    id: "8",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "upcoming"
  },
  {
    id: "9",
    name: "Trio Parada Dura",
    description: "Show do Trio Parada Dura na praça do bairro São Pedro.",
    startDate: "2025-09-20T20:00:00Z",
    location: "Praça do Bairro São Pedro",
    organizerId: 1,
    imageUrl: "/image1.jpg",
    categories: ["música", "sertanejo"],
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
    attendeesLimit: 2500,
    attendeesCount: 700,
    ticketsAvailable: 1800,
    ticketsSold: 700,
    ticketsPrice: 40.0,
    status: "upcoming"
  }
];

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.stickyHeader}>
        <CardCriarEvento />
      </div>
      <Card className={styles.contentCard}>
        <div className={styles.legendContainer}>
          <div className={styles.legendItem}>
            <div className={`${styles.bolaBase} ${styles.bolaCadastrados}`}></div>
            <span> Cadastrados</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.bolaBase} ${styles.bolaPendentes}`}></div>
            <span> Pendentes</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.bolaBase} ${styles.bolaDisponiveis}`}></div>
            <span> Disponíveis</span>
          </div>
        </div>
        <Grid className={styles.gridContainer} gap="md">
          {eventos.map(evento => (
            <Grid item xs={12} sm={4} md={3} key={evento.id}>
              <CardEvento evento={evento} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
}
