"use client"

import { FallbackProductViewer } from "./fallback-3d-viewer"

interface OptimizedViewerProps {
  modelUrl?: string
  productName: string
  className?: string
  selectedColor?: string
  selectedMaterial?: string
  hotspots?: any[]
  enablePerformanceMode?: boolean
}

export function OptimizedProductViewer({
  modelUrl,
  productName,
  className,
  selectedColor,
  selectedMaterial,
}: OptimizedViewerProps) {
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
