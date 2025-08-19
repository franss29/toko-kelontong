"use client"

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "sonner"
import { AuthGuard } from "@/components/auth-guard"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthGuard>
            {isLoginPage ? (
              <main className="min-h-screen">{children}</main>
            ) : (
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 flex flex-col">{children}</main>
              </div>
            )}
            <Toaster position="top-right" richColors />
          </AuthGuard>
        </ThemeProvider>
      </body>
    </html>
  )
}
