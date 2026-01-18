import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import "@/styles/globals.scss";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/auth/AuthContext";
import AuthGuard from "@/components/Auth/AuthGuard";
import ThemeToggle from "@/components/theme/ThemeToggle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});

//TODO: Melhorar SEO com mais detalhes
export const metadata: Metadata = {
  description: "Gestão de Eventos & Ingressos",
  title: "Evenplace - Gestão de Eventos & Ingressos"
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
        <Toaster position="top-right" />
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
