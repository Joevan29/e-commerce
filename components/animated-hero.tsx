"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { AdvancedProductViewer } from "@/components/advanced-3d-viewer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}

function AnimatedCounter({ end, duration = 2, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-accent/20 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
        />
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "70%" }}
      />

      <motion.div
        className="absolute w-48 h-48 bg-gradient-to-r from-blue-500/10 to-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ bottom: "20%", left: "10%" }}
      />
    </div>
  )
}

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  }

  const productViewerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.25, 0, 1],
        delay: 0.3,
      },
    },
  }

  return (
    <section ref={containerRef} className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <FloatingElements />

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ y, opacity }}>
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">New Generation Technology</span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={titleVariants} className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: "hsl(var(--foreground))" }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  Experience the
                </motion.span>
                <motion.span
                  className="text-accent block bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Future of Tech
                </motion.span>
              </h1>

              <motion.p
                className="text-lg max-w-lg leading-relaxed"
                variants={itemVariants}
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Discover our premium collection of cutting-edge products designed to elevate your digital lifestyle.
                Every detail crafted to perfection with revolutionary technology.
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link href="/product/premium-device-pro">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="premium-button group relative overflow-hidden"
                    style={{
                      backgroundColor: "hsl(var(--accent))",
                      color: "hsl(var(--accent-foreground))",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span
                      className="relative z-10 flex items-center"
                      style={{ color: "hsl(var(--accent-foreground))" }}
                    >
                      Explore Products
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="premium-button bg-transparent backdrop-blur-sm border-accent/20 hover:bg-accent/10"
                  style={{ color: "hsl(var(--foreground))" }}
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div variants={itemVariants} className="flex gap-8 pt-8 border-t border-border/50">
              <div className="text-center sm:text-left">
                <AnimatedCounter end={50} suffix="K+" />
                <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Happy Customers
                </div>
              </div>
              <div className="text-center sm:text-left">
                <AnimatedCounter end={99.9} suffix="%" />
                <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Satisfaction Rate
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold" style={{ color: "hsl(var(--foreground))" }}>
                  24/7
                </div>
                <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Support
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple-600 border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                  >
                    {i}
                  </motion.div>
                ))}
              </div>
              <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Trusted by{" "}
                <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                  50,000+
                </span>{" "}
                customers worldwide
              </div>
            </motion.div>
          </div>

          {/* 3D Product Viewer */}
          <motion.div className="lg:pl-8 relative" variants={productViewerVariants}>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-purple-600/20 rounded-2xl blur-2xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10"
            >
              <AdvancedProductViewer productName="Premium Device Pro" className="shadow-2xl border border-accent/10" />
            </motion.div>

            {/* Floating UI Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-card/80 backdrop-blur-md border border-accent/20 rounded-lg p-3 shadow-lg"
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>
                  Live 3D Preview
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur-md border border-accent/20 rounded-lg p-3 shadow-lg"
              initial={{ opacity: 0, scale: 0, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.4, type: "spring" }}
            >
              <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                360° Interactive
              </div>
              <div className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                Drag to Rotate
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center"
          animate={{ borderColor: ["rgba(139, 92, 246, 0.3)", "rgba(139, 92, 246, 0.8)", "rgba(139, 92, 246, 0.3)"] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className="w-1 h-3 bg-accent rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
