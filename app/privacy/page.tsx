import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Database, Users, FileText } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">Privacy Policy</Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Your Privacy is Our Priority</h1>
          <p className="text-xl text-slate-600">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                Bio Nexsus collects information necessary to provide our bio-sample matching services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Medical information relevant to bio-sample compatibility</li>
                <li>Account credentials and preferences</li>
                <li>Usage data and platform interactions</li>
                <li>Communication records with our support team</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-purple-600" />
                How We Protect Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                We implement industry-leading security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>End-to-end encryption for all data transmission</li>
                <li>Advanced encryption at rest using AES-256</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular security audits and penetration testing</li>
                <li>HIPAA-compliant data handling procedures</li>
                <li>Blockchain-secured audit trails</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-purple-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">Your information is used exclusively for:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Providing bio-sample matching services</li>
                <li>Facilitating communication between users and medical professionals</li>
                <li>Improving our AI matching algorithms</li>
                <li>Ensuring platform security and preventing fraud</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>Sending important account and service updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="h-6 w-6 text-purple-600" />
                Data Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                We never sell your personal information. We may share data only in these limited circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>With your explicit consent for specific matches</li>
                <li>With healthcare providers involved in your care</li>
                <li>To comply with legal obligations or court orders</li>
                <li>With trusted service providers under strict confidentiality agreements</li>
                <li>In anonymized, aggregated form for research purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-purple-600" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Access and review your personal data</li>
                <li>Request corrections to inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of non-essential communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-purple-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                For privacy-related questions or requests, contact our Data Protection Officer:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-slate-700">
                  <strong>Email:</strong> privacy@bionexsus.com
                  <br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                  <br />
                  <strong>Address:</strong> 123 Healthcare Blvd, Medical District, CA 90210
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <p className="text-slate-500 text-sm">
              This privacy policy is effective as of December 2024 and may be updated periodically. We will notify users
              of any material changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
