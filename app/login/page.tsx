"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Package, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulasi proses login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Demo credentials - dalam aplikasi nyata, ini harus diverifikasi dengan backend
      const validCredentials = [
        { username: "admin", password: "admin123", role: "Administrator" },
        { username: "kasir", password: "kasir123", role: "Kasir" },
        { username: "manager", password: "manager123", role: "Manager" },
      ]

      const user = validCredentials.find(
        (cred) => cred.username === formData.username && cred.password === formData.password,
      )

      if (user) {
        // Simpan data user ke localStorage (dalam aplikasi nyata, gunakan JWT atau session)
        const userData = {
          username: user.username,
          role: user.role,
          loginTime: new Date().toISOString(),
        }

        localStorage.setItem("user", JSON.stringify(userData))

        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true")
        }

        toast.success(`Selamat datang, ${user.role}!`)

        // Redirect ke dashboard
        router.push("/dashboard")
      } else {
        toast.error("Username atau password salah!")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Terjadi kesalahan saat login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (username: string, password: string) => {
    setFormData((prev) => ({
      ...prev,
      username,
      password,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Toko Rara</CardTitle>
            <CardDescription className="text-gray-600">Masuk ke dashboard aplikasi</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                  Ingat saya
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Lupa password?{" "}
              <button className="text-blue-600 hover:underline" onClick={() => toast.info("Hubungi administrator")}>
                Hubungi Administrator
              </button>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">© 2024 Toko Rara. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
