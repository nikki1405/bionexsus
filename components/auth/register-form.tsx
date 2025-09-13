"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Phone, Upload, FileText, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [doctorDocuments, setDoctorDocuments] = useState({
    govtApproval: null as File | null,
    stemOrgProof: null as File | null,
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validation
      if (!agreedToTerms) {
        setError("Please agree to the Terms & Privacy Policy")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }

      if (formData.role === "doctor") {
        if (!doctorDocuments.govtApproval) {
          setError("Please upload government approval document")
          return
        }
        if (!doctorDocuments.stemOrgProof) {
          setError("Please upload stem organization proof document")
          return
        }
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration - in real app, this would be an API call
      const userData = {
        email: formData.email,
        role: formData.role,
        name: formData.name,
        phone: formData.phone,
        ...(formData.role === "doctor" && {
          documents: {
            govtApproval: doctorDocuments.govtApproval?.name,
            stemOrgProof: doctorDocuments.stemOrgProof?.name,
            verified: false, // Will be verified by admin
          },
        }),
      }
      localStorage.setItem("user", JSON.stringify(userData))

      // Redirect to questionnaire for users, dashboard for doctors
      if (formData.role === "user") {
        router.push("/questionnaire")
      } else {
        router.push("/doctor-dashboard")
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
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

  const handleFileUpload = (type: "govtApproval" | "stemOrgProof", file: File | null) => {
    setDoctorDocuments((prev) => ({
      ...prev,
      [type]: file,
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

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
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Account Type</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user" className="cursor-pointer">
                  User - I want to donate or receive bio-samples
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doctor" id="doctor" />
                <Label htmlFor="doctor" className="cursor-pointer">
                  Doctor - I want to review and approve matches
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.role === "doctor" && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Shield className="h-4 w-4" />
                Doctor Verification Documents (Required)
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="govtApproval" className="text-sm">
                    Government Medical License/Approval *
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="govtApproval"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("govtApproval", e.target.files?.[0] || null)}
                      className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary file:text-primary-foreground"
                      required
                    />
                    {doctorDocuments.govtApproval && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <FileText className="h-3 w-3" />
                        {doctorDocuments.govtApproval.name}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload your valid medical license or government approval document
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stemOrgProof" className="text-sm">
                    Stem Cell Organization Certification *
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="stemOrgProof"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload("stemOrgProof", e.target.files?.[0] || null)}
                      className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary file:text-primary-foreground"
                      required
                    />
                    {doctorDocuments.stemOrgProof && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <FileText className="h-3 w-3" />
                        {doctorDocuments.stemOrgProof.name}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload certification from recognized stem cell organization
                  </p>
                </div>
              </div>

              <Alert>
                <Upload className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Your documents will be verified by our admin team before account activation. Accepted formats: PDF,
                  JPG, PNG (Max 5MB each)
                </AlertDescription>
              </Alert>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the{" "}
              <Button variant="link" className="p-0 h-auto text-secondary">
                Terms & Conditions
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-secondary">
                Privacy Policy
              </Button>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !agreedToTerms}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
