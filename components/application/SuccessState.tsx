"use client"

interface SuccessStateProps {
  applicationId?: string
  onReset: () => void
}

export default function SuccessState({
  applicationId,
  onReset,
}: SuccessStateProps) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
      <h2 className="text-2xl font-semibold text-emerald-900">
        Application submitted successfully
      </h2>
      <p className="mt-2 text-emerald-800">
        Thank you for applying. Our team will review your application shortly.
      </p>
      {applicationId ? (
        <p className="mt-3 text-sm text-emerald-700">
          Application ID: <span className="font-semibold">{applicationId}</span>
        </p>
      ) : null}
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600"
      >
        Apply for another role
      </button>
    </section>
  )
}
