'use client'

import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { PostQuery, PostQueryVariables } from '@/tina/__generated__/types'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  data: PostQuery
  query: string
  variables: PostQueryVariables
}

export default function PostClient({ data, query, variables }: Props) {
  const { data: liveData } = useTina({ query, variables, data })
  const post = liveData.post

  return (
    <article className="mx-auto max-w-2xl space-y-8">
      {/* Back link */}
      <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700">
        ← Back to Blog
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <p className="text-sm text-gray-400">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
        {post.excerpt && (
          <p className="text-xl text-gray-500">{post.excerpt}</p>
        )}
        {post.author && (
          <div className="flex items-center gap-3 pt-2">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
        )}
      </header>

      {/* Cover image */}
      {post.cover && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      <div className="prose prose-gray max-w-none">
        <TinaMarkdown content={post.body} />
      </div>
    </article>
  )
}
