"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart, TrendingUp, Users, Eye, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
  description: string
  tags?: string[]
  viewCount?: number
  purchaseCount?: number
}

interface RecommendationSection {
  title: string
  subtitle: string
  icon: React.ReactNode
  products: Product[]
  algorithm: "trending" | "similar" | "viewed" | "personalized" | "bestsellers"
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Crystal Dragon Figurine",
    price: 299.99,
    originalPrice: 399.99,
    image: "/crystal-dragon-figurine.jpg",
    category: "Figurines",
    rating: 4.9,
    reviews: 127,
    isNew: true,
    isSale: true,
    description: "Handcrafted crystal dragon with LED base illumination",
    tags: ["crystal", "fantasy", "collectible", "LED"],
    viewCount: 1250,
    purchaseCount: 89,
  },
  {
    id: 2,
    name: "Vintage Pocket Watch",
    price: 1299.99,
    image: "/vintage-pocket-watch.jpg",
    category: "Timepieces",
    rating: 4.8,
    reviews: 89,
    description: "18k gold plated mechanical pocket watch from 1920s",
    tags: ["vintage", "timepiece", "gold", "mechanical"],
    viewCount: 890,
    purchaseCount: 45,
  },
  {
    id: 3,
    name: "Samurai Katana Replica",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/samurai-katana-replica.jpg",
    category: "Weapons",
    rating: 4.7,
    reviews: 203,
    isSale: true,
    description: "Museum-quality katana replica with authentic details",
    tags: ["samurai", "replica", "steel", "authentic"],
    viewCount: 2100,
    purchaseCount: 156,
  },
  {
    id: 4,
    name: "Holographic Art Cube",
    price: 1899.99,
    image: "/holographic-art-cube.jpg",
    category: "Tech Art",
    rating: 4.9,
    reviews: 92,
    isNew: true,
    description: "3D holographic display cube with rotating art pieces",
    tags: ["holographic", "tech", "art", "3D"],
    viewCount: 1560,
    purchaseCount: 67,
  },
  {
    id: 5,
    name: "Mystical Crystal Ball",
    price: 699.99,
    image: "/mystical-crystal-ball.jpg",
    category: "Mystical",
    rating: 4.5,
    reviews: 89,
    description: "Pure quartz crystal ball with ornate bronze stand",
    tags: ["crystal", "mystical", "quartz", "bronze"],
    viewCount: 780,
    purchaseCount: 34,
  },
  {
    id: 6,
    name: "Steampunk Mechanical Bird",
    price: 599.99,
    image: "/steampunk-mechanical-bird.jpg",
    category: "Steampunk",
    rating: 4.6,
    reviews: 156,
    description: "Intricate clockwork bird with moving wings and gears",
    tags: ["steampunk", "mechanical", "clockwork", "vintage"],
    viewCount: 1120,
    purchaseCount: 78,
  },
]

interface ProductRecommendationsProps {
  currentProductId?: number
  currentCategory?: string
  userPreferences?: string[]
  className?: string
}

export function ProductRecommendations({
  currentProductId,
  currentCategory,
  userPreferences = [],
  className,
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationSection[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  // Recommendation algorithms
  const generateRecommendations = () => {
    const sections: RecommendationSection[] = []

    // 1. Trending Products (based on view count and recent activity)
    const trendingProducts = [...sampleProducts].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 4)

    sections.push({
      title: "Trending Now",
      subtitle: "Most viewed products this week",
      icon: <TrendingUp className="h-5 w-5" />,
      products: trendingProducts,
      algorithm: "trending",
    })

    // 2. Similar Products (if viewing a specific product)
    if (currentProductId && currentCategory) {
      const similarProducts = sampleProducts
        .filter((p) => p.id !== currentProductId && p.category === currentCategory)
        .slice(0, 4)

      if (similarProducts.length > 0) {
        sections.push({
          title: "Similar Items",
          subtitle: `More ${currentCategory.toLowerCase()} you might like`,
          icon: <Eye className="h-5 w-5" />,
          products: similarProducts,
          algorithm: "similar",
        })
      }
    }

    // 3. Bestsellers (based on purchase count)
    const bestsellers = [...sampleProducts].sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0)).slice(0, 4)

    sections.push({
      title: "Bestsellers",
      subtitle: "Customer favorites",
      icon: <Users className="h-5 w-5" />,
      products: bestsellers,
      algorithm: "bestsellers",
    })

    // 4. Personalized (based on user preferences/tags)
    if (userPreferences.length > 0) {
      const personalizedProducts = sampleProducts
        .filter((p) => p.tags?.some((tag) => userPreferences.includes(tag)))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)

      if (personalizedProducts.length > 0) {
        sections.push({
          title: "Recommended for You",
          subtitle: "Based on your interests",
          icon: <Sparkles className="h-5 w-5" />,
          products: personalizedProducts,
          algorithm: "personalized",
        })
      }
    }

    setRecommendations(sections)
  }

  useEffect(() => {
    generateRecommendations()
  }, [currentProductId, currentCategory, userPreferences])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (recommendations.length === 0) return null

  return (
    <div className={cn("space-y-12", className)}>
      {recommendations.map((section, sectionIndex) => (
        <motion.div
          key={section.algorithm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          className="space-y-6"
        >
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 text-accent rounded-lg">{section.icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                <p className="text-muted-foreground">{section.subtitle}</p>
              </div>
            </div>

            {/* Algorithm Badge */}
            <Badge variant="outline" className="text-xs">
              {section.algorithm === "trending" && "AI Trending"}
              {section.algorithm === "similar" && "Similarity Match"}
              {section.algorithm === "bestsellers" && "Popular Choice"}
              {section.algorithm === "personalized" && "Personal AI"}
              {section.algorithm === "viewed" && "Recently Viewed"}
            </Badge>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-accent text-accent-foreground text-xs">NEW</Badge>}
                      {product.isSale && (
                        <Badge className="bg-destructive text-destructive-foreground text-xs">SALE</Badge>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white h-8 w-8 p-0"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600",
                        )}
                      />
                    </Button>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                          <Eye className="h-4 w-4 mr-1" />
                          Quick View
                        </Button>
                        <Button size="sm" className="bg-accent text-accent-foreground">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* Recommendation Score */}
                    {section.algorithm === "personalized" && (
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-green-500 text-white text-xs">95% Match</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4 space-y-3">
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-sm hover:text-accent transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {product.isSale && product.originalPrice && (
                        <Badge variant="destructive" className="text-xs">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Algorithm Insights */}
                    {section.algorithm === "trending" && product.viewCount && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>{product.viewCount.toLocaleString()} views this week</span>
                      </div>
                    )}

                    {section.algorithm === "bestsellers" && product.purchaseCount && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{product.purchaseCount} sold this month</span>
                      </div>
                    )}

                    {section.algorithm === "similar" && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>Similar to your current selection</span>
                      </div>
                    )}

                    {section.algorithm === "personalized" && product.tags && (
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button variant="outline" className="bg-transparent">
              View All {section.title}
            </Button>
          </div>
        </motion.div>
      ))}

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-accent/5 to-purple-500/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">AI-Powered Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced recommendation engine analyzes your browsing patterns, purchase history, and product
                  similarities to suggest items you'll love. The more you interact with our store, the better our
                  recommendations become.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    Machine Learning
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Collaborative Filtering
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Content-Based
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Real-time Updates
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
