"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import { Heart, ArrowRight } from "lucide-react"

export default function QuestionnairePage() {
  const [intention, setIntention] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!intention || !agreedToTerms) return

    setIsLoading(true)

    try {
      // Update user data with questionnaire responses
      const userData = JSON.parse(localStorage.getItem("user") || "{}")
      userData.intention = intention
      userData.completedQuestionnaire = true
      localStorage.setItem("user", JSON.stringify(userData))

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to user dashboard
      router.push("/user-dashboard")
    } catch (error) {
      console.error("Error saving questionnaire:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-secondary/10 p-4 rounded-full w-fit mb-4">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Welcome to Bio Nexsus!</CardTitle>
              <p className="text-muted-foreground">
                Help us understand your needs so we can provide the best possible service
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">What brings you to Bio Nexsus today?</Label>
                  <RadioGroup value={intention} onValueChange={setIntention} className="space-y-3">
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="donate" id="donate" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="donate" className="cursor-pointer font-medium">
                          I want to donate bio-samples
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Help others by donating stem cells, blood, bone marrow, or other bio-samples
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="receive" id="receive" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="receive" className="cursor-pointer font-medium">
                          I need to receive bio-samples
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Find compatible donors for medical treatment or research purposes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="both" id="both" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="both" className="cursor-pointer font-medium">
                          Both - I may donate and receive
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          I'm interested in both donating to help others and potentially receiving samples
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">What happens next?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Access your personalized dashboard</li>
                    <li>• Upload your bio-sample data securely</li>
                    <li>• Get AI-powered compatibility matches</li>
                    <li>• Connect with verified medical professionals</li>
                    <li>• Track your donation/recipient journey</li>
                  </ul>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="terms-questionnaire" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                  <Label htmlFor="terms-questionnaire" className="text-sm cursor-pointer leading-relaxed">
                    I understand that all bio-sample matching will be reviewed by certified medical professionals, and I
                    agree to follow all safety guidelines and medical protocols established by Bio Nexsus.
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={!intention || !agreedToTerms || isLoading}>
                  {isLoading ? (
                    "Setting up your account..."
                  ) : (
                    <>
                      Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
