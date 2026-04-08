<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:tinacms-agent-rules -->
# TinaCMS Integration Rules

## Config
- Schema lives in `tina/config.ts` — use `defineConfig` from `tinacms`
- Collections define content with `path`, `name`, `label`, and `fields`
- Generated client is at `tina/__generated__/client` — never import from `tinacms` directly for queries

```ts
// tina/config.ts
import { defineConfig } from 'tinacms'

export default defineConfig({
  schema: {
    collections: [
      {
        label: 'Blog Posts',
        name: 'post',
        path: 'content/posts',
        fields: [
          { type: 'string', label: 'Title', name: 'title' },
          { type: 'string', label: 'Body', name: 'body', isBody: true },
        ],
      },
    ],
  },
})
```

## Data Fetching (App Router)
- **App Router pages are Server Components by default** — TinaCMS data fetching must be done client-side (`"use client"`) or via server-safe patterns
- Use the generated `client.queries.[collection]({ relativePath })` to fetch content
- For visual editing, pages **must** be client-side rendered and use the `useTina` hook

```tsx
// app/page.tsx — client-side data fetch
"use client"
import { useState, useEffect } from 'react'
import { client } from '../tina/__generated__/client'

export default function Home() {
  const [title, setTitle] = useState('')
  useEffect(() => {
    client.queries.post({ relativePath: 'Hello-World.md' })
      .then(r => setTitle(r.data.post.title))
  }, [])
  return <h1>{title}</h1>
}
```

## Visual Editing
- Import `useTina` from `tinacms/dist/react`
- Pass `{ query, variables, data }` from the client response
- Use `data` from `useTina`, not the original props — this enables live updates in edit mode

```tsx
import { useTina } from 'tinacms/dist/react'

export default function Page(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  return <h1>{data.post.title}</h1>
}
```

- Configure `ui.router` on a collection to enable visual editing links from the CMS list view:
  ```ts
  ui: { router: ({ document }) => `/blog/${document._sys.filename}` }
  ```
<!-- END:tinacms-agent-rules -->
