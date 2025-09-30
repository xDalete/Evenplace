import CustomLink from "@/components/CustomLink";
import CardEvento from "@/components/CardEvento";
import Grid from "@/components/Grid";
import { EventWithInfo } from "@/lib/Types/EventTypes";
import Sidebar from "@/components/Navbar/SideBar";
const evento: EventWithInfo = {
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
};
export default function Home() {
  return (
   
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "100vh",
        padding: "20px"
      }}
    >
    
      <h1>Hello, Evenplace!</h1>
      <CustomLink href="/login">Login</CustomLink>
      <CustomLink href="/colors">Colors</CustomLink>
      <Sidebar />
      <Grid xs={1} sm={2} md={3}>
        <CardEvento evento={evento} />
        <CardEvento evento={evento} />
        <CardEvento evento={evento} />
        <CardEvento evento={evento} />
        <CardEvento evento={evento} />
        <CardEvento evento={evento} />
      </Grid>
    </div>
  );
}
