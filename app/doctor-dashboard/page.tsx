"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, FileText, CheckCircle, XCircle, Clock, BarChart3, Bell, MessageSquare, Eye } from "lucide-react"

interface User {
  name: string
  email: string
  role: string
}

interface UserRequest {
  id: number
  patientName: string
  patientEmail: string
  sampleType: string
  uploadDate: string
  status: "pending" | "approved" | "declined"
  matchScore: number
  urgency: "low" | "medium" | "high"
  notes?: string
  doctorNotes?: string
}

export default function DoctorDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [userRequests, setUserRequests] = useState<UserRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<UserRequest | null>(null)
  const [doctorNotes, setDoctorNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "doctor") {
      router.push("/user-dashboard")
      return
    }

    setUser(parsedUser)

    // Mock user requests data
    const mockRequests: UserRequest[] = [
      {
        id: 1,
        patientName: "John Smith",
        patientEmail: "john.smith@email.com",
        sampleType: "Stem Cells",
        uploadDate: "2024-01-15",
        status: "pending",
        matchScore: 98,
        urgency: "high",
        notes: "Patient requires urgent stem cell therapy for leukemia treatment.",
      },
      {
        id: 2,
        patientName: "Sarah Johnson",
        patientEmail: "sarah.j@email.com",
        sampleType: "Blood Cells",
        uploadDate: "2024-01-14",
        status: "pending",
        matchScore: 95,
        urgency: "medium",
        notes: "Blood transfusion needed for upcoming surgery.",
      },
      {
        id: 3,
        patientName: "Michael Chen",
        patientEmail: "m.chen@email.com",
        sampleType: "Bone Marrow",
        uploadDate: "2024-01-13",
        status: "approved",
        matchScore: 92,
        urgency: "low",
        notes: "Bone marrow transplant for genetic disorder.",
        doctorNotes: "Approved after reviewing compatibility data. Patient is a good candidate.",
      },
      {
        id: 4,
        patientName: "Emily Davis",
        patientEmail: "emily.davis@email.com",
        sampleType: "Tissue Biopsy",
        uploadDate: "2024-01-12",
        status: "declined",
        matchScore: 78,
        urgency: "low",
        notes: "Research purposes for cancer study.",
        doctorNotes: "Match score too low for reliable results. Recommend additional testing.",
      },
    ]

    setUserRequests(mockRequests)
  }, [router])

  const handleApprove = async (requestId: number) => {
    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUserRequests((prev) =>
        prev.map((req) =>
          req.id === requestId
            ? { ...req, status: "approved" as const, doctorNotes: doctorNotes || "Approved by doctor" }
            : req,
        ),
      )

      setSelectedRequest(null)
      setDoctorNotes("")
      alert("Request approved successfully!")
    } catch (error) {
      console.error("Error approving request:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDecline = async (requestId: number) => {
    if (!doctorNotes.trim()) {
      alert("Please provide a reason for declining this request.")
      return
    }

    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUserRequests((prev) =>
        prev.map((req) => (req.id === requestId ? { ...req, status: "declined" as const, doctorNotes } : req)),
      )

      setSelectedRequest(null)
      setDoctorNotes("")
      alert("Request declined with notes.")
    } catch (error) {
      console.error("Error declining request:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingRequests = userRequests.filter((req) => req.status === "pending")
  const approvedRequests = userRequests.filter((req) => req.status === "approved")
  const declinedRequests = userRequests.filter((req) => req.status === "declined")

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome, Dr. {user.name}!</h1>
          <p className="text-muted-foreground mt-2">Review and approve bio-sample matching requests from patients</p>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">Patient Requests</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Patient Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</div>
                  <p className="text-xs text-muted-foreground">Awaiting your review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{approvedRequests.length}</div>
                  <p className="text-xs text-muted-foreground">Successfully approved</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userRequests.length}</div>
                  <p className="text-xs text-muted-foreground">Under your care</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">94%</div>
                  <p className="text-xs text-muted-foreground">Match approval rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Pending Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span>Pending Requests ({pendingRequests.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{request.patientName}</h3>
                          <p className="text-muted-foreground">{request.patientEmail}</p>
                          <p className="text-sm text-muted-foreground">Uploaded: {request.uploadDate}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getUrgencyColor(request.urgency)}>{request.urgency.toUpperCase()}</Badge>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-secondary">{request.matchScore}%</div>
                            <p className="text-xs text-muted-foreground">Match Score</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-2">Sample Type: {request.sampleType}</h4>
                        <p className="text-sm text-muted-foreground">{request.notes}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => setSelectedRequest(request)}
                          variant="outline"
                          className="flex-1 min-w-[120px]"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Review Details
                        </Button>
                        <Button
                          onClick={() => handleApprove(request.id)}
                          disabled={isProcessing}
                          className="flex-1 min-w-[120px] bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Quick Approve
                        </Button>
                      </div>
                    </div>
                  ))}

                  {pendingRequests.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="mx-auto h-12 w-12 mb-4" />
                      <p>No pending requests at the moment.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Decisions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...approvedRequests, ...declinedRequests].slice(0, 3).map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${request.status === "approved" ? "bg-green-50" : "bg-red-50"}`}
                        >
                          {request.status === "approved" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{request.patientName}</p>
                          <p className="text-sm text-muted-foreground">{request.sampleType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(request.status)}>{request.status.toUpperCase()}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{request.uploadDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Reviews</span>
                      <span className="font-bold">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Approved</span>
                      <span className="font-bold text-green-600">42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Declined</span>
                      <span className="font-bold text-red-600">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Success Rate</span>
                      <span className="font-bold text-secondary">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sample Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Stem Cells</span>
                      <span className="font-bold">15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Blood Cells</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Bone Marrow</span>
                      <span className="font-bold">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tissue Biopsy</span>
                      <span className="font-bold">7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Other</span>
                      <span className="font-bold">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Your Availability</CardTitle>
                <p className="text-muted-foreground">Set your consultation slots and availability status</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Current Status</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Available for consultations</span>
                      </div>
                      <Button variant="outline">Update Status</Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Weekly Schedule</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>Unavailable</span>
                        </div>
                      </div>
                      <Button variant="outline">Edit Schedule</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Recent Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New urgent request from John Smith</p>
                      <p className="text-sm text-muted-foreground">
                        Stem cell matching request requires immediate review
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Match approved successfully</p>
                      <p className="text-sm text-muted-foreground">
                        Sarah Johnson's blood cell match has been processed
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">New message from patient</p>
                      <p className="text-sm text-muted-foreground">Michael Chen has sent additional medical records</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Review Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Review Request - {selectedRequest.patientName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Patient</Label>
                    <p>{selectedRequest.patientName}</p>
                    <p className="text-sm text-muted-foreground">{selectedRequest.patientEmail}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Sample Type</Label>
                    <p>{selectedRequest.sampleType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Match Score</Label>
                    <p className="text-2xl font-bold text-secondary">{selectedRequest.matchScore}%</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Urgency</Label>
                    <Badge className={getUrgencyColor(selectedRequest.urgency)}>
                      {selectedRequest.urgency.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Patient Notes</Label>
                  <div className="bg-muted/30 rounded-lg p-4 mt-2">
                    <p className="text-sm">{selectedRequest.notes}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="doctor-notes">Your Notes/Decision Reason</Label>
                  <Textarea
                    id="doctor-notes"
                    placeholder="Enter your medical assessment, approval reason, or decline explanation..."
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    Your decision and notes will be recorded in the patient's medical record and shared with the
                    requesting healthcare team.
                  </AlertDescription>
                </Alert>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => handleApprove(selectedRequest.id)}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {isProcessing ? "Processing..." : "Approve"}
                  </Button>
                  <Button
                    onClick={() => handleDecline(selectedRequest.id)}
                    disabled={isProcessing}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    {isProcessing ? "Processing..." : "Decline"}
                  </Button>
                  <Button onClick={() => setSelectedRequest(null)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
