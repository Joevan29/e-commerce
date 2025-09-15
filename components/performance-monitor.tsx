"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Zap, Smartphone, Monitor } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface PerformanceMetrics {
  fps: number
  memory: number
  loadTime: number
  deviceType: "mobile" | "desktop"
  connectionSpeed: "slow" | "fast"
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    loadTime: 0,
    deviceType: "desktop",
    connectionSpeed: "fast",
  })
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))

        setMetrics((prev) => ({
          ...prev,
          fps,
          memory: (performance as any).memory ? Math.round((performance as any).memory.usedJSHeapSize / 1048576) : 0,
          deviceType: isMobile ? "mobile" : "desktop",
          connectionSpeed: (navigator as any).connection?.effectiveType === "4g" ? "fast" : "slow",
        }))

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    if (isVisible) {
      measureFPS()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isVisible, isMobile])

  useEffect(() => {
    const loadTime = performance.timing?.loadEventEnd - performance.timing?.navigationStart
    if (loadTime) {
      setMetrics((prev) => ({ ...prev, loadTime: Math.round(loadTime) }))
    }
  }, [])

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 glass-effect"
      >
        <Activity className="h-4 w-4 mr-2" />
        Performance
      </Button>
    )
  }

  const getFPSColor = (fps: number) => {
    if (fps >= 50) return "text-green-500"
    if (fps >= 30) return "text-yellow-500"
    return "text-red-500"
  }

  const getMemoryColor = (memory: number) => {
    if (memory < 50) return "text-green-500"
    if (memory < 100) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 glass-effect w-64">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" />
            <span className="font-semibold text-sm">Performance</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
            ×
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">FPS</span>
            <span className={`text-sm font-mono ${getFPSColor(metrics.fps)}`}>{metrics.fps}</span>
          </div>

          {metrics.memory > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Memory</span>
              <span className={`text-sm font-mono ${getMemoryColor(metrics.memory)}`}>{metrics.memory}MB</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Load Time</span>
            <span className="text-sm font-mono text-foreground">{metrics.loadTime}ms</span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <Badge variant="outline" className="text-xs">
              {metrics.deviceType === "mobile" ? (
                <>
                  <Smartphone className="h-3 w-3 mr-1" /> Mobile
                </>
              ) : (
                <>
                  <Monitor className="h-3 w-3 mr-1" /> Desktop
                </>
              )}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              {metrics.connectionSpeed === "fast" ? "Fast" : "Slow"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
