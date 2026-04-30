import type { Metadata } from "next"

import ApplicationForm from "@/components/application/ApplicationForm"

export const metadata: Metadata = {
  title: "Apply | Candidate Application",
  description: "Submit your application for the role you are interested in.",
}

export default function ApplyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Candidate Application</h1>
      <p className="mb-8 text-slate-600">
        Complete the form below to apply for your preferred role.
      </p>
      <ApplicationForm />
    </main>
  )
}
