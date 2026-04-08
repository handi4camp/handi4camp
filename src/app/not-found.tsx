import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-gray-500">This page could not be found.</p>
      <Link href="/" className="text-sm underline hover:text-gray-700">
        Go home
      </Link>
    </div>
  )
}
