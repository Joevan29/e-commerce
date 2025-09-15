"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { SceneLoader } from "./SceneLoader"
const DroneScene = lazy(() => import("@/components/DroneScene").then(module => ({ default: module.DroneScene })));
const HeadphoneScene = lazy(() => import("@/components/HeadphoneScene").then(module => ({ default: module.HeadphoneScene })));
const KeyboardScene = lazy(() => import("@/components/KeyboardScene").then(module => ({ default: module.KeyboardScene })));

interface ShowcaseItem {
  type: "component"
  component: React.ComponentType<any>
  title: string
  description: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    type: "component",
    component: DroneScene,
    title: "Revolutionary Drone Technology",
    description: "Capture stunning aerial shots with our state-of-the-art drone.",
  },
  {
    type: "component",
    component: HeadphoneScene,
    title: "Immersive Audio Experience",
    description: "Feel every beat with our premium wireless headphones.",
  },
  {
    type: "component",
    component: KeyboardScene,
    title: "Mechanical Keyboard Mastery",
    description: "Type with precision and style.",
  },
]

export function CinematicShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        handleNext()
      }, 10000) 
      return () => clearTimeout(timer)
    }
  }, [currentIndex, isPlaying])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % showcaseItems.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? showcaseItems.length - 1 : prevIndex - 1
    )
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentItem = showcaseItems[currentIndex]
  const CurrentScene = currentItem.component

  const variants = {
    enter: { opacity: 0, scale: 0.9 },
    center: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.2, 1, 0.4, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.5, ease: [1, 0, 0.8, 0] },
    },
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Suspense fallback={<SceneLoader />}>
            <CurrentScene />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white z-10 max-w-lg">
        <motion.h2
          key={currentIndex + "title"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-bold mb-1"
        >
          {currentItem.title}
        </motion.h2>
        <motion.p
          key={currentIndex + "desc"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-sm md:text-base"
        >
          {currentItem.description}
        </motion.p>
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex items-center space-x-2">
        <Button size="icon" variant="outline" onClick={handlePrev} className="bg-transparent text-white hover:bg-white/20 hover:text-white">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button size="icon" variant="outline" onClick={handlePlayPause} className="bg-transparent text-white hover:bg-white/20 hover:text-white">
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button size="icon" variant="outline" onClick={handleNext} className="bg-transparent text-white hover:bg-white/20 hover:text-white">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {showcaseItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}