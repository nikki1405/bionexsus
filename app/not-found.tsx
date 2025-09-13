import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, Heart } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full border-0 shadow-2xl">
        <CardContent className="pt-12 pb-12 text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-purple-200 mb-4">404</div>
            <div className="flex justify-center items-center gap-2 text-purple-600">
              <Heart className="h-8 w-8" />
              <span className="text-2xl font-semibold">Bio Nexsus</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h1>
            <p className="text-lg text-slate-600 mb-2">The page you're looking for doesn't exist or has been moved.</p>
            <p className="text-slate-500">
              Don't worry, our AI-powered platform is still here to help you find the perfect bio-sample matches.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/user-dashboard">
                <Search className="h-4 w-4 mr-2" />
                View Dashboard
              </Link>
            </Button>
          </div>

          {/* Help Links */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">Need help? Try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/about" className="text-purple-600 hover:text-purple-700 hover:underline">
                About Us
              </Link>
              <Link href="/services" className="text-purple-600 hover:text-purple-700 hover:underline">
                Our Services
              </Link>
              <Link href="/awareness" className="text-purple-600 hover:text-purple-700 hover:underline">
                Educational Resources
              </Link>
              <Link href="/login" className="text-purple-600 hover:text-purple-700 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
