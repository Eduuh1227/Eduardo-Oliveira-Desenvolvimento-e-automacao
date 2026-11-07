import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eduardo Oliveira | Desenvolvimento e automação",
  description: "Front-end, back-end, APIs e automações. Conheça os projetos de Eduardo Oliveira e vamos construir sua próxima experiência digital.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head><link rel="stylesheet" href="/fonts/fonts.css"/></head><body>{children}</body>
    </html>
  );
}

