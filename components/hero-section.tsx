import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Revolutionizing Bio-Sample <span className="text-secondary">Donation & Matching</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Connect donors and recipients through AI-powered matching technology. Secure, fast, and doctor-verified
            bio-sample management for better healthcare outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Advanced algorithms ensure optimal compatibility between donors and recipients
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Bank-level security with complete privacy protection for all medical data
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Doctor Verified</h3>
              <p className="text-muted-foreground">
                All matches reviewed and approved by certified medical professionals
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
