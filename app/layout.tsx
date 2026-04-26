import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={openSans.variable}>
      <body className="min-h-screen flex flex-col bg-warm-white text-dark font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
