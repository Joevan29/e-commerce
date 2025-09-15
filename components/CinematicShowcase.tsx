// components/CinematicShowcase.tsx
"use client"

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SceneLoader } from './SceneLoader'
import * as THREE from 'three'

// Impor model 3D Anda
import { DroneModel } from './DroneScene'
import { KeyboardModel } from './KeyboardScene'
import { HeadphoneModel } from './HeadphoneScene'

// Komponen 3D Scene Utama
function SceneContent({ scrollYProgress }: { scrollYProgress: any }) {
  const groupRef = useRef<THREE.Group>(null!)
  
  // Transisi opacity dan scale untuk setiap model
  const droneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0])
  const droneScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.8])

  const keyboardOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.58], [0, 1, 0])
  const keyboardScale = useTransform(scrollYProgress, [0.25, 0.58], [0.8, 1])

  const headphoneOpacity = useTransform(scrollYProgress, [0.58, 0.73, 1], [0, 1, 1])
  const headphoneScale = useTransform(scrollYProgress, [0.58, 1], [0.8, 1])

  // MENAMBAHKAN GERAKAN OTOMATIS
  useFrame((state, delta) => {
    // Animasi kamera halus mengikuti kursor
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.5, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.5, 0.05)
    state.camera.lookAt(0, 0, 0)

    // Menambahkan rotasi pada grup yang sedang aktif
    if (groupRef.current) {
        if(scrollYProgress.get() < 0.33) {
            groupRef.current.children[0].rotation.y += delta * 0.2;
        } else if (scrollYProgress.get() < 0.66) {
            groupRef.current.children[1].rotation.y += delta * 0.2;
        } else {
            groupRef.current.children[2].rotation.y += delta * 0.2;
        }
    }
  })

  return (
    <group ref={groupRef}>
      <motion.hgroup style={{ opacity: droneOpacity, scale: droneScale }}>
        {/* PENYESUAIAN UKURAN */}
        <DroneModel position={[0, -1, 0]} scale={2.5} />
      </motion.hgroup>
      <motion.hgroup style={{ opacity: keyboardOpacity, scale: keyboardScale }}>
        {/* PENYESUAIAN UKURAN */}
        <KeyboardModel position={[0, -1.2, 0]} scale={4.5} rotation={[-0.2, 0, 0]} />
      </motion.hgroup>
      <motion.hgroup style={{ opacity: headphoneOpacity, scale: headphoneScale }}>
        {/* PENYESUAIAN UKURAN */}
        <HeadphoneModel position={[0, -1, 0]} scale={2.5} />
      </motion.hgroup>
    </group>
  )
}

// Komponen Teks Overlay (tidak berubah)
const TextOverlay = ({ children, opacity }: { children: React.ReactNode, opacity: any }) => (
  <motion.div
    style={{ opacity }}
    className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8 pointer-events-none"
  >
    {children}
  </motion.div>
)

export function CinematicShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start start", "end end"],
  })

  // Transisi opacity untuk Teks
  const droneTextOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0])
  const keyboardTextOpacity = useTransform(scrollYProgress, [0.38, 0.48, 0.58], [0, 1, 0])
  const headphoneTextOpacity = useTransform(scrollYProgress, [0.71, 0.81, 0.91], [0, 1, 0])

  return (
    <div ref={showcaseRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full">
        <Suspense fallback={<SceneLoader />}>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            {/* BACKGROUND SIMPLE & ELEGAN */}
            <color attach="background" args={['#101010']} />
            <ambientLight intensity={0.1} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="apartment" />
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -2, 0]} opacity={0.5} width={10} height={10} blur={1.5} far={4} />
            
            <SceneContent scrollYProgress={scrollYProgress} />
            
            <OrbitControls enableZoom={true} enablePan={false} minDistance={6} maxDistance={12} />
          </Canvas>
        </Suspense>

        {/* Lapisan Teks HTML */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <TextOverlay opacity={droneTextOpacity}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">Engineered for the<br /><span className="text-accent">Perfect Shot</span></h2>
          </TextOverlay>
          <TextOverlay opacity={keyboardTextOpacity}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">Designed for Feel,<br /><span className="text-accent">Built to Last</span></h2>
          </TextOverlay>
          <TextOverlay opacity={headphoneTextOpacity}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">Immerse Yourself<br /><span className="text-accent">in Pure Sound</span></h2>
          </TextOverlay>
        </div>
      </div>
    </div>
  )
}