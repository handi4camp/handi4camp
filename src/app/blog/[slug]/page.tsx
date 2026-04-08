import { client } from '@/tina/__generated__/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostClient from './client-page'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await client.queries.postConnection()
  return (data.postConnection.edges ?? []).map((edge) => ({
    slug: edge?.node?._sys.filename,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { data } = await client.queries.post({ relativePath: `${slug}.mdx` })
    return { title: data.post.title }
  } catch {
    return {}
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  let result
  try {
    result = await client.queries.post({ relativePath: `${slug}.mdx` })
  } catch {
    notFound()
  }

  return (
    <PostClient
      data={result.data}
      query={result.query}
      variables={result.variables}
    />
  )
}
