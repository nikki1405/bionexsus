import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Droplets, Bone, Microscope, TestTube, Dna } from "lucide-react"

const bioSampleTypes = [
  {
    icon: Heart,
    title: "Stem Cells",
    description:
      "Undifferentiated cells capable of developing into various cell types, crucial for regenerative medicine and treating degenerative diseases.",
  },
  {
    icon: Droplets,
    title: "Blood",
    description:
      "Essential for transfusions, research, and diagnostic testing. Includes whole blood, plasma, and specific blood components.",
  },
  {
    icon: Bone,
    title: "Bone Marrow",
    description:
      "Contains hematopoietic stem cells vital for treating blood cancers, immune disorders, and genetic diseases.",
  },
  {
    icon: Microscope,
    title: "Tissue Biopsy",
    description:
      "Small tissue samples used for cancer diagnosis, research, and developing personalized treatment approaches.",
  },
  {
    icon: TestTube,
    title: "Saliva",
    description:
      "Non-invasive sample collection for genetic testing, disease screening, and personalized medicine applications.",
  },
  {
    icon: Dna,
    title: "Peripheral Blood",
    description: "Blood drawn from circulation for genetic analysis, biomarker detection, and therapeutic monitoring.",
  },
]

export function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Bio Nexsus</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            We bridge the gap between bio-sample donors and recipients through cutting-edge AI technology, ensuring
            safe, efficient, and medically sound matches for better healthcare outcomes worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bioSampleTypes.map((sample, index) => {
            const IconComponent = sample.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <IconComponent className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-lg">{sample.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{sample.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 bg-muted rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
              To create a global network that connects those who can give with those who need, using advanced AI
              matching algorithms and maintaining the highest standards of medical ethics, security, and patient care.
              Every match we facilitate brings hope and healing to families worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
