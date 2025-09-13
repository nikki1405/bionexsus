"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  TrendingUp,
  Shield,
  Clock,
  Download,
  Send,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap,
} from "lucide-react"
import type { MatchResult } from "@/lib/ai-matching"

interface AIMatchingResultsProps {
  matches: MatchResult[]
  isLoading?: boolean
  onContactOwner: (matchId: string) => void
  onSendToDoctor: (matchId: string) => void
  onRequestMoreMatches: () => void
  onDownloadReport: () => void
}

export function AIMatchingResults({
  matches,
  isLoading = false,
  onContactOwner,
  onSendToDoctor,
  onRequestMoreMatches,
  onDownloadReport,
}: AIMatchingResultsProps) {
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "Excellent":
        return "text-green-600"
      case "Very Good":
        return "text-blue-600"
      case "Good":
        return "text-yellow-600"
      case "Fair":
        return "text-orange-600"
      case "Poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="mx-auto h-12 w-12 text-secondary animate-pulse mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Processing Your Data</h3>
            <p className="text-muted-foreground mb-4">Our advanced algorithms are analyzing compatibility factors...</p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Running XGBoost, Random Forest, and Deep Learning models</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Processing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-secondary" />
            <span>AI Analysis Complete</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{matches.length}</div>
              <p className="text-sm text-muted-foreground">Matches Found</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {matches.length > 0 ? Math.max(...matches.map((m) => m.matchScore)) : 0}%
              </div>
              <p className="text-sm text-muted-foreground">Best Match</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {matches.length > 0
                  ? Math.round(matches.reduce((sum, m) => sum + m.aiConfidence, 0) / matches.length)
                  : 0}
                %
              </div>
              <p className="text-sm text-muted-foreground">AI Confidence</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {matches.length > 0
                  ? Math.round(matches.reduce((sum, m) => sum + m.processingTime, 0) / matches.length / 1000)
                  : 0}
                s
              </div>
              <p className="text-sm text-muted-foreground">Avg Processing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Match Results */}
      <div className="space-y-4">
        {matches.map((match, index) => (
          <Card key={match.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Match #{index + 1}</span>
                    <Badge variant="outline">Donor {match.donorId}</Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI Confidence: {Math.round(match.aiConfidence)}% | Processing: {Math.round(match.processingTime)}ms
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-secondary">{match.matchScore}%</div>
                  <p className={`text-sm font-medium ${getCompatibilityColor(match.compatibility)}`}>
                    {match.compatibility}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="factors">Match Factors</TabsTrigger>
                  <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <TrendingUp className="mx-auto h-6 w-6 text-secondary mb-2" />
                      <p className="text-sm text-muted-foreground">Match Score</p>
                      <p className="text-xl font-bold">{match.matchScore}%</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Shield className="mx-auto h-6 w-6 text-secondary mb-2" />
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <Badge className={getRiskColor(match.riskAssessment)}>{match.riskAssessment}</Badge>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Zap className="mx-auto h-6 w-6 text-secondary mb-2" />
                      <p className="text-sm text-muted-foreground">AI Confidence</p>
                      <p className="text-xl font-bold">{Math.round(match.aiConfidence)}%</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="factors" className="space-y-4">
                  <div className="space-y-3">
                    {match.matchFactors.map((factor, factorIndex) => (
                      <div key={factorIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{factor.factor}</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(factor.score)}% (Weight: {Math.round(factor.weight * 100)}%)
                          </span>
                        </div>
                        <Progress value={factor.score} className="h-2" />
                        <p className="text-xs text-muted-foreground">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="risk" className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Risk Assessment: {match.riskAssessment}</strong>
                      <br />
                      {match.riskAssessment === "Low" &&
                        "This match shows excellent compatibility with minimal risk factors."}
                      {match.riskAssessment === "Medium" &&
                        "Some compatibility concerns identified. Additional testing recommended."}
                      {match.riskAssessment === "High" &&
                        "Significant risk factors present. Extensive evaluation required."}
                      {match.riskAssessment === "Critical" &&
                        "High-risk match with multiple concerning factors. Proceed with extreme caution."}
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Risk Factors Analyzed</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• HLA mismatch probability</li>
                        <li>• Blood type compatibility</li>
                        <li>• Genetic marker conflicts</li>
                        <li>• Age-related complications</li>
                        <li>• Medical history interactions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AI Models Used</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• XGBoost (97% accuracy)</li>
                        <li>• Random Forest (95% accuracy)</li>
                        <li>• Deep Learning (98% accuracy)</li>
                        <li>• Support Vector Machine (93% accuracy)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <div className="space-y-3">
                    {match.recommendedActions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{action}</p>
                      </div>
                    ))}
                  </div>

                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Next Steps:</strong> All recommendations should be reviewed by your assigned medical
                      professional before proceeding with any matching protocols.
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
                <Button onClick={() => onContactOwner(match.id)} className="flex-1 min-w-[120px]">
                  <Send className="mr-2 h-4 w-4" />
                  Contact Owner
                </Button>
                <Button variant="outline" onClick={() => onSendToDoctor(match.id)} className="flex-1 min-w-[120px]">
                  Send to Doctor
                </Button>
                <Button variant="outline" onClick={() => setSelectedMatch(match)} className="flex-1 min-w-[120px]">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={onRequestMoreMatches}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Request More Matches
            </Button>
            <Button variant="outline" onClick={onDownloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Full Report (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Detailed AI Analysis - Match {selectedMatch.donorId}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Algorithm Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">XGBoost Model</span>
                      <span className="text-sm font-medium">97% accuracy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Random Forest</span>
                      <span className="text-sm font-medium">95% accuracy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Deep Learning</span>
                      <span className="text-sm font-medium">98% accuracy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ensemble Score</span>
                      <span className="text-sm font-medium">{selectedMatch.matchScore}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Processing Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Processing Time</span>
                      <span className="text-sm font-medium">{Math.round(selectedMatch.processingTime)}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">AI Confidence</span>
                      <span className="text-sm font-medium">{Math.round(selectedMatch.aiConfidence)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Level</span>
                      <Badge className={getRiskColor(selectedMatch.riskAssessment)}>
                        {selectedMatch.riskAssessment}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Detailed Factor Analysis</h3>
                <div className="space-y-4">
                  {selectedMatch.matchFactors.map((factor, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{factor.factor}</h4>
                        <span className="text-sm text-muted-foreground">
                          Score: {Math.round(factor.score)}% | Weight: {Math.round(factor.weight * 100)}%
                        </span>
                      </div>
                      <Progress value={factor.score} className="mb-2" />
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setSelectedMatch(null)}>Close Analysis</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
