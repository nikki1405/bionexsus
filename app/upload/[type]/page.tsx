"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AIMatchingResults } from "@/components/ai-matching-results"
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { aiMatchingEngine, type MatchResult, type BioSampleData } from "@/lib/ai-matching"

export default function UploadPage() {
  const params = useParams()
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [showMatches, setShowMatches] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [processedData, setProcessedData] = useState<BioSampleData | null>(null)

  const sampleType =
    typeof params.type === "string"
      ? params.type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      : "Bio Sample"

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
    }
  }, [router])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsUploading(true)

    try {
      // Process file with AI
      const sampleData = await aiMatchingEngine.processFile(selectedFile, params.type as string)
      setProcessedData(sampleData)
      setUploadComplete(true)

      // Start AI matching
      setIsProcessing(true)
      const matchResults = await aiMatchingEngine.findMatches(sampleData, 5)
      setMatches(matchResults)
      setShowMatches(true)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
      setIsProcessing(false)
    }
  }

  const handleContactOwner = (matchId: string) => {
    alert(`Initiating secure contact with donor for match ${matchId}`)
  }

  const handleSendToDoctor = (matchId: string) => {
    alert(`Sending match ${matchId} to your assigned doctor for review`)
  }

  const handleRequestMoreMatches = async () => {
    if (!processedData) return

    setIsProcessing(true)
    try {
      const additionalMatches = await aiMatchingEngine.findMatches(processedData, 3)
      setMatches((prev) => [...prev, ...additionalMatches])
    } catch (error) {
      console.error("Failed to get more matches:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadReport = () => {
    alert("Generating comprehensive AI matching report PDF...")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-4">
            ← Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Upload {sampleType} Data</h1>
          <p className="text-muted-foreground mt-2">
            Upload your bio-sample data for advanced AI-powered compatibility matching
          </p>
        </div>

        {!showMatches ? (
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Data</CardTitle>
              <p className="text-muted-foreground">Supported formats: CSV, PDF, or high-quality images (JPG, PNG)</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="file" className="cursor-pointer text-secondary hover:text-secondary/80">
                        Click to upload or drag and drop
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".csv,.pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <p className="text-sm text-muted-foreground">CSV, PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="flex items-center space-x-2 mt-2">
                      <FileText className="h-4 w-4 text-secondary" />
                      <span className="text-sm">{selectedFile.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information about your sample, medical history, or specific requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>AI-Powered Processing:</strong> Your data will be analyzed using advanced machine learning
                    algorithms including XGBoost, Random Forest, and Deep Learning models for optimal matching accuracy.
                    All data is encrypted and HIPAA-compliant.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full" size="lg" disabled={!selectedFile || isUploading}>
                  {isUploading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Processing with AI Algorithms...
                    </>
                  ) : uploadComplete ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Upload Complete - Finding Matches
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload & Start AI Matching
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <AIMatchingResults
              matches={matches}
              isLoading={isProcessing}
              onContactOwner={handleContactOwner}
              onSendToDoctor={handleSendToDoctor}
              onRequestMoreMatches={handleRequestMoreMatches}
              onDownloadReport={handleDownloadReport}
            />

            <div className="flex justify-center">
              <Button onClick={() => router.push("/user-dashboard")} size="lg">
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
