"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  Zap,
  Shield,
  Microscope,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Globe,
  Camera,
  Scan,
} from "lucide-react"

const technologies = [
  {
    id: 1,
    name: "3D Holographic Display",
    description:
      "Revolutionary holographic projection technology that creates stunning 3D visualizations without the need for special glasses.",
    icon: Layers,
    features: ["360° Viewing", "4K Resolution", "Real-time Rendering", "Touch Interaction"],
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder-video.mp4",
    category: "Display Technology",
  },
  {
    id: 2,
    name: "Quantum Authentication",
    description:
      "Unbreakable security system using quantum encryption to verify the authenticity of premium collectibles.",
    icon: Shield,
    features: ["Quantum Encryption", "Tamper-proof", "Instant Verification", "Blockchain Integration"],
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder-video.mp4",
    category: "Security",
  },
  {
    id: 3,
    name: "AI-Powered Curation",
    description:
      "Advanced machine learning algorithms that analyze market trends and user preferences to curate personalized collections.",
    icon: Cpu,
    features: ["Machine Learning", "Predictive Analytics", "Personal Recommendations", "Market Analysis"],
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder-video.mp4",
    category: "Artificial Intelligence",
  },
  {
    id: 4,
    name: "Nano-Scale Preservation",
    description:
      "Cutting-edge preservation technology that protects collectibles at the molecular level for centuries.",
    icon: Microscope,
    features: ["Molecular Protection", "Climate Control", "UV Shielding", "Anti-aging Treatment"],
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder-video.mp4",
    category: "Preservation",
  },
  {
    id: 5,
    name: "Augmented Reality Viewer",
    description:
      "Immersive AR technology that allows customers to visualize collectibles in their own space before purchase.",
    icon: Camera,
    features: ["Real-time AR", "Spatial Mapping", "Lighting Simulation", "Size Scaling"],
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder-video.mp4",
    category: "Augmented Reality",
  },
  {
    id: 6,
    name: "Blockchain Provenance",
    description:
      "Immutable digital certificates that track the complete history and ownership of each collectible item.",
    icon: Scan,
    features: ["Digital Certificates", "Ownership History", "Authenticity Proof", "Smart Contracts"],
    image: "/placeholder.svg?height=300&width=500",
    video: "/placeholder-video.mp4",
    category: "Blockchain",
  },
]

const stats = [
  { label: "Patents Filed", value: "47+", icon: Sparkles },
  { label: "R&D Investment", value: "$12M", icon: Zap },
  { label: "Tech Partners", value: "23", icon: Globe },
  { label: "Innovation Awards", value: "15", icon: Star },
]

export default function TechnologyPage() {
  const [selectedTech, setSelectedTech] = useState(technologies[0])
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = [
    "All",
    "Display Technology",
    "Security",
    "Artificial Intelligence",
    "Preservation",
    "Augmented Reality",
    "Blockchain",
  ]

  const filteredTechnologies = technologies.filter(
    (tech) => activeCategory === "All" || tech.category === activeCategory,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-accent text-accent-foreground text-lg px-6 py-2">Innovation Lab</Badge>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Cutting-Edge Technology
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover the revolutionary technologies that power our premium collectibles platform, from 3D holographic
              displays to quantum authentication systems
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary mr-2" />
                    <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Technology Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4 bg-accent/10 text-accent border-accent">{selectedTech.category}</Badge>
              <h2 className="text-4xl font-bold mb-6">{selectedTech.name}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{selectedTech.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {selectedTech.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button className="bg-primary text-primary-foreground">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
                <Button variant="outline">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 p-8">
                <img
                  src={selectedTech.image || "/placeholder.svg"}
                  alt={selectedTech.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                <Button
                  variant="ghost"
                  size="lg"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Categories */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive suite of technologies designed to revolutionize the collectibles industry
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedTech.id === tech.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedTech(tech)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <tech.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {tech.category}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {tech.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{tech.description}</p>

                    <div className="space-y-2">
                      {tech.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Explore Technology
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Innovation Timeline</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our journey of technological advancement and breakthrough innovations
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent" />

            {[
              {
                year: "2024",
                title: "Quantum Authentication Launch",
                description: "Revolutionary security system deployed",
              },
              {
                year: "2023",
                title: "3D Holographic Display",
                description: "First holographic product viewer released",
              },
              { year: "2022", title: "AI Curation Engine", description: "Machine learning algorithms implemented" },
              { year: "2021", title: "AR Visualization", description: "Augmented reality viewing technology" },
              { year: "2020", title: "Blockchain Integration", description: "Digital provenance system established" },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <Badge className="mb-2 bg-accent text-accent-foreground">{milestone.year}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </Card>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Future</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Ready to explore how our cutting-edge technology can enhance your collecting experience?
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary">
              Schedule Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary bg-transparent"
            >
              Contact Innovation Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
