"use client"

import { Navigation } from "@/components/navigation"
import { ProductConfigurator } from "@/components/product-configurator"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <ProductConfigurator productId={params.id} />
      </div>
    </div>
  )
}
