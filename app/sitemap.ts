import type { MetadataRoute } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'

function getGalleryYears(): number[] {
  const dir = join(process.cwd(), 'content', 'gallery')
  return readdirSync(dir)
    .filter((f) => /^\d{4}\.md$/.test(f))
    .map((f) => parseInt(f.replace('.md', ''), 10))
    .sort((a, b) => b - a)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const galleryYears = getGalleryYears()
  return [
    {
      url: 'https://handi4camp.cz',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://handi4camp.cz/jak-pomoci',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...galleryYears.map((year) => ({
      url: `https://handi4camp.cz/galerie/${year}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    {
      url: 'https://handi4camp.cz/kontakt',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
