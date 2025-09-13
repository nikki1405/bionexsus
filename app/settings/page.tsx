"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SettingsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to profile page since settings are integrated there
    router.push("/profile")
  }, [router])

  return null
}
