export interface ApplicationPayload {
  fullName: string
  email: string
  phone: string
  role: string
  coverLetter: string
  resumeUrl: string
}

export interface ApplicationResponse {
  success: boolean
  message: string
  applicationId?: string
}

export type FormState = "idle" | "loading" | "success" | "error"
