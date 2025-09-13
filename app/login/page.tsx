import { LoginForm } from "@/components/auth/login-form"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">Sign in to your Bio Nexsus account</p>
          </div>
          <LoginForm />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/register" className="text-secondary hover:text-secondary/80 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
