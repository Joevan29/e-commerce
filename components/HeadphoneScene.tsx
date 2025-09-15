"use client"
import { useGLTF } from '@react-three/drei'

export function HeadphoneModel(props: any) {
  const { scene } = useGLTF('/headphones.glb')
  return <primitive object={scene} {...props} />
}
useGLTF.preload('/headphones.glb')