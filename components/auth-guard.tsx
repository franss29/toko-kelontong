"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface User {
  username: string
  role: string
  loginTime: string
}

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")

        if (userData) {
          const parsedUser = JSON.parse(userData)

          // Cek apakah login masih valid (contoh: 24 jam)
          const loginTime = new Date(parsedUser.loginTime)
          const now = new Date()
          const hoursDiff =
            (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)

          if (hoursDiff > 24) {
            // Login expired
            localStorage.removeItem("user")
            localStorage.removeItem("rememberMe")
            router.push("/login")
            return
          }

          setUser(parsedUser)

          // Jika user sudah login tapi tetap buka /login → redirect ke dashboard
          if (pathname === "/login") {
            router.push("/dashboard")
            return
          }
        } else {
          // Tidak ada user data, redirect ke login (kecuali sedang di /login)
          if (pathname !== "/login") {
            router.push("/login")
            return
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("rememberMe")
        router.push("/login")
        return
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, pathname])

  // Kalau masih loading → tampilkan loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
