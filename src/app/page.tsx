import { client } from '@/tina/__generated__/client'
import Link from 'next/link'

export default async function HomePage() {
  const { data } = await client.queries.postConnection({
    sort: 'date',
    last: 3,
  })

  const posts = data.postConnection.edges ?? []

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Handi4Camp</h1>
        <p className="text-xl text-gray-500">Welcome to our site.</p>
        <Link
          href="/blog"
          className="inline-block rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Read the blog
        </Link>
      </section>

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((edge) => {
              const post = edge?.node
              if (!post) return null
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post._sys.filename}`}
                  className="group block rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-colors"
                >
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <h3 className="font-semibold group-hover:underline">{post.title}</h3>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  )}
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
