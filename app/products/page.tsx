"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search, Grid3X3, List, Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Crystal Dragon Figurine",
    price: 299.99,
    originalPrice: 399.99,
    image: "/placeholder-66uaj.png",
    category: "Figurines",
    rating: 4.9,
    reviews: 127,
    isNew: true,
    isSale: true,
    description: "Handcrafted crystal dragon with LED base illumination",
  },
  {
    id: 2,
    name: "Vintage Pocket Watch",
    price: 1299.99,
    image: "/placeholder-l2ejv.png",
    category: "Timepieces",
    rating: 4.8,
    reviews: 89,
    isNew: false,
    isSale: false,
    description: "18k gold plated mechanical pocket watch from 1920s",
  },
  {
    id: 3,
    name: "Samurai Katana Replica",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/placeholder-ij6qr.png",
    category: "Weapons",
    rating: 4.7,
    reviews: 203,
    isNew: false,
    isSale: true,
    description: "Museum-quality katana replica with authentic details",
  },
  {
    id: 4,
    name: "Rare Gemstone Collection",
    price: 2499.99,
    image: "/placeholder-qcwdc.png",
    category: "Gemstones",
    rating: 5.0,
    reviews: 45,
    isNew: true,
    isSale: false,
    description: "Curated collection of 12 rare gemstones with certificates",
  },
  {
    id: 5,
    name: "Steampunk Mechanical Bird",
    price: 599.99,
    image: "/placeholder-4osol.png",
    category: "Steampunk",
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isSale: false,
    description: "Intricate clockwork bird with moving wings and gears",
  },
  {
    id: 6,
    name: "Ancient Egyptian Scarab",
    price: 799.99,
    originalPrice: 999.99,
    image: "/placeholder-j5bjx.png",
    category: "Artifacts",
    rating: 4.8,
    reviews: 78,
    isNew: false,
    isSale: true,
    description: "Gold-plated scarab beetle with hieroglyphic engravings",
  },
  {
    id: 7,
    name: "Holographic Art Cube",
    price: 1899.99,
    image: "/placeholder-k33vs.png",
    category: "Tech Art",
    rating: 4.9,
    reviews: 92,
    isNew: true,
    isSale: false,
    description: "3D holographic display cube with rotating art pieces",
  },
  {
    id: 8,
    name: "Medieval Knight Armor",
    price: 3999.99,
    image: "/placeholder-4pw5g.png",
    category: "Armor",
    rating: 4.7,
    reviews: 34,
    isNew: false,
    isSale: false,
    description: "Full-scale medieval knight armor replica in steel",
  },
  {
    id: 9,
    name: "Cosmic Galaxy Orb",
    price: 449.99,
    originalPrice: 599.99,
    image: "/placeholder-t6f5i.png",
    category: "Space",
    rating: 4.8,
    reviews: 167,
    isNew: false,
    isSale: true,
    description: "Hand-blown glass orb containing miniature galaxy scene",
  },
  {
    id: 10,
    name: "Luxury Chess Set",
    price: 1599.99,
    image: "/placeholder-w15mh.png",
    category: "Games",
    rating: 4.9,
    reviews: 112,
    isNew: true,
    isSale: false,
    description: "Marble board with 24k gold-plated chess pieces",
  },
  {
    id: 11,
    name: "Mystical Crystal Ball",
    price: 699.99,
    image: "/placeholder-vst6z.png",
    category: "Mystical",
    rating: 4.5,
    reviews: 89,
    isNew: false,
    isSale: false,
    description: "Pure quartz crystal ball with ornate bronze stand",
  },
  {
    id: 12,
    name: "Vintage Telescope",
    price: 2299.99,
    originalPrice: 2799.99,
    image: "/placeholder-w5asu.png",
    category: "Instruments",
    rating: 4.8,
    reviews: 67,
    isNew: false,
    isSale: true,
    description: "Antique brass telescope with mahogany tripod stand",
  },
]

const categories = [
  "All",
  "Figurines",
  "Timepieces",
  "Weapons",
  "Gemstones",
  "Steampunk",
  "Artifacts",
  "Tech Art",
  "Armor",
  "Space",
  "Games",
  "Mystical",
  "Instruments",
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.isNew ? -1 : 1
      default:
        return 0
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Premium Collectibles
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our curated collection of luxury items, rare artifacts, and premium collectibles from around the
              world
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {products.length}+ Premium Items
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Worldwide Shipping
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <RadioGroup value={sortBy} onValueChange={setSortBy} className="flex flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="featured" id="featured" />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-low" id="price-low" />
                  <Label htmlFor="price-low">Price: Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price-high" id="price-high" />
                  <Label htmlFor="price-high">Price: High</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rating" id="rating" />
                  <Label htmlFor="rating">Rating</Label>
                </div>
              </RadioGroup>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-accent text-accent-foreground">NEW</Badge>}
                      {product.isSale && <Badge className="bg-destructive text-destructive-foreground">SALE</Badge>}
                    </div>

                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>

                    {/* Quick Actions */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="bg-primary text-primary-foreground">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>

                      {product.isSale && product.originalPrice && (
                        <Badge variant="destructive" className="text-xs">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive collections, and special offers
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button className="bg-primary text-primary-foreground">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
