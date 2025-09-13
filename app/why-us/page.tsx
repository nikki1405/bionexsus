import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, Clock, Award, Users, Globe, ArrowRight, CheckCircle, Star } from "lucide-react"

export default function WhyUsPage() {
  const advantages = [
    {
      icon: Brain,
      title: "Advanced AI Technology",
      description:
        "Our proprietary AI algorithms analyze over 100 compatibility factors, achieving 98% match accuracy - the highest in the industry.",
      stats: "98% Match Accuracy",
      color: "text-purple-600",
    },
    {
      icon: Shield,
      title: "Uncompromising Security",
      description:
        "Military-grade encryption, HIPAA compliance, and blockchain-secured data ensure your medical information is always protected.",
      stats: "100% HIPAA Compliant",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      title: "Real-Time Matching",
      description:
        "Get instant results with our real-time processing system. No waiting weeks for compatibility analysis.",
      stats: "< 5 Minutes Processing",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Access to the world's largest network of verified donors and recipients across 50+ countries.",
      stats: "500K+ Active Users",
      color: "text-orange-600",
    },
    {
      icon: Award,
      title: "Medical Excellence",
      description:
        "Every match is reviewed by board-certified physicians and transplant specialists for optimal outcomes.",
      stats: "1000+ Medical Partners",
      color: "text-red-600",
    },
    {
      icon: Globe,
      title: "24/7 Global Support",
      description: "Round-the-clock support from our medical team and patient coordinators in multiple languages.",
      stats: "24/7 Availability",
      color: "text-teal-600",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Transplant Surgeon, Mayo Clinic",
      content: "Bio Nexsus has revolutionized how we find compatible donors. The AI matching is incredibly accurate.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Stem Cell Recipient",
      content:
        "Found my perfect match in just 3 days. The process was seamless and gave me hope when I needed it most.",
      rating: 5,
    },
    {
      name: "Dr. James Wilson",
      role: "Hematologist",
      content: "The platform's security and accuracy have made it our go-to solution for patient matching.",
      rating: 5,
    },
  ]

  const comparisons = [
    { feature: "AI-Powered Matching", bioNexsus: true, traditional: false },
    { feature: "Real-Time Processing", bioNexsus: true, traditional: false },
    { feature: "Global Network Access", bioNexsus: true, traditional: false },
    { feature: "24/7 Medical Support", bioNexsus: true, traditional: false },
    { feature: "Blockchain Security", bioNexsus: true, traditional: false },
    { feature: "Mobile App Access", bioNexsus: true, traditional: false },
    { feature: "Multi-Language Support", bioNexsus: true, traditional: false },
    { feature: "Automated Notifications", bioNexsus: true, traditional: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">Why Choose Bio Nexsus</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
            The Future of
            <span className="text-purple-600"> Bio-Sample Matching</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto text-pretty">
            Experience the most advanced, secure, and efficient bio-sample matching platform trusted by medical
            professionals worldwide.
          </p>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <advantage.icon className={`h-12 w-12 ${advantage.color} mb-4`} />
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{advantage.title}</h3>
                  <p className="text-slate-600 mb-4">{advantage.description}</p>
                  <div className={`text-sm font-semibold ${advantage.color}`}>{advantage.stats}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Bio Nexsus vs Traditional Methods</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                      <th className="text-center p-4 font-semibold text-purple-600">Bio Nexsus</th>
                      <th className="text-center p-4 font-semibold text-slate-600">Traditional Methods</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((item, index) => (
                      <tr key={index} className="border-t border-slate-100">
                        <td className="p-4 text-slate-900">{item.feature}</td>
                        <td className="p-4 text-center">
                          {item.bioNexsus ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {item.traditional ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Impact by Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500K+</div>
              <div className="text-purple-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-purple-100">Successful Matches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-purple-100">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-purple-100">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Join the platform that's transforming healthcare through intelligent matching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
