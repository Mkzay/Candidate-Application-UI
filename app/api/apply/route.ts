import { NextResponse } from "next/server"

import type { ApplicationPayload, ApplicationResponse } from "@/types/application"

type ValidationErrors = Partial<Record<keyof ApplicationPayload, string>>

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ApplicationPayload>

    const payload: ApplicationPayload = {
      fullName: body.fullName?.trim() ?? "",
      email: body.email?.trim() ?? "",
      phone: body.phone?.trim() ?? "",
      role: body.role?.trim() ?? "",
      coverLetter: body.coverLetter?.trim() ?? "",
      resumeUrl: body.resumeUrl?.trim() ?? "",
    }

    const errors = validate(payload)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 },
      )
    }

    const response: ApplicationResponse = {
      success: true,
      message: "Application submitted successfully",
      applicationId: createApplicationId(),
    }

    return NextResponse.json(response, { status: 200 })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request payload",
      },
      { status: 400 },
    )
  }
}

function validate(fields: ApplicationPayload): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!fields.fullName) {
    errors.fullName = "Full name is required."
  }

  if (!fields.email) {
    errors.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address."
  }

  if (!fields.role) {
    errors.role = "Role is required."
  }

  if (!fields.coverLetter) {
    errors.coverLetter = "Cover letter is required."
  } else if (fields.coverLetter.length < 100) {
    errors.coverLetter = "Cover letter must be at least 100 characters."
  }

  if (!fields.resumeUrl) {
    errors.resumeUrl = "Resume upload is required."
  } else if (!isValidResumeUrl(fields.resumeUrl)) {
    errors.resumeUrl = "Resume payload is invalid."
  }

  return errors
}

function isValidResumeUrl(value: string): boolean {
  if (value.startsWith("data:application/pdf;base64,")) {
    return true
  }

  try {
    const parsed = new URL(value)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

function createApplicationId(): string {
  return `APP-${Date.now()}`
}
