import type { Metadata } from 'next'
import JakPomociClient from './_client'

export const metadata: Metadata = {
  title: 'Jak pomoci — Handi4Camp',
  description:
    'Podpořte letní tábor pro děti s dětskou mozkovou obrnou. Darujte, staňte se dobrovolníkem nebo firemním sponzorem.',
  openGraph: {
    title: 'Jak pomoci — Handi4Camp',
    description:
      'Podpořte letní tábor pro děti s dětskou mozkovou obrnou. Darujte, staňte se dobrovolníkem nebo firemním sponzorem.',
    url: 'https://handi4camp.cz/jak-pomoci',
  },
}

export default function JakPomociPage() {
  return <JakPomociClient />
}
