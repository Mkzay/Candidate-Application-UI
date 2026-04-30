import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Candidate Application UI",
  description: "Candidate application form",
}

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Candidate Application UI</h1>
      <p className="text-slate-600">Open the application form to test the full flow.</p>
      <Link
        href="/apply"
        className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
      >
        Go to application form
      </Link>
    </main>
  )
}
