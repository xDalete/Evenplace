import { LuFilter, LuSearch, LuTrendingUp } from "react-icons/lu";

import Card from "@/components/common/Card";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import LocationBarChart from "@/components/Estatisticas/LocationBarChart";

import styles from "./DadosEstatisticos.module.scss";

type Segment = {
  color: string;
  label: string;
  percentage: string;
  value: number;
};

type StatCard = {
  change: string;
  changeType: "negative" | "positive";
  metric: string;
  title: string;
  value: string;
};

const statsCards: StatCard[] = [
  {
    change: "AUMENTO DE 30%",
    changeType: "positive",
    metric: "2345",
    title: "Idade média de inscritos",
    value: "18 - 24 anos"
  },
  {
    change: "AUMENTO DE 18%",
    changeType: "positive",
    metric: "3345",
    title: "Gênero",
    value: "Masculino"
  },
  {
    change: "DIMINUIÇÃO DE 15%",
    changeType: "negative",
    metric: "845",
    title: "Locais menos visitados",
    value: "Jequitinhonha"
  },
  {
    change: "AUMENTO DE 63%",
    changeType: "positive",
    metric: "123",
    title: "Interesse do momento",
    value: "Músicas Sertanejo"
  },
  {
    change: "DIMINUIÇÃO DE 21%",
    changeType: "negative",
    metric: "21",
    title: "Engajamento total",
    value: "Anúncios no Facebook"
  }
];

const interestSegments: Segment[] = [
  { color: "#7224F2", label: "Pagode", percentage: "16.3%", value: 212 },
  { color: "#111827", label: "Rock", percentage: "11.1%", value: 123 },
  { color: "#6B7280", label: "Forró", percentage: "29.4%", value: 234 },
  { color: "#9A95EF", label: "Axé", percentage: "19.0%", value: 218 },
  { color: "#6366F1", label: "Indie", percentage: "24.2%", value: 265 }
];

const ageSegments: Segment[] = [
  { color: "#4E46E5", label: "18 - 24 anos", percentage: "57.8%", value: 2345 },
  { color: "#6B7280", label: "25 - 34 anos", percentage: "33.1%", value: 1342 },
  { color: "#817BFF", label: "35 - 44 anos", percentage: "6.0%", value: 245 },
  { color: "#181945", label: "44+ anos", percentage: "3.1%", value: 124 }
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
            <input placeholder="Pesquisar" type="text" />
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

      <Grid className={styles.contentGrid} gap="md">
        <Grid item md={4} xs={12}>
          <div className={styles.sideCards}>
            {statsCards.map(card => (
              <Card className={styles.statCard} key={card.title}>
                <div>
                  <span className={styles.statTitle}>{card.title}</span>
                  <p className={styles.statValue}>{card.value}</p>
                </div>
                <div className={styles.statMeta}>
                  <span className={styles.statMetric}>{card.metric}</span>
                  <span
                    className={card.changeType === "positive" ? styles.statChangePositive : styles.statChangeNegative}
                  >
                    {card.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Grid>

        <Grid item md={8} xs={12}>
          <Container className={styles.dataPanel}>
            <Card className={styles.histogramCard}>
              <div className={styles.sectionHeader}>
                <h2>Localização dos inscritos</h2>
              </div>

              <div className={styles.barChart}>
                <LocationBarChart />
              </div>
            </Card>

            <Grid className={styles.donutGrid} gap="md">
              <Grid item md={6} xs={12}>
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
                        <div className={styles.legendItem} key={segment.label}>
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

              <Grid item md={6} xs={12}>
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
                        <div className={styles.legendItem} key={segment.label}>
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
