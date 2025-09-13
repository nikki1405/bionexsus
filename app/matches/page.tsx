import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Activity,
  Filter,
  Search,
} from "lucide-react"

export default function MatchesPage() {
  const matches = [
    {
      id: 1,
      type: "Stem Cells",
      compatibility: 98,
      status: "approved",
      donor: {
        name: "Sarah M.",
        age: 28,
        location: "San Francisco, CA",
        bloodType: "O+",
        lastActive: "2 hours ago",
      },
      matchDetails: {
        hlaMatch: "10/10",
        riskLevel: "Low",
        estimatedSuccess: 95,
      },
      contact: {
        phone: "+1 (555) 123-4567",
        email: "sarah.m@email.com",
      },
      dateMatched: "2024-12-10",
      doctorApproved: true,
    },
    {
      id: 2,
      type: "Blood Cells",
      compatibility: 94,
      status: "pending",
      donor: {
        name: "Michael R.",
        age: 35,
        location: "Los Angeles, CA",
        bloodType: "A+",
        lastActive: "1 day ago",
      },
      matchDetails: {
        hlaMatch: "9/10",
        riskLevel: "Low",
        estimatedSuccess: 88,
      },
      contact: {
        phone: "+1 (555) 987-6543",
        email: "michael.r@email.com",
      },
      dateMatched: "2024-12-09",
      doctorApproved: false,
    },
    {
      id: 3,
      type: "Bone Marrow",
      compatibility: 91,
      status: "contacted",
      donor: {
        name: "Jennifer L.",
        age: 31,
        location: "Seattle, WA",
        bloodType: "B+",
        lastActive: "3 hours ago",
      },
      matchDetails: {
        hlaMatch: "8/10",
        riskLevel: "Medium",
        estimatedSuccess: 82,
      },
      contact: {
        phone: "+1 (555) 456-7890",
        email: "jennifer.l@email.com",
      },
      dateMatched: "2024-12-08",
      doctorApproved: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "contacted":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "contacted":
        return <Phone className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Matches</h1>
          <p className="text-xl text-slate-600">AI-powered compatibility matches for your bio-sample needs</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Matches</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">8</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg. Compatibility</p>
                  <p className="text-2xl font-bold text-purple-600">94%</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search matches..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Matches List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Matches</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {matches.map((match) => (
              <Card key={match.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{match.donor.name}</CardTitle>
                        <p className="text-slate-600">{match.type} Donor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(match.status)}>
                        {getStatusIcon(match.status)}
                        <span className="ml-1 capitalize">{match.status}</span>
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{match.compatibility}%</div>
                        <div className="text-sm text-slate-500">Compatibility</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Donor Info */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">Donor Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span>Age: {match.donor.age}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span>{match.donor.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-slate-400" />
                          <span>Blood Type: {match.donor.bloodType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span>Last active: {match.donor.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">Match Analysis</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>HLA Match: {match.matchDetails.hlaMatch}</span>
                            <span>{match.compatibility}%</span>
                          </div>
                          <Progress value={match.compatibility} className="h-2" />
                        </div>
                        <div className="text-sm space-y-1">
                          <div>
                            Risk Level: <span className="font-medium">{match.matchDetails.riskLevel}</span>
                          </div>
                          <div>
                            Success Rate: <span className="font-medium">{match.matchDetails.estimatedSuccess}%</span>
                          </div>
                          <div>
                            Matched: <span className="font-medium">{match.dateMatched}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-900">Actions</h4>
                      <div className="space-y-2">
                        {match.doctorApproved && (
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Donor
                          </Button>
                        )}
                        <Button variant="outline" className="w-full bg-transparent">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent">
                          View Full Profile
                        </Button>
                        {!match.doctorApproved && (
                          <p className="text-sm text-yellow-600 text-center">Awaiting doctor approval</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="approved">
            {matches
              .filter((m) => m.status === "approved")
              .map((match) => (
                <Card key={match.id} className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <p className="text-center text-slate-600">Approved matches content...</p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="pending">
            {matches
              .filter((m) => m.status === "pending")
              .map((match) => (
                <Card key={match.id} className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <p className="text-center text-slate-600">Pending matches content...</p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="contacted">
            {matches
              .filter((m) => m.status === "contacted")
              .map((match) => (
                <Card key={match.id} className="border-0 shadow-lg">
                  <CardContent className="pt-6">
                    <p className="text-center text-slate-600">Contacted matches content...</p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
