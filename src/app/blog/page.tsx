import { client } from '@/tina/__generated__/client'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogPage() {
  const { data } = await client.queries.postConnection({ sort: 'date' })
  const posts = [...(data.postConnection.edges ?? [])].reverse()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Blog</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">No posts yet.</p>
      )}

      <ul className="divide-y divide-gray-200">
        {posts.map((edge) => {
          const post = edge?.node
          if (!post) return null
          return (
            <li key={post.id} className="py-6">
              <Link
                href={`/blog/${post._sys.filename}`}
                className="group block space-y-1"
              >
                <p className="text-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="text-xl font-semibold group-hover:underline">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-gray-500">{post.excerpt}</p>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
