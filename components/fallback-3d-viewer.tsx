"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RotateCcw, ZoomIn, ZoomOut, Play, Pause } from "lucide-react"
import { motion, useAnimation } from "framer-motion"

interface FallbackViewerProps {
  modelUrl?: string
  productName: string
  className?: string
  selectedColor?: string
  selectedMaterial?: string
}

export function FallbackProductViewer({
  modelUrl,
  productName,
  className,
  selectedColor = "midnight",
  selectedMaterial = "aluminum",
}: FallbackViewerProps) {
  const [isRotating, setIsRotating] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const controls = useAnimation()
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })

  const colorMap: Record<string, string> = {
    midnight: "#1a1a1a",
    silver: "#c0c0c0",
    gold: "#ffd700",
    purple: "#8b5cf6",
    blue: "#3b82f6",
  }

  const materialMap: Record<string, string> = {
    aluminum: "linear-gradient(135deg, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)",
    titanium: "linear-gradient(135deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%)",
    ceramic: "linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)",
  }

  useEffect(() => {
    if (isRotating) {
      controls.start({
        rotateY: [0, 360],
        transition: {
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        },
      })
    } else {
      controls.stop()
    }
  }, [isRotating, controls])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
    setIsRotating(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return

    const deltaX = e.clientX - lastMouse.current.x
    const deltaY = e.clientY - lastMouse.current.y

    setRotation((prev) => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }))

    lastMouse.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setZoom(1)
    setIsRotating(true)
  }

  const zoomIn = () => setZoom((prev) => Math.min(2, prev + 0.2))
  const zoomOut = () => setZoom((prev) => Math.max(0.5, prev - 0.2))

  return (
    <Card className={`product-viewer ${className}`}>
      <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
        {/* 3D Product Container */}
        <div
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={controls}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            {/* Main Product Body */}
            <div
              className="w-64 h-80 rounded-3xl shadow-2xl relative"
              style={{
                background: materialMap[selectedMaterial] || materialMap.aluminum,
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.25),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
              }}
            >
              {/* Screen/Display Area */}
              <div
                className="absolute inset-4 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${colorMap[selectedColor]} 0%, rgba(0,0,0,0.8) 100%)`,
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {/* Simulated Interface */}
                <div className="p-4 h-full flex flex-col">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-1 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center items-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-accent"></div>
                    </div>
                    <div className="space-y-2 w-full">
                      <div className="h-2 bg-white/10 rounded w-3/4 mx-auto"></div>
                      <div className="h-2 bg-white/10 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10"></div>
                    <div className="w-8 h-8 rounded-lg bg-white/10"></div>
                    <div className="w-8 h-8 rounded-lg bg-white/10"></div>
                  </div>
                </div>
              </div>

              {/* Side Details */}
              <div className="absolute -right-1 top-20 w-1 h-12 bg-black/20 rounded-full"></div>
              <div className="absolute -right-1 top-36 w-1 h-8 bg-black/20 rounded-full"></div>
              <div className="absolute -left-1 top-24 w-1 h-16 bg-black/20 rounded-full"></div>

              {/* Camera Module */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-black/50"></div>
              </div>
            </div>

            {/* Floating Elements for 3D Effect */}
            <motion.div
              className="absolute -top-8 -right-8 w-4 h-4 rounded-full bg-accent/30"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-6 h-6 rounded-full bg-accent/20"
              animate={{
                y: [0, 10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>

        {/* Control Panel */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsRotating(!isRotating)}
            className="glass-effect premium-button"
          >
            {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="secondary" size="icon" onClick={resetView} className="glass-effect premium-button">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={zoomIn} className="glass-effect premium-button">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={zoomOut} className="glass-effect premium-button">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info Overlay */}
        <div className="absolute top-4 left-4 glass-effect rounded-lg p-3">
          <h3 className="font-semibold text-sm text-foreground">{productName}</h3>
          <p className="text-xs text-muted-foreground">Interactive Preview</p>
          <div className="flex items-center gap-2 mt-1">
            <div
              className="w-3 h-3 rounded-full border border-white/20"
              style={{ backgroundColor: colorMap[selectedColor] }}
            />
            <span className="text-xs text-muted-foreground capitalize">{selectedMaterial}</span>
          </div>
        </div>

        {/* Loading Indicator */}
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>
    </Card>
  )
}
