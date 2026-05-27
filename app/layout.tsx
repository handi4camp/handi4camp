import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import CookieBanner from "@/components/cookie-banner";
import { client } from "@/tina/__generated__/client";

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handi4Camp | Léto bez hranic",
  description:
    "Letní tábor pro děti s DMO pod záštitou Rotary klubů z Česka a ze Slovenska.",
  metadataBase: new URL("https://handi4camp.cz"),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Handi4Camp | Léto bez hranic",
    description:
      "Letní tábor pro děti s DMO pod záštitou Rotary klubů z Česka a ze Slovenska.",
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
    title: "Handi4Camp | Léto bez hranic",
    description:
      "Letní tábor pro děti s DMO pod záštitou Rotary klubů z Česka a ze Slovenska.",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalData = await client.queries.global({ relativePath: "global.md" });

  return (
    <html lang="cs" className={openSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://content.tinajs.io" />
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fhandicamp-foto-03.webp&w=828&q=75"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-white text-dark font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer initialData={globalData} />
        <CookieBanner />
      </body>
    </html>
  );
}
