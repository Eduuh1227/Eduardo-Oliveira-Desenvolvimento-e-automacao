import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Eduardo Augusto Oliveira Cavallin | Projetos de software',
  description: 'Estudante de Ciência da Computação na UNIP, em São Paulo. Conheça meus projetos em Python e JavaScript e baixe meu currículo.',
  openGraph: { locale: 'pt_BR', type: 'website', title: 'Eduardo Augusto Oliveira Cavallin | Portfólio pessoal', description: 'Ciência da Computação na UNIP · Projetos de software, visão computacional e currículo.' },
  twitter: { card: 'summary', title: 'Eduardo Augusto Oliveira Cavallin | Projetos de software', description: 'Projetos de Ciência da Computação e currículo.' },
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

