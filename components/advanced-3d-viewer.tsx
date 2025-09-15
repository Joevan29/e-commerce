"use client"

import { FallbackProductViewer } from "./fallback-3d-viewer"

interface AdvancedViewerProps {
  modelUrl?: string
  productName: string
  className?: string
  selectedColor?: string
  selectedMaterial?: string
  hotspots?: any[]
}

export function AdvancedProductViewer({
  modelUrl,
  productName,
  className,
  selectedColor,
  selectedMaterial,
}: AdvancedViewerProps) {
  return (
    <FallbackProductViewer
      modelUrl={modelUrl}
      productName={productName}
      className={className}
      selectedColor={selectedColor}
      selectedMaterial={selectedMaterial}
    />
  )
}
