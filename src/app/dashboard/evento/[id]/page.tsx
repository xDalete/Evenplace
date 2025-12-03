import { getEventoById } from "@/api/Evento";
import { DoughnutChart } from "@/components/charts/DoughnutChart";
import Card from "@/components/common/Card";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";

export default async function Evento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const evento = await getEventoById(id);
  if (!evento) {
    return <div>Evento não encontrado</div>;
  }
  return (
    <div>
      {evento.name}
      <Card>
        <Grid gap="md">
          {[1, 2, 3, 4].map(evento => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={evento}>
              <Card bgColor="light">
                <Container style={{ aspectRatio: "1" }}>
                  <DoughnutChart />
                </Container>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
}
