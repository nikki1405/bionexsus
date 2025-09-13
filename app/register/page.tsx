import { RegisterForm } from "@/components/auth/register-form"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Join Bio Nexsus</h2>
            <p className="mt-2 text-muted-foreground">Create your account to get started</p>
          </div>
          <RegisterForm />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary hover:text-secondary/80 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
