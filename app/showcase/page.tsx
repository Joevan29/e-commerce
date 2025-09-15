"use client"

import { Navigation } from "@/components/navigation"
import { ProductShowcase } from "@/components/3d-showcase"

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Product Showcase</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our premium collection with interactive 3D visualization
            </p>
          </div>
          <ProductShowcase />
        </div>
      </div>
    </div>
  )
}
