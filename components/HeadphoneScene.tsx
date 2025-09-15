// components/HeadphoneScene.tsx
"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber' 
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'

function Model(props: any) {
  const { scene } = useGLTF('/headphones.glb')
  return <primitive object={scene} {...props} />
}

export function HeadphoneScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model scale={1.2} />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.75} scale={10} blur={2.5} far={0.8} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  )
}