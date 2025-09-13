import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Shield, Award, ArrowRight, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">About Bio Nexsus</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Revolutionizing Healthcare Through
            <span className="text-purple-600"> AI-Powered Matching</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto text-pretty">
            Bio Nexsus is the world's first AI-powered platform connecting bio-sample donors with recipients, enabling
            life-saving treatments through advanced matching algorithms.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6">
                We believe that every person deserves access to life-saving treatments. Bio Nexsus bridges the gap
                between those who can donate and those who need bio-samples for critical medical procedures.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">AI-powered compatibility matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Secure and private data handling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Doctor-verified approvals</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/medical-stem-cell-education.jpg"
                alt="Medical research and bio-samples"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Compassion</h3>
                <p className="text-slate-600">
                  Every donation and match is driven by our commitment to saving lives and improving health outcomes.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Security</h3>
                <p className="text-slate-600">
                  Advanced encryption and privacy measures protect all personal and medical information.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Community</h3>
                <p className="text-slate-600">
                  Building a global network of donors, recipients, and medical professionals working together.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Excellence</h3>
                <p className="text-slate-600">
                  Cutting-edge AI technology and rigorous medical standards ensure the highest quality matches.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-slate-600">Successful Matches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-slate-600">Partner Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-slate-600">Match Accuracy</div>
            </div>
          </div>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Join Our Mission
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
