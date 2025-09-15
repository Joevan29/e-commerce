// app/page.tsx
"use client"

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

// Impor komponen yang sudah ada
import { AnimatedHero } from "@/components/animated-hero"
import { AppleFeatures } from "@/components/apple-features"
import { LazyLoad } from "@/components/lazy-loading"
import { SceneLoader } from '@/components/SceneLoader'

// Impor model 3D menggunakan dynamic import
const DroneModel = dynamic(() => import('@/components/DroneScene').then(mod => mod.DroneModel))
const KeyboardModel = dynamic(() => import('@/components/KeyboardScene').then(mod => mod.KeyboardModel))
const HeadphoneModel = dynamic(() => import('@/components/HeadphoneScene').then(mod => mod.HeadphoneModel))

// Komponen baru untuk satu "Panel" Showcase
function ShowcasePanel({ title, description, children }: { title: React.ReactNode, description: string, children: React.ReactNode }) {
  return (
    <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center bg-black text-white">
      {/* Lapisan 3D di belakang */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SceneLoader />}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            {children}
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Lapisan Teks di depan */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-40%" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center p-8 pointer-events-none"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">{title}</h2>
        <p className="text-lg text-gray-300 leading-relaxed mt-4 max-w-xl">{description}</p>
      </motion.div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Bagian 1: Tampilan awal Anda tetap ada */}
      <AnimatedHero />

      {/* Bagian 2: Showcase 3D dengan transisi yang benar */}
      <div className="relative z-10">
        <ShowcasePanel
          title={<>Engineered for the<br /><span className="text-accent">Perfect Shot</span></>}
          description="Capture breathtaking cinematic footage with our professional-grade drone."
        >
          <DroneModel position={[0, -0.5, 0]} scale={1.5} rotation={[0, Math.PI / 4, 0]} />
        </ShowcasePanel>
        
        <ShowcasePanel
          title={<>Designed for Feel,<br /><span className="text-accent">Built to Last</span></>}
          description="Experience the ultimate typing satisfaction with our fully customizable mechanical keyboard."
        >
          <KeyboardModel position={[0, -0.5, 0]} scale={3} rotation={[-0.2, 0.3, 0]} />
        </ShowcasePanel>
        
        <ShowcasePanel
          title={<>Immerse Yourself<br /><span className="text-accent">in Pure Sound</span></>}
          description="Discover unparalleled audio clarity and comfort with our premium wireless headphones."
        >
          <HeadphoneModel position={[0, -0.5, 0]} scale={1.5} />
        </ShowcasePanel>
      </div>

      {/* Bagian 3: Konten selanjutnya di bawah */}
      <div className="relative z-20 bg-background">
        <LazyLoad>
          <AppleFeatures />
        </LazyLoad>
      </div>
    </div>
  )
}