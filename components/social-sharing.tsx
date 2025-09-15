"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, MessageCircle, Users, Camera, Star, Trophy } from "lucide-react"

interface SocialSharingProps {
  productId: string
  productName: string
  productImage: string
  productPrice: number
}

export function SocialSharing({ productId, productName, productImage, productPrice }: SocialSharingProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(127)
  const [shares, setShares] = useState(43)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleShare = (platform: string) => {
    const url = `${window.location.origin}/product/${productId}`
    const text = `Check out this amazing ${productName} for $${productPrice}!`

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(productImage)}&description=${encodeURIComponent(text)}`,
    }

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
      setShares((prev) => prev + 1)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Share & Connect</h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {likes + shares} interactions
          </Badge>
        </div>

        {/* Social Actions */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant={isLiked ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            {likes}
          </Button>

          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            {shares}
          </Button>

          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <MessageCircle className="w-4 h-4" />
            23
          </Button>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {[
            { name: "Facebook", color: "bg-blue-600", icon: "📘" },
            { name: "Twitter", color: "bg-sky-500", icon: "🐦" },
            { name: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "📷" },
            { name: "WhatsApp", color: "bg-green-500", icon: "💬" },
            { name: "Pinterest", color: "bg-red-500", icon: "📌" },
          ].map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              size="sm"
              onClick={() => handleShare(platform.name.toLowerCase())}
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <span className="text-lg">{platform.icon}</span>
              <span className="text-xs">{platform.name}</span>
            </Button>
          ))}
        </div>

        {/* User Generated Content */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Customer Photos
          </h4>

          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={`/customer-photo-.jpg?height=100&width=100&query=customer photo ${i}`}
                  alt={`Customer photo ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              4.8/5 from 234 reviews
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Best Seller
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
