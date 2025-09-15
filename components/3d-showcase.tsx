"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { AdvancedProductViewer } from "@/components/advanced-3d-viewer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import { Smartphone, Layers, Eye } from "lucide-react"
import { motion } from "framer-motion"

const showcaseProducts = [
  {
    id: "premium-pro",
    name: "Premium Device Pro",
    category: "Flagship",
    price: 999,
    features: ["Advanced Neural Processing", "Triple Camera System", "All-Day Battery"],
    hotspots: [
      {
        id: "processor",
        position: [0, 0, 0] as [number, number, number],
        title: "A17 Pro Chip",
        description: "Revolutionary performance with 6-core CPU and 6-core GPU",
        feature: "3nm Technology",
      },
      {
        id: "camera",
        position: [0.3, 0.5, 0.2] as [number, number, number],
        title: "Pro Camera System",
        description: "48MP Main, 12MP Ultra Wide, 12MP Telephoto with 5x optical zoom",
        feature: "Computational Photography",
      },
    ],
  },
  {
    id: "premium-air",
    name: "Premium Device Air",
    category: "Lightweight",
    price: 799,
    features: ["Ultra-Thin Design", "Extended Battery", "Fast Charging"],
    hotspots: [
      {
        id: "design",
        position: [0, 0.2, 0.4] as [number, number, number],
        title: "Ultra-Thin Profile",
        description: "Just 6.1mm thin with premium aluminum construction",
        feature: "Aerospace Grade Materials",
      },
      {
        id: "battery",
        position: [0, -0.3, 0.1] as [number, number, number],
        title: "Extended Battery Life",
        description: "Up to 20 hours of video playback with intelligent power management",
        feature: "Fast Wireless Charging",
      },
    ],
  },
]

const viewModes = [
  { id: "features", label: "Features", icon: <Eye className="h-4 w-4" /> },
  { id: "exploded", label: "Exploded", icon: <Layers className="h-4 w-4" /> },
  { id: "materials", label: "Materials", icon: <Smartphone className="h-4 w-4" /> },
]

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState(showcaseProducts[0])
  const [viewMode, setViewMode] = useState("features")
  const [selectedColor, setSelectedColor] = useState("midnight")
  const [selectedMaterial, setSelectedMaterial] = useState("aluminum")

  const colors = [
    { id: "midnight", name: "Midnight", color: "#1a1a1a" },
    { id: "silver", name: "Silver", color: "#c0c0c0" },
    { id: "gold", name: "Gold", color: "#ffd700" },
    { id: "purple", name: "Purple", color: "#8b5cf6" },
    { id: "blue", name: "Blue", color: "#3b82f6" },
  ]

  const materials = [
    { id: "aluminum", name: "Aluminum" },
    { id: "titanium", name: "Titanium" },
    { id: "ceramic", name: "Ceramic" },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Interactive 3D Showcase</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our products in stunning detail with interactive hotspots, exploded views, and material
            customization
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <ScrollReveal className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {showcaseProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
                      selectedProduct.id === product.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50",
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Starting at ${product.price}</p>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>

            {/* Customization Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customize</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Color</h4>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all duration-200",
                          selectedColor === color.id
                            ? "border-accent scale-110"
                            : "border-border hover:border-accent/50",
                        )}
                        style={{ backgroundColor: color.color }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Material</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {materials.map((material) => (
                      <button
                        key={material.id}
                        onClick={() => setSelectedMaterial(material.id)}
                        className={cn(
                          "p-2 rounded-lg border text-xs font-medium transition-all duration-200",
                          selectedMaterial === material.id
                            ? "border-accent bg-accent/5 text-accent"
                            : "border-border hover:border-accent/50",
                        )}
                      >
                        {material.name}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* View Modes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">View Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {viewModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id)}
                      className={cn(
                        "p-3 rounded-lg border transition-all duration-200 flex flex-col items-center gap-1",
                        viewMode === mode.id
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border hover:border-accent/50",
                      )}
                    >
                      {mode.icon}
                      <span className="text-xs font-medium">{mode.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* 3D Viewer */}
          <ScrollReveal className="lg:col-span-2">
            <AdvancedProductViewer
              productName={selectedProduct.name}
              selectedColor={selectedColor}
              selectedMaterial={selectedMaterial}
              hotspots={selectedProduct.hotspots}
              className="h-[600px]"
            />
          </ScrollReveal>
        </div>

        {/* Feature Highlights */}
        <ScrollReveal className="mt-16">
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            <StaggerItem>
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-lg mb-4">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Interactive Hotspots</h3>
                <p className="text-sm text-muted-foreground">
                  Click on hotspots to explore detailed features and specifications
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-lg mb-4">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Exploded Views</h3>
                <p className="text-sm text-muted-foreground">
                  See inside the product with detailed component breakdowns
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-lg mb-4">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Real-time Customization</h3>
                <p className="text-sm text-muted-foreground">
                  Change colors and materials to see instant visual updates
                </p>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  )
}
