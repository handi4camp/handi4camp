import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie-banner";

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handi4Camp — Léto bez hranic",
  description:
    "Letní tábor pro děti s dětskou mozkovou obrnou. Již 20 let pod záštitou Rotary Club Valtice Břeclav.",
  metadataBase: new URL("https://handi4camp.cz"),
  icons: {
    icon: { url: "/favicon.png", type: "image/png" },
  },
  openGraph: {
    title: "Handi4Camp — Léto bez hranic",
    description:
      "Letní tábor pro děti s dětskou mozkovou obrnou. Již 20 let pod záštitou Rotary Club Valtice Břeclav.",
    url: "https://handi4camp.cz",
    siteName: "Handi4Camp",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Účastníci a vedoucí tábora Handi4Camp u rybníka za zlatého světla",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handi4Camp — Léto bez hranic",
    description:
      "Letní tábor pro děti s dětskou mozkovou obrnou. Již 20 let pod záštitou Rotary Club Valtice Břeclav.",
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Handi4Camp",
  alternateName: "HandiCamp",
  url: "https://handi4camp.cz",
  logo: "https://handi4camp.cz/favicon.png",
  description:
    "Letní tábor pro děti s dětskou mozkovou obrnou, pořádaný pod záštitou Rotary Club Valtice Břeclav.",
  sameAs: ["https://www.facebook.com/Handi4Camp"],
  memberOf: {
    "@type": "Organization",
    name: "Rotary Club Valtice Břeclav",
    url: "https://rotary.cz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={openSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-white text-dark font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
