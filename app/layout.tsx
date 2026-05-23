import type { Metadata } from "next";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Atonu Ahmed — Senior Software Engineer & Product Manager",
  description:
    "Portfolio of Atonu Ahmed — 7+ years building full-stack SaaS products, microservices, and elegant digital experiences. Angular, React, .NET, TypeScript, AWS.",
  keywords:
    "Atonu Ahmed, Software Engineer, Product Manager, Full Stack Developer, Angular, React, TypeScript, .NET, SaaS, Dhaka Bangladesh",
  authors: [{ name: "Atonu Ahmed" }],
  openGraph: {
    title: "Atonu Ahmed — Senior Software Engineer & Product Manager",
    description:
      "7+ years building full-stack SaaS products, microservices, and elegant digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
