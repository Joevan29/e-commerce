"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Users, Eye } from "lucide-react"
import Link from "next/link"

const collections = [
  {
    id: 1,
    name: "Ancient Mysteries",
    description:
      "Discover artifacts and relics from lost civilizations, each piece telling a story of humanity's forgotten past.",
    image: "/placeholder-2kgle.png",
    itemCount: 24,
    featured: true,
    category: "Historical",
    curator: "Dr. Sarah Chen",
    rating: 4.9,
    views: 15420,
    created: "2024-01-15",
    items: [
      { name: "Egyptian Scarab", price: 799.99, image: "/placeholder-4ljac.png" },
      { name: "Roman Coin Set", price: 1299.99, image: "/placeholder-r0jn9.png" },
      { name: "Mayan Jade Mask", price: 2499.99, image: "/placeholder-gs4vq.png" },
      { name: "Viking Rune Stone", price: 1899.99, image: "/placeholder-ajiv7.png" },
    ],
  },
  {
    id: 2,
    name: "Steampunk Wonders",
    description: "Mechanical marvels and clockwork creations that blend Victorian elegance with industrial innovation.",
    image: "/placeholder-yp7w6.png",
    itemCount: 18,
    featured: true,
    category: "Mechanical",
    curator: "Prof. James Gearwright",
    rating: 4.8,
    views: 12890,
    created: "2024-02-03",
    items: [
      { name: "Clockwork Bird", price: 599.99, image: "/placeholder-r4c7h.png" },
      { name: "Brass Telescope", price: 899.99, image: "/placeholder-gyypp.png" },
      { name: "Gear Pocket Watch", price: 749.99, image: "/placeholder-opza5.png" },
      { name: "Steam Engine Model", price: 1299.99, image: "/placeholder-aelro.png" },
    ],
  },
  {
    id: 3,
    name: "Cosmic Treasures",
    description:
      "Celestial wonders and space-inspired collectibles that capture the beauty and mystery of the universe.",
    image: "/placeholder-mwud5.png",
    itemCount: 31,
    featured: false,
    category: "Space",
    curator: "Dr. Luna Starfield",
    rating: 4.9,
    views: 18750,
    created: "2024-01-28",
    items: [
      { name: "Galaxy Orb", price: 449.99, image: "/placeholder-2i6cu.png" },
      { name: "Meteorite Fragment", price: 1599.99, image: "/placeholder-575yf.png" },
      { name: "Constellation Map", price: 299.99, image: "/placeholder-h75qn.png" },
      { name: "Astronaut Helmet", price: 2299.99, image: "/placeholder-kufyu.png" },
    ],
  },
  {
    id: 4,
    name: "Mystical Crystals",
    description: "Rare gemstones and crystal formations believed to possess unique energies and healing properties.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 27,
    featured: true,
    category: "Gemstones",
    curator: "Master Crystal Sage",
    rating: 4.7,
    views: 9340,
    created: "2024-02-10",
    items: [
      { name: "Amethyst Geode", price: 899.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Rose Quartz Heart", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Clear Quartz Sphere", price: 699.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Labradorite Tower", price: 349.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  {
    id: 5,
    name: "Samurai Legacy",
    description:
      "Authentic Japanese weaponry and armor pieces representing the honor and craftsmanship of the samurai era.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 15,
    featured: false,
    category: "Weapons",
    curator: "Sensei Takeshi",
    rating: 4.8,
    views: 11200,
    created: "2024-01-20",
    items: [
      { name: "Katana Replica", price: 899.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Samurai Helmet", price: 1499.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Tanto Dagger", price: 399.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Wakizashi Short Sword", price: 649.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  {
    id: 6,
    name: "Art Deco Elegance",
    description:
      "Sophisticated pieces from the golden age of design, featuring geometric patterns and luxurious materials.",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 22,
    featured: false,
    category: "Art",
    curator: "Isabella Moderne",
    rating: 4.6,
    views: 7890,
    created: "2024-02-05",
    items: [
      { name: "Deco Vase", price: 599.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Gold Cigarette Case", price: 799.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Crystal Decanter", price: 449.99, image: "/placeholder.svg?height=200&width=200" },
      { name: "Bronze Sculpture", price: 1299.99, image: "/placeholder.svg?height=200&width=200" },
    ],
  },
]

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  const categories = ["All", "Historical", "Mechanical", "Space", "Gemstones", "Weapons", "Art"]

  const filteredCollections = collections.filter(
    (collection) => selectedCategory === "All" || collection.category === selectedCategory,
  )

  const sortedCollections = [...filteredCollections].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created).getTime() - new Date(a.created).getTime()
      case "popular":
        return b.views - a.views
      case "rating":
        return b.rating - a.rating
      case "items":
        return b.itemCount - a.itemCount
      default:
        return b.featured ? 1 : -1
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Curated Collections
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore our expertly curated collections, each telling a unique story through carefully selected premium
              items and rare artifacts
            </p>
            <div className="flex justify-center gap-6">
              <Badge variant="secondary" className="text-lg px-6 py-3">
                {collections.length} Collections
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3">
                Expert Curated
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3">
                Authenticated Items
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {collections
              .filter((c) => c.featured)
              .map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">FEATURED</Badge>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                        <p className="text-sm opacity-90">{collection.itemCount} items</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">{collection.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{collection.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{collection.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{collection.views.toLocaleString()} views</span>
                        </div>
                        <div className="text-sm text-muted-foreground">by {collection.curator}</div>
                      </div>
                      <Link href={`/collections/${collection.id}`}>
                        <Button className="w-full group">
                          Explore Collection
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border rounded-md bg-background"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="items">Most Items</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {collection.featured && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">FEATURED</Badge>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {collection.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{collection.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{collection.description}</p>

                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{collection.itemCount} items</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{collection.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mb-4">Curated by {collection.curator}</div>

                    {/* Preview Items */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {collection.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="aspect-square rounded-md overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>

                    <Link href={`/collections/${collection.id}`}>
                      <Button variant="outline" className="w-full group bg-transparent">
                        View Collection
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Create Your Own Collection</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have a passion for collecting? Share your expertise and create curated collections for fellow enthusiasts
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground">
            Become a Curator
          </Button>
        </div>
      </section>
    </div>
  )
}
