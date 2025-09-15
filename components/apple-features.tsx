"use client"

import { motion } from "framer-motion"
import { Shield, Truck, Headphones, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Every product undergoes rigorous quality testing to ensure perfection",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Complimentary worldwide shipping on all orders above $500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert assistance available around the clock for all your needs",
  },
  {
    icon: Award,
    title: "Lifetime Warranty",
    description: "Comprehensive coverage for peace of mind with every purchase",
  },
]

export function AppleFeatures() {
  return (
    <section className="apple-section bg-gray-50 py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose Us</h2>
          <p className="apple-text-body max-w-2xl mx-auto">
            We're committed to delivering an exceptional experience that goes beyond just products.
          </p>
        </motion.div>

        <div className="apple-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="apple-card text-center p-8 group hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-8 h-8 text-primary" />
              </motion.div>

              <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>

              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
