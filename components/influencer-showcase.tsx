"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Users, TrendingUp, Award, ExternalLink } from "lucide-react"

interface Influencer {
  id: string
  name: string
  username: string
  avatar: string
  followers: string
  category: string
  rating: number
  featuredProduct: {
    name: string
    image: string
    discount: number
  }
  bio: string
  verified: boolean
}

const influencers: Influencer[] = [
  {
    id: "1",
    name: "Alexandra Stone",
    username: "@mystical_alex",
    avatar: "/blonde-woman-influencer.jpg",
    followers: "125K",
    category: "Mystical & Spiritual",
    rating: 4.9,
    featuredProduct: {
      name: "Mystical Crystal Ball",
      image: "/mystical-crystal-ball.jpg",
      discount: 15,
    },
    bio: "Spiritual guide & crystal collector. Sharing the magic of mystical artifacts.",
    verified: true,
  },
  {
    id: "2",
    name: "David Chen",
    username: "@vintage_collector",
    avatar: "/asian-man-collector.jpg",
    followers: "89K",
    category: "Vintage & Antiques",
    rating: 4.8,
    featuredProduct: {
      name: "Vintage Pocket Watch",
      image: "/vintage-pocket-watch.jpg",
      discount: 20,
    },
    bio: "Vintage enthusiast with 20+ years of collecting experience.",
    verified: true,
  },
  {
    id: "3",
    name: "Samurai Mike",
    username: "@samurai_mike",
    avatar: "/man-with-beard-samurai.jpg",
    followers: "156K",
    category: "Martial Arts & Weapons",
    rating: 4.9,
    featuredProduct: {
      name: "Samurai Katana Replica",
      image: "/samurai-katana-replica.jpg",
      discount: 25,
    },
    bio: "Martial arts master & authentic weapon collector.",
    verified: true,
  },
]

export function InfluencerShowcase() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Featured Collectors</h2>
        <p className="text-muted-foreground">Discover curated collections from our top community members</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {influencers.map((influencer) => (
          <Card key={influencer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto">
                <Avatar className="w-20 h-20 mx-auto mb-3">
                  <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
                  <AvatarFallback>
                    {influencer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {influencer.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-lg">{influencer.name}</h3>
                <p className="text-sm text-muted-foreground">{influencer.username}</p>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {influencer.followers}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {influencer.rating}
                  </div>
                </div>

                <Badge variant="secondary" className="text-xs">
                  {influencer.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-center text-muted-foreground">{influencer.bio}</p>

              {/* Featured Product */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={influencer.featuredProduct.image || "/placeholder.svg"}
                      alt={influencer.featuredProduct.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{influencer.featuredProduct.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">
                          {influencer.featuredProduct.discount}% OFF
                        </Badge>
                        <span className="text-xs text-muted-foreground">Exclusive</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Follow
                </Button>
                <Button size="sm" className="flex-1">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          Become a Featured Collector
        </Button>
      </div>
    </div>
  )
}
