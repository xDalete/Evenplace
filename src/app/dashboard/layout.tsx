import type { Metadata } from "next";
import "@/styles/globals.scss";

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
        {children}
      </body>
    </html>
  );
}