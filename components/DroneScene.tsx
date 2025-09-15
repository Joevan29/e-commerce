// components/DroneScene.tsx
"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

function Model(props: any) {
  const { scene } = useGLTF('/drone.glb')
  return <primitive object={scene} {...props} />
}

export function DroneScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0.5, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model scale={1.5} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}