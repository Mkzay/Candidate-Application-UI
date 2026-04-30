import type { ApplicationPayload, ApplicationResponse } from "@/types/application"

export async function submitApplication(
  data: ApplicationPayload,
): Promise<ApplicationResponse> {
  const res = await fetch("/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Submission failed")
  }

  return res.json()
}
