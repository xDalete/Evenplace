import type { Metadata } from "next";
import "@/styles/globals.scss";
import Container from "@/components/common/Container";
import Sidebar from "@/components/Sidebar/SideBar";
import NavBar from "@/components/Sidebar/Navbar/NavBar";
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
    <html lang="pt-BR">
      <body>
        <div className={styles.layoutWrapper}>
          <div className={styles.navbarContainer}>
            <NavBar />
          </div>

          <Container className={styles.mainContainer}>
            <div className={styles.sidebarContainer}>
              <Sidebar />
            </div>

            <Container className={styles.contentContainer}>
              {children}
            </Container>
          </Container>
        </div>
      </body>
    </html>
  );
}