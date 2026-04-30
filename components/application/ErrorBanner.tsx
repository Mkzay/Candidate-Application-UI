"use client"

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="text-sm font-medium text-red-700 underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
