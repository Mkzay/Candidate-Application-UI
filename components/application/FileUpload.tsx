"use client"

import { useState, type ChangeEvent } from "react"

interface FileUploadProps {
  disabled?: boolean
  onUploadComplete: (resumeUrl: string) => void
  onUploadError: (message: string) => void
}

export default function FileUpload({
  disabled = false,
  onUploadComplete,
  onUploadError,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      onUploadError("Resume must be a PDF file.")
      return
    }

    setIsUploading(true)
    onUploadError("")

    try {
      // Simulate a storage upload by converting the file to base64.
      const base64 = await fileToBase64(file)
      onUploadComplete(base64)
      setFileName(file.name)
    } catch {
      onUploadError("Failed to process resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        disabled={disabled || isUploading}
        onChange={handleFileChange}
        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 disabled:cursor-not-allowed disabled:bg-slate-100"
      />
      {isUploading ? (
        <p className="mt-1 text-sm text-slate-500">Processing resume...</p>
      ) : null}
      {fileName ? <p className="mt-1 text-sm text-slate-600">{fileName}</p> : null}
    </div>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Invalid file result"))
      }
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
