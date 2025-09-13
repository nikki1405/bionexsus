import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dna,
  Droplets,
  Bone,
  Eye,
  Heart,
  Key as Kidney,
  Brain,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Dna,
      title: "Stem Cell Matching",
      description:
        "Advanced AI algorithms match stem cell donors with recipients based on genetic compatibility and medical requirements.",
      features: ["HLA typing analysis", "Disease-specific matching", "Real-time availability"],
      color: "text-purple-600",
    },
    {
      icon: Droplets,
      title: "Blood Cell Banking",
      description: "Comprehensive blood cell matching for various blood disorders and cancer treatments.",
      features: ["ABO/Rh compatibility", "Rare blood type matching", "Emergency availability"],
      color: "text-red-600",
    },
    {
      icon: Bone,
      title: "Bone Marrow Registry",
      description: "Global bone marrow donor registry with AI-powered compatibility assessment.",
      features: ["10/10 HLA matching", "Donor health screening", "Transplant coordination"],
      color: "text-orange-600",
    },
    {
      icon: Eye,
      title: "Corneal Tissue",
      description: "Corneal tissue matching for vision restoration surgeries and treatments.",
      features: ["Tissue quality assessment", "Size compatibility", "Surgical scheduling"],
      color: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Cardiac Tissue",
      description: "Specialized matching for cardiac tissue transplants and regenerative therapies.",
      features: ["Cardiac compatibility", "Size matching", "Urgency prioritization"],
      color: "text-pink-600",
    },
    {
      icon: Kidney,
      title: "Organ Coordination",
      description: "Comprehensive organ matching and coordination services for life-saving transplants.",
      features: ["Multi-organ matching", "Cross-matching tests", "Logistics coordination"],
      color: "text-green-600",
    },
  ]

  const additionalServices = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our proprietary AI algorithms analyze over 100 compatibility factors to ensure optimal matches.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "End-to-end encryption and HIPAA-compliant data handling protect all medical information.",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Instant matching results and real-time updates on donor availability and compatibility.",
    },
    {
      icon: Users,
      title: "Medical Team Support",
      description: "24/7 support from our team of medical professionals and transplant coordinators.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">Our Services</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            Comprehensive Bio-Sample
            <span className="text-purple-600"> Matching Services</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto text-pretty">
            From stem cells to organ transplants, our AI-powered platform provides precise matching services for all
            types of bio-samples and medical needs.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Bio-Sample Matching Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <service.icon className={`h-12 w-12 ${service.color} mb-4`} />
                  <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <service.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Register & Upload</h3>
              <p className="text-slate-600 text-sm">Create your profile and upload medical data securely</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis</h3>
              <p className="text-slate-600 text-sm">Our AI analyzes compatibility across multiple factors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Doctor Review</h3>
              <p className="text-slate-600 text-sm">Medical professionals verify and approve matches</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Connect & Proceed</h3>
              <p className="text-slate-600 text-sm">Secure connection and treatment coordination</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who trust Bio Nexsus for their bio-sample matching needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Register as Donor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              Find Matches
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
