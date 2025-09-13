"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Login attempt started with email:", formData.email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in real app, this would be an API call
      if (formData.email && formData.password) {
        const userData = {
          email: formData.email,
          role: formData.email.includes("doctor") ? "doctor" : "user",
          name: formData.email.split("@")[0],
          loginTime: new Date().toISOString(),
          sessionId: Math.random().toString(36).substr(2, 9),
        }

        console.log("[v0] Storing user data:", userData)
        localStorage.setItem("user", JSON.stringify(userData))

        const storedData = localStorage.getItem("user")
        console.log("[v0] Verification - stored data:", storedData)

        if (storedData) {
          const parsedData = JSON.parse(storedData)
          console.log("[v0] Verification - parsed data:", parsedData)
        }

        window.dispatchEvent(new Event("authStateChanged"))
        console.log("[v0] Auth state change event dispatched")

        setTimeout(() => {
          // Redirect based on role
          if (userData.role === "doctor") {
            console.log("[v0] Redirecting to doctor dashboard")
            router.push("/doctor-dashboard")
          } else {
            console.log("[v0] Redirecting to user dashboard")
            router.push("/user-dashboard")
          }
        }, 100)
      } else {
        setError("Please fill in all fields")
      }
    } catch (err) {
      console.error("[v0] Login error:", err)
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-sm text-muted-foreground">
              Forgot your password?
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Demo Accounts:</p>
            <p>User: user@demo.com | Doctor: doctor@demo.com</p>
            <p>Password: any password</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
