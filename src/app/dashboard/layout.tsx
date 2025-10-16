import type { Metadata } from "next";
import "@/styles/globals.scss";
import Container from "@/components/common/Container";
import Sidebar from "@/components/Navbar/SideBar";

//TODO: Melhorar SEO com mais detalhes
export const metadata: Metadata = {
  title: "Evenplace - Gestão de Eventos & Ingressos",
  description: "Gestão de Eventos & Ingressos"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        padding: "12px",
        gap: "12px"
      }}
    >
      <Sidebar />
      <Container>{children}</Container>
    </Container>
  );
}
