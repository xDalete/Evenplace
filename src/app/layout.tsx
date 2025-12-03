import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.scss";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { AuthProvider } from "@/auth/AuthContext";
import AuthGuard from "@/components/Auth/AuthGuard";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"]
});

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
      <body className={`${poppins.className}`}>
        <ThemeToggle />
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
