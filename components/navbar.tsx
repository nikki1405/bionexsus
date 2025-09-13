"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X, User, Settings, LogOut, UserCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const checkAuthStatus = () => {
      console.log("[v0] Checking auth status...")
      try {
        const user = localStorage.getItem("user")
        console.log("[v0] Raw user data from localStorage:", user)

        if (user && user !== "null" && user !== "undefined") {
          const userData = JSON.parse(user)
          console.log("[v0] Parsed user data:", userData)

          if (userData && userData.email) {
            setIsLoggedIn(true)
            setUserRole(userData.role || "")
            setUserName(userData.name || userData.email || "User")
            console.log("[v0] User is logged in:", userData.role, userData.name)

            if (userData.loginTime) {
              const loginTime = new Date(userData.loginTime)
              const now = new Date()
              const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)
              console.log("[v0] Hours since login:", hoursSinceLogin)

              if (hoursSinceLogin > 24) {
                console.log("[v0] Session expired, logging out")
                handleLogoutCleanup()
                return
              }
            }
          } else {
            console.log("[v0] Invalid user data, logging out")
            handleLogoutCleanup()
          }
        } else {
          console.log("[v0] No valid user data found, user is logged out")
          handleLogoutCleanup()
        }
      } catch (error) {
        console.error("[v0] Error parsing user data:", error)
        handleLogoutCleanup()
      }
    }

    const handleLogoutCleanup = () => {
      console.log("[v0] Cleaning up logout state")
      setIsLoggedIn(false)
      setUserRole("")
      setUserName("")
      localStorage.removeItem("user")
    }

    checkAuthStatus()

    const authCheckInterval = setInterval(checkAuthStatus, 30000)

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        console.log("[v0] Storage change detected for user key")
        checkAuthStatus()
      }
    }

    const handleAuthChange = () => {
      console.log("[v0] Auth state change event detected")
      checkAuthStatus()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("authStateChanged", handleAuthChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("authStateChanged", handleAuthChange)
      clearInterval(authCheckInterval)
    }
  }, [isClient])

  const handleLogout = () => {
    console.log("[v0] Logout initiated for user:", userName, "Role:", userRole)

    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("authToken")
    localStorage.removeItem("sessionId")

    setIsLoggedIn(false)
    setUserRole("")
    setUserName("")
    setIsOpen(false)

    console.log("[v0] Local state cleared, dispatching auth change event")

    window.dispatchEvent(new Event("authStateChanged"))

    console.log("[v0] Redirecting to home page")
    router.push("/")

    setTimeout(() => {
      window.location.reload()
    }, 100)

    console.log("[v0] Logout process completed")
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  console.log(
    "[v0] Navbar render - isClient:",
    isClient,
    "isLoggedIn:",
    isLoggedIn,
    "userRole:",
    userRole,
    "userName:",
    userName,
  )

  if (!isClient) {
    return (
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary">
                Bio Nexsus
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Bio Nexsus
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isLoggedIn ? (
                <>
                  <Link
                    href={userRole === "doctor" ? "/doctor-dashboard" : "/user-dashboard"}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                  {userRole !== "doctor" && (
                    <Link href="/matches" className="text-foreground hover:text-primary transition-colors">
                      My Matches
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/" className="text-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                  <Link href="/services" className="text-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                  <Link href="/why-us" className="text-foreground hover:text-primary transition-colors">
                    Why Us
                  </Link>
                  <Link href="/awareness" className="text-foreground hover:text-primary transition-colors">
                    Awareness
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
                      <AvatarFallback>{getUserInitials(userName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userRole === "doctor" ? "Doctor" : "User"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  {userRole !== "doctor" && (
                    <DropdownMenuItem asChild>
                      <Link href="/matches" className="cursor-pointer">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>My Matches</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {isLoggedIn ? (
                <>
                  <Link
                    href={userRole === "doctor" ? "/doctor-dashboard" : "/user-dashboard"}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {userRole !== "doctor" && (
                    <Link
                      href="/matches"
                      className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      My Matches
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/why-us"
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Why Us
                  </Link>
                  <Link
                    href="/awareness"
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Awareness
                  </Link>
                </>
              )}

              <div className="px-3 py-2 space-y-2">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
                        <AvatarFallback>{getUserInitials(userName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">{userRole === "doctor" ? "Doctor" : "User"}</p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2 px-3 py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors w-full text-left rounded-md"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
