"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Camera, Shield, Save, Upload, Trash2, Eye, EyeOff, CheckCircle } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  role: string
  intention?: string
  dateOfBirth?: string
  address?: string
  emergencyContact?: string
  medicalHistory?: string[]
  allergies?: string[]
  medications?: string[]
  bloodType?: string
  profileImage?: string
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  matchAlerts: boolean
  doctorUpdates: boolean
  systemUpdates: boolean
  marketingEmails: boolean
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "medical-only"
  shareWithResearchers: boolean
  allowDataAnalytics: boolean
  showInDirectory: boolean
  anonymousMatching: boolean
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    matchAlerts: true,
    doctorUpdates: true,
    systemUpdates: false,
    marketingEmails: false,
  })
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "medical-only",
    shareWithResearchers: false,
    allowDataAnalytics: true,
    showInDirectory: false,
    anonymousMatching: true,
  })
  const [showSensitiveData, setShowSensitiveData] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    // Extend with additional profile data
    const fullProfile: UserProfile = {
      ...parsedUser,
      dateOfBirth: "1990-05-15",
      address: "123 Health St, San Francisco, CA 94102",
      emergencyContact: "Jane Doe - (555) 123-4567",
      medicalHistory: ["Hypertension", "Type 2 Diabetes"],
      allergies: ["Penicillin", "Shellfish"],
      medications: ["Metformin", "Lisinopril"],
      bloodType: "A+",
    }
    setUser(fullProfile)
  }, [router])

  const handleSaveProfile = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(user))
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Failed to save profile:", error)
      alert("Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && user) {
      // In a real app, you'd upload to a server
      const imageUrl = URL.createObjectURL(file)
      setUser({ ...user, profileImage: imageUrl })
    }
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile & Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your personal information and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Personal Information</span>
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isSaving}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center overflow-hidden">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-secondary" />
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-secondary text-secondary-foreground rounded-full p-2 cursor-pointer hover:bg-secondary/80">
                        <Camera className="h-4 w-4" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-1">
                      {user.role === "user" ? "Patient" : "Doctor"}
                    </Badge>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={user.phone || ""}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={user.dateOfBirth || ""}
                      onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={user.address || ""}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={user.emergencyContact || ""}
                    onChange={(e) => setUser({ ...user, emergencyContact: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Name - Phone Number"
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Information Tab */}
          <TabsContent value="medical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Medical Information</span>
                  <Button variant="outline" size="sm" onClick={() => setShowSensitiveData(!showSensitiveData)}>
                    {showSensitiveData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showSensitiveData ? "Hide" : "Show"} Sensitive Data
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Your medical information is encrypted and only shared with authorized medical professionals and
                    compatible matches with your explicit consent.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <div className="p-3 bg-muted/30 rounded-lg">{showSensitiveData ? user.bloodType : "••••"}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Bio-Sample Intention</Label>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      {user.intention ? user.intention.charAt(0).toUpperCase() + user.intention.slice(1) : "Not set"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Medical History</Label>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    {showSensitiveData ? (
                      <div className="flex flex-wrap gap-2">
                        {user.medicalHistory?.map((condition, index) => (
                          <Badge key={index} variant="outline">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      "••••••••••••"
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allergies</Label>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    {showSensitiveData ? (
                      <div className="flex flex-wrap gap-2">
                        {user.allergies?.map((allergy, index) => (
                          <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      "••••••••••••"
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Medications</Label>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    {showSensitiveData ? (
                      <div className="flex flex-wrap gap-2">
                        {user.medications?.map((medication, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {medication}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      "••••••••••••"
                    )}
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Medical Records
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <p className="text-muted-foreground">Choose how you want to be notified about important updates</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Match Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new matches are found</p>
                    </div>
                    <Switch
                      checked={notifications.matchAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, matchAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Doctor Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications from your assigned doctors</p>
                    </div>
                    <Switch
                      checked={notifications.doctorUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, doctorUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Platform updates and maintenance notifications</p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Promotional content and feature updates</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                    />
                  </div>
                </div>

                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <p className="text-muted-foreground">Control how your information is shared and used</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value: any) => setPrivacy({ ...privacy, profileVisibility: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Visible to all users</SelectItem>
                        <SelectItem value="medical-only">Medical Only - Visible to medical professionals</SelectItem>
                        <SelectItem value="private">Private - Not visible to others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Share with Researchers</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymized data to be used for medical research
                      </p>
                    </div>
                    <Switch
                      checked={privacy.shareWithResearchers}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, shareWithResearchers: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Data Analytics</Label>
                      <p className="text-sm text-muted-foreground">Help improve our AI matching algorithms</p>
                    </div>
                    <Switch
                      checked={privacy.allowDataAnalytics}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowDataAnalytics: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Show in Directory</Label>
                      <p className="text-sm text-muted-foreground">Appear in public donor/recipient directory</p>
                    </div>
                    <Switch
                      checked={privacy.showInDirectory}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showInDirectory: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Anonymous Matching</Label>
                      <p className="text-sm text-muted-foreground">Keep your identity hidden during initial matching</p>
                    </div>
                    <Switch
                      checked={privacy.anonymousMatching}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, anonymousMatching: checked })}
                    />
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Data Protection:</strong> All your data is encrypted with 256-bit encryption and stored
                    securely. We never share your personal information without explicit consent.
                  </AlertDescription>
                </Alert>

                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Download My Data
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
