"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Clock, Shield, Star } from "lucide-react"

interface HealthBank {
  id: number
  name: string
  address: string
  distance: string
  rating: number
  price: string
  safetyRating: string
  capacity: "Available" | "Limited" | "Full"
  phone: string
  hours: string
  services: string[]
  coordinates: { lat: number; lng: number }
}

const mockHealthBanks: HealthBank[] = [
  {
    id: 1,
    name: "BioSecure Storage Center",
    address: "123 Medical Plaza, San Francisco, CA 94102",
    distance: "2.3 miles",
    rating: 4.8,
    price: "$150/year",
    safetyRating: "A+",
    capacity: "Available",
    phone: "(415) 555-0123",
    hours: "24/7",
    services: ["Stem Cell Storage", "Blood Banking", "Tissue Preservation"],
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 2,
    name: "MedVault Bio Repository",
    address: "456 Health Ave, San Francisco, CA 94103",
    distance: "4.1 miles",
    rating: 4.9,
    price: "$200/year",
    safetyRating: "A++",
    capacity: "Limited",
    phone: "(415) 555-0456",
    hours: "Mon-Fri 8AM-6PM",
    services: ["Premium Storage", "Genetic Banking", "Research Samples"],
    coordinates: { lat: 37.7849, lng: -122.4094 },
  },
  {
    id: 3,
    name: "Pacific Bio Storage",
    address: "789 Science Dr, San Francisco, CA 94104",
    distance: "5.8 miles",
    rating: 4.6,
    price: "$120/year",
    safetyRating: "A",
    capacity: "Available",
    phone: "(415) 555-0789",
    hours: "Mon-Sat 9AM-5PM",
    services: ["Basic Storage", "Blood Banking", "Bone Marrow"],
    coordinates: { lat: 37.7949, lng: -122.3994 },
  },
]

export function MapsIntegration() {
  const [selectedBank, setSelectedBank] = useState<HealthBank | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Get user's location (mock for demo)
    setUserLocation({ lat: 37.7749, lng: -122.4194 })
  }, [])

  const getCapacityColor = (capacity: string) => {
    switch (capacity) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Limited":
        return "bg-yellow-100 text-yellow-800"
      case "Full":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleGetDirections = (bank: HealthBank) => {
    // In a real app, this would open Google Maps or similar
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(bank.address)}`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Nearby Health Banks</span>
          </CardTitle>
          <p className="text-muted-foreground">Find secure bio-sample storage facilities near you</p>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg h-64 flex items-center justify-center mb-6">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Interactive map would be displayed here</p>
              <p className="text-sm text-muted-foreground">
                Showing {mockHealthBanks.length} facilities within 10 miles
              </p>
            </div>
          </div>

          {/* Health Banks List */}
          <div className="space-y-4">
            {mockHealthBanks.map((bank) => (
              <div key={bank.id} className="border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{bank.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{bank.address}</p>
                      <p className="text-sm text-muted-foreground">{bank.distance} away</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{bank.rating}</span>
                        </div>
                        <Badge variant="outline">{bank.safetyRating} Safety</Badge>
                        <Badge className={getCapacityColor(bank.capacity)}>{bank.capacity}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-secondary">{bank.price}</div>
                    <p className="text-xs text-muted-foreground">Storage fee</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{bank.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{bank.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Certified Facility</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {bank.services.map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handleGetDirections(bank)} className="flex-1 min-w-[120px]">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="flex-1 min-w-[120px] bg-transparent">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="flex-1 min-w-[120px] bg-transparent">
                    View Details
                  </Button>
                  <Button className="flex-1 min-w-[120px]" disabled={bank.capacity === "Full"}>
                    {bank.capacity === "Full" ? "Fully Booked" : "Store Cells"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">What to Consider</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Distance from your location</li>
                <li>• Safety and certification ratings</li>
                <li>• Storage capacity and availability</li>
                <li>• Pricing and payment options</li>
                <li>• Operating hours and accessibility</li>
                <li>• Specialized services offered</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Safety Standards</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Temperature-controlled environments</li>
                <li>• 24/7 monitoring systems</li>
                <li>• Backup power systems</li>
                <li>• Secure access controls</li>
                <li>• Regular quality audits</li>
                <li>• Insurance coverage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
