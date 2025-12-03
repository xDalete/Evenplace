"use client";

import { useEffect, useState } from "react";
import Card from "@/components/common/Card";
import Grid from "@/components/common/Grid";
import Container from "@/components/common/Container";
import Loading from "@/components/common/Loading";
import CardIngresso from "@/components/Ingresso/CardIngresso";
import { getIngressosByUser } from "@/api/Ingresso";
import { Ingresso } from "@/lib/Types/IngressoTypes";
import { Evento, EventoStatusEnum } from "@/lib/Types/EventTypes";
import { LuTicket, LuSearch, LuFilter } from "react-icons/lu";
import styles from "./Ingressos.module.scss";

// Dados mockados para desenvolvimento
const mockIngressos: Ingresso[] = [
  {
    id: 1,
    eventoId: 1,
    evento: {
      id: 1,
      nome: "Show na Praça",
      data: "2025-10-31",
      local: "Praça Central",
      horario: "20:00",
      descricao: "Um show incrível na praça central da cidade",
      valor_ingresso: 50.0,
      quantidade_vagas: 500,
      vagas_disponiveis: 350,
      status: EventoStatusEnum.PROXIMO,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z"
    },
    quantidade: 2,
    valorTotal: 100.0,
    tipoIngresso: "inteira",
    status: "pago",
    codigoBarras: "1234567890123",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z"
  },
  {
    id: 2,
    eventoId: 2,
    evento: {
      id: 2,
      nome: "Festival de Música",
      data: "2025-09-16",
      local: "Parque Municipal",
      horario: "18:00",
      descricao: "Festival com várias bandas locais",
      valor_ingresso: 80.0,
      quantidade_vagas: 1000,
      vagas_disponiveis: 750,
      status: EventoStatusEnum.PROXIMO,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z"
    },
    quantidade: 1,
    valorTotal: 80.0,
    tipoIngresso: "vip",
    status: "pago",
    codigoBarras: "9876543210987",
    createdAt: "2025-02-10T00:00:00Z",
    updatedAt: "2025-02-10T00:00:00Z"
  },
  {
    id: 3,
    eventoId: 3,
    evento: {
      id: 3,
      nome: "Halloween Party",
      data: "2025-10-25",
      local: "Clube Social",
      horario: "22:00",
      descricao: "Festa de Halloween com DJ e decoração temática",
      valor_ingresso: 60.0,
      quantidade_vagas: 300,
      vagas_disponiveis: 200,
      status: EventoStatusEnum.PROXIMO,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z"
    },
    quantidade: 3,
    valorTotal: 90.0,
    tipoIngresso: "meia",
    status: "pendente",
    codigoBarras: undefined,
    createdAt: "2025-03-01T00:00:00Z",
    updatedAt: "2025-03-01T00:00:00Z"
  },
  {
    id: 4,
    eventoId: 4,
    evento: {
      id: 4,
      nome: "Apresentação Pharus",
      data: "2025-03-28",
      local: "Teatro Municipal",
      horario: "19:30",
      descricao: "Apresentação da banda Pharus",
      valor_ingresso: 45.0,
      quantidade_vagas: 200,
      vagas_disponiveis: 150,
      status: EventoStatusEnum.PROXIMO,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z"
    },
    quantidade: 1,
    valorTotal: 45.0,
    tipoIngresso: "inteira",
    status: "pago",
    codigoBarras: "4567891234567",
    createdAt: "2025-02-20T00:00:00Z",
    updatedAt: "2025-02-20T00:00:00Z"
  },
  {
    id: 5,
    eventoId: 5,
    evento: {
      id: 5,
      nome: "Festival Cultura",
      data: "2025-09-16",
      local: "Centro Cultural",
      horario: "16:00",
      descricao: "Festival de cultura e arte",
      valor_ingresso: 35.0,
      quantidade_vagas: 400,
      vagas_disponiveis: 300,
      status: EventoStatusEnum.PROXIMO,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z"
    },
    quantidade: 2,
    valorTotal: 70.0,
    tipoIngresso: "inteira",
    status: "cancelado",
    codigoBarras: undefined,
    createdAt: "2025-01-25T00:00:00Z",
    updatedAt: "2025-01-30T00:00:00Z"
  }
];

export default function IngressosPage() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    // Simular delay da API
    setTimeout(() => {
      getIngressosByUser()
        .then(response => {
          setIngressos(response.data);
          setLoading(false);
        })
        .catch(() => {
          // Em caso de erro, usar dados mockados para desenvolvimento
          setIngressos(mockIngressos);
          setLoading(false);
        });
    }, 500);
  }, []);

  const filteredIngressos = ingressos.filter(ingresso =>
    ingresso.evento.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ingressosPagos = filteredIngressos.filter(i => i.status === "pago");
  const ingressosPendentes = filteredIngressos.filter(i => i.status === "pendente");
  const ingressosCancelados = filteredIngressos.filter(i => i.status === "cancelado");

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.titleIcon}>
            <LuTicket size={24} />
          </div>
          <div>
            <span className={styles.subtitle}>Meus</span>
            <h1>Ingressos</h1>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <LuSearch size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pesquisar eventos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <button className={styles.filterButton}>
            <LuFilter size={16} />
            Filtros
          </button>
        </div>
      </header>

      {loading ? (
        <Container className={styles.loadingContainer}>
          <Loading />
        </Container>
      ) : filteredIngressos.length === 0 ? (
        <Card className={styles.emptyState}>
          <div className={styles.emptyContent}>
            <LuTicket size={64} className={styles.emptyIcon} />
            <h2>Nenhum ingresso encontrado</h2>
            <p>
              {searchTerm
                ? "Não encontramos ingressos com esse nome. Tente outra busca."
                : "Você ainda não comprou ingressos para nenhum evento."}
            </p>
          </div>
        </Card>
      ) : (
        <>
          {ingressosPagos.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ingressos Pagos ({ingressosPagos.length})</h2>
              <Grid gap="md" className={styles.grid}>
                {ingressosPagos.map(ingresso => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={ingresso.id}>
                    <CardIngresso ingresso={ingresso} />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}

          {ingressosPendentes.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ingressos Pendentes ({ingressosPendentes.length})</h2>
              <Grid gap="md" className={styles.grid}>
                {ingressosPendentes.map(ingresso => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={ingresso.id}>
                    <CardIngresso ingresso={ingresso} />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}

          {ingressosCancelados.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ingressos Cancelados ({ingressosCancelados.length})</h2>
              <Grid gap="md" className={styles.grid}>
                {ingressosCancelados.map(ingresso => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={ingresso.id}>
                    <CardIngresso ingresso={ingresso} />
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </>
      )}
    </div>
  );
}

