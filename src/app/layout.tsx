import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Handi4Camp',
    template: '%s | Handi4Camp',
  },
  description: 'Handi4Camp website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200 px-6 py-4">
          <nav className="mx-auto flex max-w-5xl items-center justify-between">
            <a href="/" className="text-xl font-bold">
              Handi4Camp
            </a>
            <div className="flex gap-6 text-sm">
              <a href="/blog" className="hover:text-gray-600">Blog</a>
              <a href="/about" className="hover:text-gray-600">About</a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Handi4Camp
        </footer>
      </body>
    </html>
  )
}
