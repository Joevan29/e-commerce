"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Smartphone,
  RotateCcw,
  ZoomIn,
  Move3D,
  Maximize,
  Share2,
  Info,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ARViewerProps {
  productName: string
  modelUrl?: string
  className?: string
  onARStart?: () => void
  onAREnd?: () => void
}

interface ARFeature {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  available: boolean
}

const arFeatures: ARFeature[] = [
  {
    id: "placement",
    name: "Room Placement",
    description: "See how the product looks in your space",
    icon: <Move3D className="h-4 w-4" />,
    available: true,
  },
  {
    id: "scale",
    name: "True Scale",
    description: "View product at actual size",
    icon: <ZoomIn className="h-4 w-4" />,
    available: true,
  },
  {
    id: "lighting",
    name: "Real Lighting",
    description: "Realistic lighting and shadows",
    icon: <Camera className="h-4 w-4" />,
    available: true,
  },
  {
    id: "interaction",
    name: "Interactive",
    description: "Rotate, zoom, and examine details",
    icon: <RotateCcw className="h-4 w-4" />,
    available: true,
  },
]

export function ARProductViewer({ productName, modelUrl, className, onARStart, onAREnd }: ARViewerProps) {
  const [isARSupported, setIsARSupported] = useState(false)
  const [isARActive, setIsARActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [arError, setArError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  const arViewerRef = useRef<HTMLDivElement>(null)
  const recordingInterval = useRef<NodeJS.Timeout>()

  // Check AR support on component mount
  useEffect(() => {
    checkARSupport()
  }, [])

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current)
      }
      setRecordingTime(0)
    }

    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current)
      }
    }
  }, [isRecording])

  const checkARSupport = async () => {
    try {
      // Check if WebXR is supported
      if ("xr" in navigator) {
        const xr = (navigator as any).xr
        const isSupported = await xr.isSessionSupported("immersive-ar")
        setIsARSupported(isSupported)
      } else {
        // Fallback: Check for other AR capabilities
        const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
        const hasDeviceOrientation = "DeviceOrientationEvent" in window
        setIsARSupported(hasCamera && hasDeviceOrientation)
      }
    } catch (error) {
      console.error("AR support check failed:", error)
      setIsARSupported(false)
    }
  }

  const startAR = async () => {
    if (!isARSupported) {
      toast.error("AR not supported on this device")
      return
    }

    setIsLoading(true)
    setArError(null)

    try {
      // Simulate AR initialization
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsARActive(true)
      setShowInstructions(true)
      onARStart?.()

      toast.success("AR mode activated!")

      // Hide instructions after 5 seconds
      setTimeout(() => {
        setShowInstructions(false)
      }, 5000)
    } catch (error) {
      console.error("Failed to start AR:", error)
      setArError("Failed to initialize AR. Please try again.")
      toast.error("Failed to start AR mode")
    } finally {
      setIsLoading(false)
    }
  }

  const stopAR = () => {
    setIsARActive(false)
    setShowInstructions(false)
    setIsFullscreen(false)
    setIsRecording(false)
    onAREnd?.()
    toast.success("AR mode deactivated")
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (arViewerRef.current?.requestFullscreen) {
        arViewerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const startRecording = () => {
    setIsRecording(true)
    toast.success("Recording started")
  }

  const stopRecording = () => {
    setIsRecording(false)
    toast.success("Recording saved to gallery")
  }

  const takeScreenshot = () => {
    // Simulate screenshot
    toast.success("Screenshot saved to gallery")
  }

  const shareAR = () => {
    if (navigator.share) {
      navigator.share({
        title: `AR View of ${productName}`,
        text: `Check out this ${productName} in AR!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!isARSupported && !isARActive) {
    return (
      <Card className={cn("border-dashed border-2", className)}>
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Smartphone className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">AR Not Available</h3>
            <p className="text-sm text-muted-foreground">
              AR viewing requires a compatible device with camera access. Try opening this page on a mobile device or
              tablet.
            </p>
          </div>
          <Button variant="outline" onClick={checkARSupport}>
            Check Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("relative", className)}>
      {!isARActive ? (
        // AR Preview Card
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-accent" />
                AR Preview
              </CardTitle>
              <Badge className="bg-accent/10 text-accent">Beta</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* AR Preview Image */}
            <div className="relative aspect-video bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                    <Camera className="h-10 w-10 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Experience in AR</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      See how {productName} looks in your space with augmented reality
                    </p>
                  </div>
                </div>
              </div>

              {/* AR Features Overlay */}
              <div className="absolute top-4 left-4 space-y-2">
                {arFeatures.slice(0, 2).map((feature) => (
                  <Badge key={feature.id} variant="secondary" className="text-xs bg-white/90">
                    {feature.icon}
                    <span className="ml-1">{feature.name}</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* AR Features */}
            <div className="grid grid-cols-2 gap-4">
              {arFeatures.map((feature) => (
                <div key={feature.id} className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 text-accent rounded-lg">{feature.icon}</div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm text-foreground">{feature.name}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Error Display */}
            {arError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{arError}</p>
              </div>
            )}

            {/* Start AR Button */}
            <Button onClick={startAR} disabled={isLoading} className="w-full premium-button" size="lg">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Initializing AR...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Start AR Experience
                </>
              )}
            </Button>

            {/* Device Requirements */}
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">Requires camera access and device orientation</p>
              <div className="flex justify-center gap-2">
                <Badge variant="outline" className="text-xs">
                  iOS 12+
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Android 7+
                </Badge>
                <Badge variant="outline" className="text-xs">
                  WebXR
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Active AR Viewer
        <div
          ref={arViewerRef}
          className={cn(
            "relative bg-black rounded-lg overflow-hidden",
            isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-video",
          )}
        >
          {/* AR Camera View Simulation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            {/* Simulated camera feed background */}
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
            </div>

            {/* AR Product Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                {/* 3D Product Representation */}
                <div className="w-48 h-48 bg-gradient-to-br from-accent/30 to-purple-500/30 rounded-lg border border-accent/50 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto bg-accent/50 rounded-lg flex items-center justify-center">
                      <Move3D className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-white text-sm font-medium">{productName}</p>
                  </div>
                </div>

                {/* AR Anchors */}
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-accent" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-accent" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-accent" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-accent" />
              </motion.div>
            </div>

            {/* AR Grid Overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" className="text-accent" />
              </svg>
            </div>
          </div>

          {/* AR Instructions Overlay */}
          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 left-4 right-4"
              >
                <Card className="bg-black/80 border-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">AR Instructions</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Move your device to scan the environment</li>
                          <li>• Tap to place the product</li>
                          <li>• Pinch to resize, drag to move</li>
                          <li>• Use controls below for more options</li>
                        </ul>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowInstructions(false)}
                        className="text-white hover:bg-white/20 p-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
            </div>
          )}

          {/* AR Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 right-4"
              >
                <div className="flex items-center justify-between bg-black/80 backdrop-blur-sm rounded-lg p-4">
                  {/* Left Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowInstructions(true)}
                      className="text-white hover:bg-white/20"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>

                  {/* Center Controls */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={takeScreenshot} className="text-white hover:bg-white/20">
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={cn("text-white hover:bg-white/20", isRecording && "bg-red-500 hover:bg-red-600")}
                    >
                      {isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={shareAR} className="text-white hover:bg-white/20">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={stopAR} className="text-white hover:bg-white/20">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Controls Visibility */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowControls(!showControls)}
            className="absolute top-4 left-4 text-white hover:bg-white/20"
          >
            {showControls ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}
