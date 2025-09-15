"use client"

import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, useGLTF } from "@react-three/drei"

export function KeyboardModel(props: any) {
  const { scene } = useGLTF("/keyboard.glb")
  return <primitive object={scene} {...props} />
}

export function KeyboardScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
      <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
        <KeyboardModel scale={1.2} />
      </Stage>
      <OrbitControls autoRotate autoRotateSpeed={1.0} enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

useGLTF.preload("/keyboard.glb")