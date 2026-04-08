import { client } from '@/tina/__generated__/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageClient from './client-page'

export const metadata: Metadata = { title: 'About' }

export default async function AboutPage() {
  let result
  try {
    result = await client.queries.page({ relativePath: 'about.mdx' })
  } catch {
    notFound()
  }

  return (
    <PageClient
      data={result.data}
      query={result.query}
      variables={result.variables}
    />
  )
}
