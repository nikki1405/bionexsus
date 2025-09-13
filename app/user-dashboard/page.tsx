"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  UserCheck,
  BookOpen,
  Heart,
  Droplets,
  Bone,
  Microscope,
  TestTube,
  Dna,
  Shield,
  Clock,
  FileText,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { MapsIntegration } from "@/components/maps-integration"

interface User {
  name: string
  email: string
  role: string
  intention?: string
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "user") {
      router.push("/doctor-dashboard")
      return
    }

    setUser(parsedUser)
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  const bioSampleTypes = [
    {
      icon: Heart,
      title: "Stem Cells",
      description: "Upload stem cell data for regenerative medicine matching",
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      icon: Droplets,
      title: "Blood Cells",
      description: "Blood type, HLA markers, and compatibility data",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      icon: Bone,
      title: "Bone Marrow",
      description: "Bone marrow typing and donor compatibility information",
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      icon: Microscope,
      title: "Tissue Biopsy",
      description: "Tissue sample analysis and pathology reports",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      icon: TestTube,
      title: "Saliva/Cheek Swabs",
      description: "Genetic markers and DNA analysis from saliva samples",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      icon: Dna,
      title: "Peripheral Blood",
      description: "Circulating blood analysis and biomarker data",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
  ]

  const recentMatches = [
    {
      id: 1,
      type: "Stem Cells",
      matchScore: 98,
      status: "Pending Doctor Review",
      date: "2024-01-15",
    },
    {
      id: 2,
      type: "Blood Cells",
      matchScore: 95,
      status: "Approved",
      date: "2024-01-12",
    },
  ]

  const assignedDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Hematology",
      status: "Available",
      lastContact: "2024-01-14",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Regenerative Medicine",
      status: "Reviewing",
      lastContact: "2024-01-13",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground mt-2">
            {user.intention === "donate" && "Ready to help others through bio-sample donation"}
            {user.intention === "receive" && "Find the perfect bio-sample match for your needs"}
            {user.intention === "both" && "Explore donation and recipient opportunities"}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="health-banks">Health Banks</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Pending review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96%</div>
                  <p className="text-xs text-muted-foreground">Match compatibility</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-secondary/10 p-2 rounded-lg">
                          <Heart className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">{match.type}</p>
                          <p className="text-sm text-muted-foreground">Match Score: {match.matchScore}%</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={match.status === "Approved" ? "default" : "secondary"}>{match.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{match.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Data Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Bio-Sample Data</CardTitle>
                <p className="text-muted-foreground">
                  Select the type of bio-sample data you want to upload for AI-powered matching
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bioSampleTypes.map((sample, index) => {
                    const IconComponent = sample.icon
                    return (
                      <Card
                        key={index}
                        className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 ${sample.color}`}
                      >
                        <CardHeader className="text-center">
                          <div className="mx-auto bg-background p-3 rounded-full w-fit mb-2">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-lg">{sample.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-sm text-muted-foreground mb-4">{sample.description}</p>
                          <Button asChild className="w-full">
                            <Link href={`/upload/${sample.title.toLowerCase().replace(/\s+/g, "-")}`}>Upload Data</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Medical Team</CardTitle>
                <p className="text-muted-foreground">
                  Doctors assigned to review your bio-sample data and approve matches
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-full">
                          <UserCheck className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          <p className="text-xs text-muted-foreground">Last contact: {doctor.lastContact}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doctor.status === "Available" ? "default" : "secondary"}>{doctor.status}</Badge>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Status Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Status Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-50 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Stem Cell Data - Upload #001</p>
                        <p className="text-sm text-muted-foreground">Reviewed by Dr. Sarah Johnson</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-yellow-50 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Blood Cell Data - Upload #002</p>
                        <p className="text-sm text-muted-foreground">Under review by Dr. Michael Chen</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Banks Tab */}
          <TabsContent value="health-banks" className="space-y-6">
            <MapsIntegration />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button asChild className="h-auto p-4 flex flex-col items-center space-y-2">
                <Link href="/upload">
                  <Upload className="h-6 w-6" />
                  <span>Upload New Data</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Link href="/awareness">
                  <BookOpen className="h-6 w-6" />
                  <span>Learn More</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Link href="/profile">
                  <UserCheck className="h-6 w-6" />
                  <span>Edit Profile</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Link href="/matches">
                  <Heart className="h-6 w-6" />
                  <span>View Matches</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
