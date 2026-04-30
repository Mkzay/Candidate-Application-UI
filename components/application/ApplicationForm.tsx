"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"

import { submitApplication } from "@/lib/api"
import type { ApplicationPayload, FormState } from "@/types/application"

import ErrorBanner from "./ErrorBanner"
import FileUpload from "./FileUpload"
import FormField from "./FormField"
import SubmitButton from "./SubmitButton"
import SuccessState from "./SuccessState"

type FieldErrors = Partial<Record<keyof ApplicationPayload, string>>

const INITIAL_FIELDS: ApplicationPayload = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  coverLetter: "",
  resumeUrl: "",
}

export default function ApplicationForm() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [applicationId, setApplicationId] = useState("")
  const [fields, setFields] = useState<ApplicationPayload>(INITIAL_FIELDS)
  const [errors, setErrors] = useState<FieldErrors>({})

  const isLoading = formState === "loading"

  const handleChange =
    (key: keyof ApplicationPayload) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const handleResumeUpload = (resumeUrl: string) => {
    setFields((prev) => ({ ...prev, resumeUrl }))
    setErrors((prev) => ({ ...prev, resumeUrl: undefined }))
  }

  const handleResumeError = (message: string) => {
    setErrors((prev) => ({ ...prev, resumeUrl: message || undefined }))
  }

  const resetForm = () => {
    setFormState("idle")
    setErrorMessage("")
    setApplicationId("")
    setFields(INITIAL_FIELDS)
    setErrors({})
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage("")

    const nextErrors = validate(fields)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setFormState("loading")

    try {
      const result = await submitApplication(fields)
      setFormState("success")
      setApplicationId(result.applicationId ?? "")
    } catch (error) {
      setFormState("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      )
    }
  }

  if (formState === "success") {
    return <SuccessState applicationId={applicationId} onReset={resetForm} />
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {formState === "error" && errorMessage ? (
        <ErrorBanner message={errorMessage} onDismiss={() => setErrorMessage("")} />
      ) : null}
      <form onSubmit={onSubmit} className="space-y-5">
        <FormField label="Full Name" required error={errors.fullName}>
          <input
            type="text"
            value={fields.fullName}
            onChange={handleChange("fullName")}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </FormField>

        <FormField label="Email" required error={errors.email}>
          <input
            type="email"
            value={fields.email}
            onChange={handleChange("email")}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </FormField>

        <FormField label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={fields.phone}
            onChange={handleChange("phone")}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </FormField>

        <FormField label="Role applying for" required error={errors.role}>
          <input
            type="text"
            value={fields.role}
            onChange={handleChange("role")}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </FormField>

        <FormField label="Cover Letter" required error={errors.coverLetter}>
          <textarea
            value={fields.coverLetter}
            onChange={handleChange("coverLetter")}
            disabled={isLoading}
            rows={6}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
        </FormField>

        <FormField label="Resume / CV (PDF only)" required error={errors.resumeUrl}>
          <FileUpload
            disabled={isLoading}
            onUploadComplete={handleResumeUpload}
            onUploadError={handleResumeError}
          />
        </FormField>

        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  )
}

function validate(fields: ApplicationPayload): FieldErrors {
  const nextErrors: FieldErrors = {}

  if (!fields.fullName.trim()) {
    nextErrors.fullName = "Full name is required."
  }

  if (!fields.email.trim()) {
    nextErrors.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    nextErrors.email = "Enter a valid email address."
  }

  if (!fields.role.trim()) {
    nextErrors.role = "Role is required."
  }

  if (!fields.coverLetter.trim()) {
    nextErrors.coverLetter = "Cover letter is required."
  } else if (fields.coverLetter.trim().length < 100) {
    nextErrors.coverLetter = "Cover letter must be at least 100 characters."
  }

  if (!fields.resumeUrl.trim()) {
    nextErrors.resumeUrl = "Resume upload is required."
  }

  return nextErrors
}
