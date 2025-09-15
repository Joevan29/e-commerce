"use client"

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'

function AnimatedLogoText() {
  const [isHovered, setIsHovered] = useState(false);
  const words = ["Vertex", "Vision", "Vortex", "Value"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isHovered) {
      interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 150);
      const timeout = setTimeout(() => {
        if (interval) clearInterval(interval);
        setIndex(0);
      }, 600);
      return () => {
        if (interval) clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setIndex(0);
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full w-24 cursor-pointer flex items-center"
    >
      <AnimatePresence>
        <motion.span
          key={words[index % words.length]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="flex items-center text-xl font-bold tracking-tighter"
        >
          {words[index % words.length]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Collections", href: "/collections" },
    { name: "Technology", href: "/technology" },
    { name: "Support", href: "/support" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex h-full items-center space-x-2">
           <AnimatedLogoText />
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button size="sm">Sign Up</Button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground py-2">
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}