"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FeaturedProductSectionProps {
  title: React.ReactNode
  description: string
  productLink: string
  children: React.ReactNode
  reverseLayout?: boolean
}

export function FeaturedProductSection({
  title,
  description,
  productLink,
  children,
  reverseLayout = false,
}: FeaturedProductSectionProps) {
  return (
    <section className="py-20 md:py-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center ${
            reverseLayout ? 'lg:grid-flow-col-dense' : ''
          }`}
        >
          {/* 3D Model Viewer */}
          <motion.div
            className="h-[400px] md:h-[600px] cursor-grab"
            initial={{ opacity: 0, x: reverseLayout ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {children}
          </motion.div>

          {/* Text Content */}
          <motion.div
            className={`space-y-6 ${reverseLayout ? 'lg:col-start-1' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
            <Link href={productLink}>
              <Button size="lg" className="apple-button group mt-4">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}