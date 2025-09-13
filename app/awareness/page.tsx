"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, BookOpen, FileText, Download, Search, Clock, Eye, Star } from "lucide-react"

const videos = [
  {
    id: 1,
    title: "Understanding Stem Cell Donation",
    description: "Comprehensive guide to stem cell donation process and benefits",
    duration: "12:45",
    views: "45K",
    rating: 4.8,
    thumbnail: "/medical-stem-cell-education.jpg",
    embedId: "dQw4w9WgXcQ", // Mock YouTube ID
  },
  {
    id: 2,
    title: "Blood Donation: Saving Lives Every Day",
    description: "Learn about the importance of blood donation and compatibility",
    duration: "8:30",
    views: "32K",
    rating: 4.9,
    thumbnail: "/blood-donation-medical-education.jpg",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Bone Marrow Transplant Process",
    description: "Step-by-step guide to bone marrow donation and transplantation",
    duration: "15:20",
    views: "28K",
    rating: 4.7,
    thumbnail: "/bone-marrow-medical-procedure.jpg",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Tissue Banking and Preservation",
    description: "Modern techniques in tissue preservation and storage",
    duration: "10:15",
    views: "19K",
    rating: 4.6,
    thumbnail: "/tissue-banking-medical-storage.jpg",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Genetic Testing and Privacy",
    description: "Understanding genetic testing while protecting your privacy",
    duration: "14:05",
    views: "41K",
    rating: 4.8,
    thumbnail: "/genetic-testing-privacy-medical.jpg",
    embedId: "dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "AI in Medical Matching",
    description: "How artificial intelligence improves bio-sample matching",
    duration: "11:30",
    views: "35K",
    rating: 4.9,
    thumbnail: "/ai-medical-matching-technology.jpg",
    embedId: "dQw4w9WgXcQ",
  },
]

const books = [
  {
    id: 1,
    title: "The Complete Guide to Stem Cell Therapy",
    author: "Dr. Sarah Mitchell",
    description: "Comprehensive overview of stem cell applications in modern medicine",
    pages: 324,
    rating: 4.7,
    downloadUrl: "#",
    cover: "/medical-book-stem-cell-therapy.jpg",
  },
  {
    id: 2,
    title: "Blood Banking and Transfusion Medicine",
    author: "Dr. Michael Chen",
    description: "Essential knowledge for blood donation and transfusion safety",
    pages: 456,
    rating: 4.8,
    downloadUrl: "#",
    cover: "/medical-book-blood-banking.jpg",
  },
  {
    id: 3,
    title: "Bone Marrow Transplantation: A Patient's Guide",
    author: "Dr. Emily Rodriguez",
    description: "Patient-friendly guide to bone marrow transplant procedures",
    pages: 278,
    rating: 4.9,
    downloadUrl: "#",
    cover: "/medical-book-bone-marrow-guide.jpg",
  },
  {
    id: 4,
    title: "Tissue Engineering and Regenerative Medicine",
    author: "Dr. James Wilson",
    description: "Latest advances in tissue engineering and regenerative therapies",
    pages: 512,
    rating: 4.6,
    downloadUrl: "#",
    cover: "/medical-book-tissue-engineering.jpg",
  },
]

const eNotes = [
  {
    id: 1,
    title: "Stem Cell Donation Quick Reference",
    description: "Essential facts and procedures for stem cell donation",
    pages: 12,
    category: "Stem Cells",
    downloadUrl: "#",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    title: "Blood Type Compatibility Chart",
    description: "Comprehensive blood type matching and compatibility guide",
    pages: 8,
    category: "Blood",
    downloadUrl: "#",
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    title: "Bone Marrow Registry Process",
    description: "Step-by-step guide to joining bone marrow registries",
    pages: 15,
    category: "Bone Marrow",
    downloadUrl: "#",
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    title: "Tissue Donation Ethics and Guidelines",
    description: "Ethical considerations and guidelines for tissue donation",
    pages: 20,
    category: "Tissue",
    downloadUrl: "#",
    lastUpdated: "2024-01-12",
  },
  {
    id: 5,
    title: "Genetic Privacy Protection",
    description: "Protecting your genetic information and privacy rights",
    pages: 10,
    category: "Genetics",
    downloadUrl: "#",
    lastUpdated: "2024-01-11",
  },
  {
    id: 6,
    title: "AI Matching Technology Explained",
    description: "Understanding how AI improves bio-sample matching accuracy",
    pages: 18,
    category: "Technology",
    downloadUrl: "#",
    lastUpdated: "2024-01-10",
  },
]

export default function AwarenessPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredENotes = eNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Awareness & Education</h1>
          <p className="text-muted-foreground mt-2">
            Learn about bio-sample donation, medical procedures, and stay informed with the latest research
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos, books, or e-notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="e-notes">E-Notes</TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/medical-education-video.png"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button size="lg" className="rounded-full" onClick={() => setSelectedVideo(video.id)}>
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{video.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <Play className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No videos found matching your search.</p>
              </div>
            )}
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value="books" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={book.cover || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/medical-textbook-cover.jpg"
                      }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{book.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{book.pages} pages</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{book.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No books found matching your search.</p>
              </div>
            )}
          </TabsContent>

          {/* E-Notes Tab */}
          <TabsContent value="e-notes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredENotes.map((note) => (
                <Card key={note.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{note.title}</CardTitle>
                        <Badge variant="secondary" className="mb-2">
                          {note.category}
                        </Badge>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1 mb-1">
                          <FileText className="h-3 w-3" />
                          <span>{note.pages} pages</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{note.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{note.description}</p>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download E-Note
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredENotes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No e-notes found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Content */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Featured Educational Content</CardTitle>
            <p className="text-muted-foreground">Curated content to help you understand bio-sample donation</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-secondary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <Play className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Video Library</h3>
                <p className="text-sm text-muted-foreground">
                  Expert-led videos covering all aspects of bio-sample donation and medical procedures
                </p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Medical Literature</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive books and research papers from leading medical professionals
                </p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <FileText className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Quick References</h3>
                <p className="text-sm text-muted-foreground">
                  Downloadable guides and infographics for quick reference and sharing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videos.find((v) => v.id === selectedVideo)?.embedId}`}
                  title="Educational Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{videos.find((v) => v.id === selectedVideo)?.title}</h3>
                    <p className="text-muted-foreground">{videos.find((v) => v.id === selectedVideo)?.description}</p>
                  </div>
                  <Button onClick={() => setSelectedVideo(null)} variant="outline">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
