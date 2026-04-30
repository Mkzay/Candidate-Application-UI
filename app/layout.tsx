import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Candidate Application UI",
  description: "Candidate job application form",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  )
}
