"use client"

import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, useGLTF } from "@react-three/drei"

export function HeadphoneModel(props: any) {
  const { scene } = useGLTF("/headphones.glb")
  return <primitive object={scene} {...props} />
}

export function HeadphoneScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
      <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
        <HeadphoneModel scale={1.5} />
      </Stage>
      <OrbitControls autoRotate autoRotateSpeed={1.0} enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

useGLTF.preload("/headphones.glb")