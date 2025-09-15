"use client"

import { Suspense } from 'react'
import { motion } from "framer-motion"
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stage } from '@react-three/drei'
import { Button } from '@/components/ui/button'

function Logo3DViewer() {
  const { scene } = useGLTF('/logo.glb')
  return <primitive object={scene} scale={2.5} />
}

export function AnimatedHero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Curated Technology. Unmatched Quality.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Welcome to Vertex. We deliver excellence through innovation. Explore our exclusive collection of high-performance drones, immersive audio, and precision keyboards designed to elevate your experience.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-6 flex gap-4 justify-center md:justify-start"
            >
              <Button size="lg" asChild>
                <a href="#showcase">View Showcase</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                 <a href="/products">Shop All Products</a>
              </Button>
            </motion.div>
          </div>

          {/* Bagian Kanan (Logo 3D) */}
          <div className="relative w-full h-80 md:h-96">
            <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 5], fov: 45 }}>
              <Suspense fallback={null}>
                <Stage environment="city" intensity={0.6} adjustCamera={1.1}>
                  <Logo3DViewer />
                </Stage>
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2.0} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}