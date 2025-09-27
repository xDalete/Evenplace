import CustomLink from "@/components/CustomLink";
import CardEvento from "@/components/CardEvento";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h1>Hello, Evenplace!</h1>
      <CustomLink href="/login">Login</CustomLink>
      <CustomLink href="/colors">Colors</CustomLink>
      <CardEvento title="Trio Parada Dura" date="20 de Setembro, 2025" location="Praça do Bairro São Pedro" placesAvailable={2500} ticketPrice={40.00} ticketsAvailable={1800} hour={"18:00h às 00:00"}/> 

    </div>
  );
}
