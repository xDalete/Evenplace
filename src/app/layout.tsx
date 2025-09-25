import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.scss";
import ThemeToggle from "@/components/ThemeToggle";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

//TODO: Melhorar SEO com mais detalhes
export const metadata: Metadata = {
  title: "Evenplace - Gestão de Eventos & Ingressos",
  description: "Gestão de Eventos & Ingressos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className}`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
