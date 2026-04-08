"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "@/tina/__generated__/client";
import type { PostQuery, PostQueryVariables } from "@/tina/__generated__/types";

type TinaData = {
  data: PostQuery;
  variables: PostQueryVariables;
  query: string;
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [tinaData, setTinaData] = useState<TinaData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    client.queries
      .post({ relativePath: `${slug}.md` })
      .then((res) => setTinaData(res))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-dark/60">
        <p className="font-serif text-2xl">Článek nebyl nalezen.</p>
        <Link href="/galerie" className="text-forest font-semibold hover:text-dark transition-colors">
          ← Zpět na galerii
        </Link>
      </div>
    );
  }

  if (!tinaData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-dark/40 text-sm">
        Načítám…
      </div>
    );
  }

  return <PostView tinaData={tinaData} />;
}

function PostView({ tinaData }: { tinaData: TinaData }) {
  const { data } = useTina(tinaData);
  const post = data.post;

  return (
    <article className="py-16 bg-warm-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/galerie"
          className="text-forest font-semibold hover:text-dark transition-colors text-sm mb-8 inline-block"
        >
          ← Zpět na aktuality
        </Link>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl mb-8"
          />
        )}

        <time className="text-xs text-dark/50 mb-3 block">
          {new Date(post.date).toLocaleDateString("cs-CZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h1 className="font-serif text-4xl font-bold text-dark mb-8 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-dark/70 mb-8 leading-relaxed border-l-4 border-gold pl-4">
            {post.excerpt}
          </p>
        )}

        <div className="prose prose-lg max-w-none text-dark/80 leading-relaxed">
          <TinaMarkdown content={post.body} />
        </div>
      </div>
    </article>
  );
}
