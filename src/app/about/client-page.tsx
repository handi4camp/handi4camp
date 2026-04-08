'use client'

import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { PageQuery, PageQueryVariables } from '@/tina/__generated__/types'

interface Props {
  data: PageQuery
  query: string
  variables: PageQueryVariables
}

export default function PageClient({ data, query, variables }: Props) {
  const { data: liveData } = useTina({ query, variables, data })
  const page = liveData.page

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <div className="prose prose-gray max-w-none">
        <TinaMarkdown content={page.body} />
      </div>
    </article>
  )
}
