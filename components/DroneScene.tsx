"use client"
import { useGLTF } from '@react-three/drei'

export function DroneModel(props: any) {
  const { scene } = useGLTF('/drone.glb')
  return <primitive object={scene} {...props} />
}
useGLTF.preload('/drone.glb')