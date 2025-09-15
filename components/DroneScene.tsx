"use client"

import { Canvas } from "@react-three/fiber"
import { Stage, OrbitControls, useGLTF } from "@react-three/drei"

export function DroneModel(props: any) {
  const { scene } = useGLTF("/drone.glb")
  return <primitive object={scene} {...props} />
}

export function DroneScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
      <Stage environment="city" intensity={0.6} adjustCamera={1.2}>
        <DroneModel scale={0.7} />
      </Stage>
      <OrbitControls autoRotate autoRotateSpeed={1.0} enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

useGLTF.preload("/drone.glb")