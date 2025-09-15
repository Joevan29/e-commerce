"use client"

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'

function Model(props: any) {
  const { scene } = useGLTF('/keyboard.glb')
  return <primitive object={scene} {...props} />
}

export function KeyboardScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [-5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
        <Suspense fallback={null}>
          <Model scale={2.5} rotation-x={-0.25} />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}