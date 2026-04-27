import type { Metadata } from 'next'
import GalerieClient from './_client'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const year = /^\d{4}$/.test(slug) ? slug : 'fotogalerie'
  return {
    title: `Galerie ${year} — Handi4Camp`,
    description: `Fotogalerie z letního tábora Handi4Camp ${year} pro děti s dětskou mozkovou obrnou.`,
    openGraph: {
      title: `Galerie ${year} — Handi4Camp`,
      description: `Fotogalerie z letního tábora Handi4Camp ${year} pro děti s dětskou mozkovou obrnou.`,
      url: `https://handi4camp.cz/galerie/${slug}`,
    },
  }
}

export default function GaleriePage() {
  return <GalerieClient />
}
