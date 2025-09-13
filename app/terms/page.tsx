import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, Shield, AlertTriangle, Users, Gavel } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-200">Terms of Service</Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms of Service</h1>
          <p className="text-xl text-slate-600">Last updated: December 2024</p>
        </div>

        <div className="space-y-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-purple-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                By accessing and using Bio Nexsus ("the Platform"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-slate-600">
                These terms apply to all users of the Platform, including donors, recipients, healthcare providers, and
                visitors.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-purple-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">As a user of Bio Nexsus, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Provide accurate and truthful information about your medical history</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Use the Platform only for legitimate medical purposes</li>
                <li>Respect the privacy and confidentiality of other users</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not attempt to circumvent security measures</li>
                <li>Report any suspicious activity or security breaches</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-600" />
                Medical Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 font-semibold mb-2">Important Medical Notice</p>
                    <p className="text-yellow-700 text-sm">
                      Bio Nexsus is a matching platform and does not provide medical advice, diagnosis, or treatment.
                      Always consult with qualified healthcare professionals for medical decisions.
                    </p>
                  </div>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>The Platform provides matching services only, not medical treatment</li>
                <li>All medical decisions must be made in consultation with healthcare providers</li>
                <li>Compatibility matches are algorithmic suggestions, not medical guarantees</li>
                <li>Users are responsible for verifying all medical information independently</li>
                <li>Bio Nexsus does not guarantee successful transplants or treatments</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-purple-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">Bio Nexsus and its affiliates shall not be liable for:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Any direct, indirect, incidental, or consequential damages</li>
                <li>Medical outcomes or treatment results</li>
                <li>Actions or omissions of healthcare providers</li>
                <li>Technical failures or service interruptions</li>
                <li>Loss of data or unauthorized access to accounts</li>
                <li>Decisions made based on Platform recommendations</li>
              </ul>
              <p className="text-slate-600 font-semibold">
                Our total liability shall not exceed the amount paid by you for Platform services in the 12 months
                preceding the claim.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Gavel className="h-6 w-6 text-purple-600" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                The Platform and its original content, features, and functionality are owned by Bio Nexsus and are
                protected by international copyright, trademark, patent, trade secret, and other intellectual property
                laws.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>You may not reproduce, distribute, or create derivative works</li>
                <li>All trademarks and service marks are property of Bio Nexsus</li>
                <li>User-generated content remains your property but grants us usage rights</li>
                <li>AI algorithms and matching technology are proprietary</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-purple-600" />
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                We may terminate or suspend your account and access to the Platform immediately, without prior notice or
                liability, for any reason, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Breach of these Terms of Service</li>
                <li>Providing false or misleading information</li>
                <li>Engaging in fraudulent or illegal activities</li>
                <li>Violating the rights of other users</li>
                <li>Misusing the Platform or its services</li>
              </ul>
              <p className="text-slate-600">
                Upon termination, your right to use the Platform will cease immediately, but certain provisions of these
                terms will survive termination.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-purple-600" />
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-600">
                These Terms shall be interpreted and governed by the laws of the State of California, United States,
                without regard to its conflict of law provisions.
              </p>
              <p className="text-slate-600">
                Any disputes arising from these terms or your use of the Platform will be resolved through binding
                arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </CardContent>
          </Card>

          <div className="text-center pt-8">
            <p className="text-slate-500 text-sm">
              These terms of service are effective as of December 2024 and may be updated periodically. Continued use of
              the Platform constitutes acceptance of any changes.
            </p>
            <p className="text-slate-500 text-sm mt-4">
              For questions about these terms, contact us at legal@bionexsus.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
