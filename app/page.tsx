"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Cek apakah user sudah login
    const userData = localStorage.getItem("user")

    if (userData) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return null
}
