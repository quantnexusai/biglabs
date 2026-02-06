import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void blueprint-grid flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-sans font-bold text-carbon-800 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-sans font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-carbon-400 font-mono text-sm max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-outline">
          Return Home
        </Link>
      </div>
    </div>
  )
}
