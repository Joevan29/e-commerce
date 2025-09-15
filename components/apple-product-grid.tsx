"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const featuredProducts = [
  {
    id: "premium-device-pro",
    name: "Premium Device Pro",
    price: "$2,999",
    image: "/crystal-dragon-figurine.jpg",
    description: "The ultimate fusion of technology and artistry",
    rating: 4.9,
    reviews: 1247,
    badge: "New",
  },
  {
    id: "vintage-collection",
    name: "Vintage Collection",
    price: "$1,899",
    image: "/vintage-pocket-watch.jpg",
    description: "Timeless elegance meets modern innovation",
    rating: 4.8,
    reviews: 892,
    badge: "Popular",
  },
  {
    id: "samurai-edition",
    name: "Samurai Edition",
    price: "$3,499",
    image: "/samurai-katana-replica.jpg",
    description: "Honor tradition with cutting-edge design",
    rating: 5.0,
    reviews: 456,
    badge: "Limited",
  },
]

export function AppleProductGrid() {
  return (
    <section className="apple-section bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Collection</h2>
          <p className="apple-text-body max-w-2xl mx-auto">
            Discover our most coveted pieces, each representing the pinnacle of craftsmanship and innovation.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="apple-grid">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="apple-card group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="relative overflow-hidden rounded-t-2xl">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.badge === "New"
                          ? "bg-primary text-primary-foreground"
                          : product.badge === "Popular"
                            ? "bg-orange-500 text-white"
                            : "bg-red-500 text-white"
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">{product.price}</span>
                    <Button size="sm" className="apple-button group/btn">
                      View
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link href="/products">
            <Button variant="outline" size="lg" className="apple-button-secondary group bg-transparent">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
