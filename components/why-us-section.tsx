import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Shield, Brain, UserCheck, Globe, Award } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "AI-powered matching delivers results in minutes, not months",
    stat: "95% faster than traditional methods",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "End-to-end encryption and HIPAA-compliant data protection",
    stat: "256-bit encryption standard",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Advanced machine learning algorithms ensure optimal compatibility",
    stat: "99.7% accuracy rate",
  },
  {
    icon: UserCheck,
    title: "Doctor Verified",
    description: "Every match reviewed by certified medical professionals",
    stat: "100% medical oversight",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to worldwide database of donors and recipients",
    stat: "50+ countries connected",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Thousands of successful matches and life-saving connections",
    stat: "10,000+ lives impacted",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Bio Nexsus?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We combine cutting-edge technology with compassionate care to deliver the most advanced bio-sample matching
            platform in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mx-auto bg-secondary/10 p-4 rounded-full w-fit mb-4">
                    <IconComponent className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{benefit.description}</p>
                  <div className="bg-secondary/5 rounded-lg p-3">
                    <span className="text-secondary font-semibold text-sm">{benefit.stat}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Trusted by Healthcare Professionals Worldwide
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of doctors, researchers, and medical institutions who rely on Bio Nexsus for safe,
              efficient, and reliable bio-sample matching.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Medical Centers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">2,000+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
