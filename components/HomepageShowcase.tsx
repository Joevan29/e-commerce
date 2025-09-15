"use client"

import React, { Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { SceneLoader } from './SceneLoader'
import { DroneModel } from './DroneScene'
import { KeyboardModel } from './KeyboardScene'
import { HeadphoneModel } from './HeadphoneScene'

function ShowcasePanel({ 
  children, 
  title, 
  description 
}: { 
  children: React.ReactNode, 
  title: React.ReactNode, 
  description: string 
}) {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SceneLoader />}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            {children}
            <Environment preset="studio" />
          </Canvas>
        </Suspense>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4 max-w-2xl mx-auto">{description}</p>
        </motion.div>
      </div>
    </div>
  )
}


export function HomepageShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null)
  
  return (
    <div ref={showcaseRef} className="relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Konten akan di-scroll di sini */}
      </div>

      <div className="relative z-10">
        <ShowcasePanel
          title={<>Engineered for the<br /><span className="text-accent">Perfect Shot</span></>}
          description="Capture breathtaking cinematic footage with our professional-grade drone."
        >
          <DroneModel scale={1.2} />
        </ShowcasePanel>
        
        <ShowcasePanel
          title={<>Designed for Feel,<br /><span className="text-accent">Built to Last</span></>}
          description="Experience the ultimate typing satisfaction with our fully customizable mechanical keyboard."
        >
          <KeyboardModel scale={2.5} rotation-x={-0.25} />
        </ShowcasePanel>
        
        <ShowcasePanel
          title={<>Immerse Yourself<br /><span className="text-accent">in Pure Sound</span></>}
          description="Discover unparalleled audio clarity and comfort with our premium wireless headphones."
        >
          <HeadphoneModel scale={1.2} />
        </ShowcasePanel>
      </div>
    </div>
  )
}