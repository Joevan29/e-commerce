"use client"

import { AppleHero } from "@/components/apple-hero"
import { AppleProductGrid } from "@/components/apple-product-grid"
import { AppleFeatures } from "@/components/apple-features"
import { LazyLoad } from "@/components/lazy-loading"
import { useMobile } from "@/hooks/use-mobile"

export default function HomePage() {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-background pt-16">
      <AppleHero />

      <LazyLoad>
        <AppleProductGrid />
      </LazyLoad>

      <LazyLoad>
        <AppleFeatures />
      </LazyLoad>

      {isMobile && <div className="h-20" />}
    </div>
  )
}
