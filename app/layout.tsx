import type { Metadata } from "next";
import "./globals.css";
import ScrollReveal from "@/components/ScrollReveal";
import RegisterSW from "@/components/RegisterSW";

export const metadata: Metadata = {
  title: "Atonu Ahmed — Senior Software Engineer & Product Manager",
  description:
    "Portfolio of Atonu Ahmed — 7+ years building full-stack SaaS products, microservices, and elegant digital experiences. Angular, React, .NET, TypeScript, AWS.",
  keywords:
    "Atonu Ahmed, Software Engineer, Product Manager, Full Stack Developer, Angular, React, TypeScript, .NET, SaaS, Dhaka Bangladesh",
  authors: [{ name: "Atonu Ahmed" }],
  metadataBase: new URL("https://atonu.cloud"),
  openGraph: {
    title: "Atonu Ahmed — Senior Software Engineer & Product Manager",
    description:
      "7+ years building full-stack SaaS products, microservices, and elegant digital experiences.",
    type: "website",
    url: "https://atonu.cloud",
    siteName: "Atonu Ahmed Portfolio",
    images: [
      {
        url: "/avatars/about.png",
        width: 1200,
        height: 630,
        alt: "Atonu Ahmed Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atonu Ahmed — Senior Software Engineer & Product Manager",
    description:
      "7+ years building full-stack SaaS products, microservices, and elegant digital experiences.",
    images: ["/avatars/about.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Atonu Ahmed",
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
        {/* Apple PWA Splash Screens */}
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1290-2796.png" media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1179-2556.png" media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1284-2778.png" media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1170-2532.png" media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1125-2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-1242-2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-828-1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
        <link rel="apple-touch-startup-image" href="/splash/apple-splash-750-1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
      </head>
      <body>
        <RegisterSW />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}

