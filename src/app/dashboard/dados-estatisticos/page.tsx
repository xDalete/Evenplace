import Card from "@/components/common/Card";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import LocationBarChart from "@/components/Estatisticas/LocationBarChart";
import { LuFilter, LuSearch, LuTrendingUp } from "react-icons/lu";
import styles from "./DadosEstatisticos.module.scss";

type StatCard = {
  title: string;
  value: string;
  metric: string;
  change: string;
  changeType: "positive" | "negative";
};

type Segment = {
  label: string;
  value: number;
  percentage: string;
  color: string;
};

const statsCards: StatCard[] = [
  {
    title: "Idade média de inscritos",
    value: "18 - 24 anos",
    metric: "2345",
    change: "AUMENTO DE 30%",
    changeType: "positive"
  },
  {
    title: "Gênero",
    value: "Masculino",
    metric: "3345",
    change: "AUMENTO DE 18%",
    changeType: "positive"
  },
  {
    title: "Locais menos visitados",
    value: "Jequitinhonha",
    metric: "845",
    change: "DIMINUIÇÃO DE 15%",
    changeType: "negative"
  },
  {
    title: "Interesse do momento",
    value: "Músicas Sertanejo",
    metric: "123",
    change: "AUMENTO DE 63%",
    changeType: "positive"
  },
  {
    title: "Engajamento total",
    value: "Anúncios no Facebook",
    metric: "21",
    change: "DIMINUIÇÃO DE 21%",
    changeType: "negative"
  }
];

const interestSegments: Segment[] = [
  { label: "Pagode", value: 212, percentage: "16.3%", color: "#7224F2" },
  { label: "Rock", value: 123, percentage: "11.1%", color: "#111827" },
  { label: "Forró", value: 234, percentage: "29.4%", color: "#6B7280" },
  { label: "Axé", value: 218, percentage: "19.0%", color: "#9A95EF" },
  { label: "Indie", value: 265, percentage: "24.2%", color: "#6366F1" }
];

const ageSegments: Segment[] = [
  { label: "18 - 24 anos", value: 2345, percentage: "57.8%", color: "#4E46E5" },
  { label: "25 - 34 anos", value: 1342, percentage: "33.1%", color: "#6B7280" },
  { label: "35 - 44 anos", value: 245, percentage: "6.0%", color: "#817BFF" },
  { label: "44+ anos", value: 124, percentage: "3.1%", color: "#181945" }
];

const buildGradient = (segments: Segment[]) => {
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

export default function DadosEstatisticosPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.topBar}>
        <div className={styles.titleGroup}>
          <span className={styles.titleIcon}>
            <LuTrendingUp />
          </span>
          <div>
            <span className={styles.subtitle}>Painel</span>
            <h1>Dados estatísticos</h1>
          </div>
        </div>

        <div className={styles.actions}>
          <label className={styles.search}>
            <LuSearch />
            <input type="text" placeholder="Pesquisar" />
          </label>

          <div className={styles.enrolled}>
            <span>Inscritos</span>
            <strong>7.523</strong>
          </div>

          <button className={styles.filterButton}>
            <LuFilter />
            Filtro
          </button>
        </div>
      </header>

      <Grid gap="md" className={styles.contentGrid}>
        <Grid item xs={12} md={4}>
          <div className={styles.sideCards}>
            {statsCards.map(card => (
              <Card key={card.title} className={styles.statCard}>
                <div>
                  <span className={styles.statTitle}>{card.title}</span>
                  <p className={styles.statValue}>{card.value}</p>
                </div>
                <div className={styles.statMeta}>
                  <span className={styles.statMetric}>{card.metric}</span>
                  <span
                    className={
                      card.changeType === "positive" ? styles.statChangePositive : styles.statChangeNegative
                    }
                  >
                    {card.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Grid>

        <Grid item xs={12} md={8}>
          <Container className={styles.dataPanel}>
            <Card className={styles.histogramCard}>
              <div className={styles.sectionHeader}>
                <h2>Localização dos inscritos</h2>
              </div>

              <div className={styles.barChart}>
                <LocationBarChart />
              </div>
            </Card>

            <Grid gap="md" className={styles.donutGrid}>
              <Grid item xs={12} md={6}>
                <Card className={styles.donutCard}>
                  <div className={styles.sectionHeader}>
                    <h3>Interesse geral dos inscritos</h3>
                  </div>
                  <div className={styles.donutContent}>
                    <div
                      className={styles.donut}
                      style={{ backgroundImage: `conic-gradient(${buildGradient(interestSegments)})` }}
                    >
                      <div className={styles.donutHole}>
                        <span>Total</span>
                        <strong>{interestSegments.reduce((sum, seg) => sum + seg.value, 0)}</strong>
                      </div>
                    </div>

                    <div className={styles.legend}>
                      {interestSegments.map(segment => (
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

              <Grid item xs={12} md={6}>
                <Card className={styles.donutCard}>
                  <div className={styles.sectionHeader}>
                    <h3>Idade geral dos inscritos</h3>
                  </div>
                  <div className={styles.donutContent}>
                    <div
                      className={styles.donut}
                      style={{ backgroundImage: `conic-gradient(${buildGradient(ageSegments)})` }}
                    >
                      <div className={styles.donutHole}>
                        <span>Principal</span>
                        <strong>57.8%</strong>
                      </div>
                    </div>

                    <div className={styles.legend}>
                      {ageSegments.map(segment => (
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
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}


