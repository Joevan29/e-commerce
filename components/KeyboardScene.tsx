"use client"
import { useGLTF } from '@react-three/drei'

export function KeyboardModel(props: any) {
  const { scene } = useGLTF('/keyboard.glb')
  return <primitive object={scene} {...props} />
}
useGLTF.preload('/keyboard.glb')