"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MoreHorizontal, Verified } from "lucide-react"

interface SocialPost {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    verified: boolean
    tier: "bronze" | "silver" | "gold" | "platinum"
  }
  content: string
  image?: string
  product?: {
    name: string
    price: number
    image: string
  }
  likes: number
  comments: number
  shares: number
  timestamp: string
  isLiked: boolean
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    user: {
      name: "Sarah Chen",
      username: "@sarahc_collector",
      avatar: "/serene-asian-woman.png",
      verified: true,
      tier: "gold",
    },
    content:
      "Just received my Crystal Dragon Figurine and it's absolutely stunning! The detail work is incredible. Worth every penny! 🐉✨",
    image: "/crystal-dragon-figurine.jpg",
    product: {
      name: "Crystal Dragon Figurine",
      price: 299,
      image: "/crystal-dragon-figurine.jpg",
    },
    likes: 156,
    comments: 23,
    shares: 12,
    timestamp: "2 hours ago",
    isLiked: false,
  },
  {
    id: "2",
    user: {
      name: "Marcus Johnson",
      username: "@vintage_marcus",
      avatar: "/thoughtful-man.png",
      verified: false,
      tier: "silver",
    },
    content: "My collection is growing! This vintage pocket watch is a masterpiece. The craftsmanship is unmatched.",
    image: "/vintage-pocket-watch.jpg",
    likes: 89,
    comments: 15,
    shares: 8,
    timestamp: "4 hours ago",
    isLiked: true,
  },
  {
    id: "3",
    user: {
      name: "Elena Rodriguez",
      username: "@elena_mystical",
      avatar: "/confident-latina-woman.png",
      verified: true,
      tier: "platinum",
    },
    content:
      "Unboxing my new Mystical Crystal Ball! The energy is incredible. Perfect addition to my spiritual collection 🔮",
    image: "/mystical-crystal-ball.jpg",
    likes: 203,
    comments: 31,
    shares: 18,
    timestamp: "6 hours ago",
    isLiked: false,
  },
]

export function SocialFeed() {
  const [posts, setPosts] = useState(mockPosts)

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const getTierColor = (tier: string) => {
    const colors = {
      bronze: "bg-amber-600",
      silver: "bg-gray-400",
      gold: "bg-yellow-500",
      platinum: "bg-purple-600",
    }
    return colors[tier as keyof typeof colors] || "bg-gray-400"
  }

  const getTierIcon = (tier: string) => {
    const icons = {
      bronze: "🥉",
      silver: "🥈",
      gold: "🥇",
      platinum: "💎",
    }
    return icons[tier as keyof typeof icons] || "🏆"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Community Showcase</h2>
        <Button variant="outline" size="sm">
          Share Your Collection
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                      <AvatarFallback>
                        {post.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getTierColor(post.user.tier)} flex items-center justify-center text-xs`}
                    >
                      {getTierIcon(post.user.tier)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{post.user.name}</h4>
                      {post.user.verified && <Verified className="w-4 h-4 text-blue-500 fill-current" />}
                      <Badge variant="secondary" className="text-xs capitalize">
                        {post.user.tier}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {post.user.username} • {post.timestamp}
                    </p>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm mb-4">{post.content}</p>

              {post.image && (
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img src={post.image || "/placeholder.svg"} alt="Post image" className="w-full h-64 object-cover" />
                </div>
              )}

              {post.product && (
                <Card className="mb-4 bg-muted/50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.product.image || "/placeholder.svg"}
                        alt={post.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{post.product.name}</h5>
                        <p className="text-sm text-muted-foreground">${post.product.price}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Product
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${post.isLiked ? "text-red-500" : ""}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    {post.shares}
                  </Button>
                </div>

                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  Save Post
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" className="w-full bg-transparent">
          Load More Posts
        </Button>
      </div>
    </div>
  )
}
