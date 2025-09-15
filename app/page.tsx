"use client"

import dynamic from 'next/dynamic'
import { AppleFeatures } from "@/components/apple-features"
import { AnimatedHero } from "@/components/animated-hero"
import { LazyLoad } from "@/components/lazy-loading"

const HomepageShowcase = dynamic(
  () => import('@/components/HomepageShowcase').then((mod) => mod.HomepageShowcase),
  { 
    ssr: false,
    loading: () => <div className="h-screen w-full bg-black" />
  }
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Bagian 1: Tampilan awal Anda, TIDAK DIHILANGKAN */}
      <AnimatedHero />

      {/* Bagian 2: Showcase 3D dengan transisi seperti di video */}
      <HomepageShowcase />

      {/* Bagian 3: Konten selanjutnya di bawah showcase */}
      <div className="relative z-10 bg-background">
        <LazyLoad>
          <AppleFeatures />
        </LazyLoad>
      </div>
    </div>
  )
}