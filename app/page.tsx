"use client"

import React from 'react'
import dynamic from 'next/dynamic'
import { LazyLoad } from "@/components/lazy-loading"
import { AnimatedHero } from "@/components/animated-hero"
import { AppleFeatures } from "@/components/apple-features"

const CinematicShowcase = dynamic(() => 
  import('@/components/CinematicShowcase').then(mod => mod.CinematicShowcase),
  { 
    ssr: false,
    // Tambahkan loading skeleton agar tidak ada lompatan layout
    loading: () => <div className="h-[600px] w-full bg-gray-900" />
  }
)

export default function HomePage() {
  return (
    <main className="bg-background">
      
      {/* Bagian 1: Hero Section */}
      <section>
        <AnimatedHero />
      </section>

      {/* Bagian 2: Cinematic Showcase */}
      {/* Diberi ID agar link navigasi "Showcase" bisa berfungsi */}
      <section id="showcase">
        <CinematicShowcase />
      </section>

      {/* Bagian 3: Fitur atau konten lainnya */}
      <section className="py-20">
        <LazyLoad>
          <AppleFeatures />
        </LazyLoad>
      </section>
      
    </main>
  )
}