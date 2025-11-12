import type { Metadata } from "next";
import "@/styles/globals.scss";
import Container from "@/components/common/Container";
import Sidebar from "@/components/Navbar/SideBar";
import styles from "./layout.module.scss";

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
    <Container className={styles.layout}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
        <Container>{children}</Container>
    </Container>
  );
}
