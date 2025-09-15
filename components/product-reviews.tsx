"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Filter,
  ChevronDown,
  Verified,
  Camera,
  Video,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
  notHelpful: number
  images?: string[]
  videos?: string[]
  variant?: {
    color: string
    storage: string
    material: string
  }
  pros?: string[]
  cons?: string[]
}

interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  verifiedPurchases: number
}

const sampleReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Absolutely stunning quality and design!",
    content:
      "I've been using this for 3 months now and I'm blown away by the build quality. The 3D visualization on the website was spot-on - what you see is exactly what you get. The materials feel premium and the attention to detail is incredible.",
    date: "2024-01-15",
    verified: true,
    helpful: 24,
    notHelpful: 2,
    images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
    variant: {
      color: "Midnight Black",
      storage: "256GB",
      material: "Titanium",
    },
    pros: ["Exceptional build quality", "Beautiful design", "Great performance"],
    cons: ["Price is on the higher side"],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Michael Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    title: "Great product, minor issues with delivery",
    content:
      "The product itself is fantastic - exactly as advertised. The 3D preview feature really helped me make the right choice. Only complaint is that delivery took longer than expected, but customer service was very responsive.",
    date: "2024-01-10",
    verified: true,
    helpful: 18,
    notHelpful: 1,
    variant: {
      color: "Ocean Blue",
      storage: "512GB",
      material: "Aluminum",
    },
    pros: ["Accurate 3D preview", "Responsive customer service", "High quality"],
    cons: ["Slow delivery", "Packaging could be better"],
  },
  {
    id: "3",
    userId: "user3",
    userName: "Emma Rodriguez",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Worth every penny - premium experience",
    content:
      "This is my second purchase from this store and they never disappoint. The interactive 3D viewer made it so easy to customize exactly what I wanted. The final product exceeded my expectations in every way.",
    date: "2024-01-08",
    verified: true,
    helpful: 31,
    notHelpful: 0,
    videos: ["/placeholder-video.mp4"],
    variant: {
      color: "Deep Purple",
      storage: "1TB",
      material: "Ceramic",
    },
    pros: ["Premium materials", "Perfect customization", "Fast shipping"],
    cons: [],
  },
]

const reviewStats: ReviewStats = {
  averageRating: 4.7,
  totalReviews: 127,
  ratingDistribution: {
    5: 89,
    4: 28,
    3: 7,
    2: 2,
    1: 1,
  },
  verifiedPurchases: 98,
}

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  // New review form state
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    content: "",
    pros: "",
    cons: "",
  })

  const StarRating = ({
    rating,
    size = "sm",
    interactive = false,
    onRatingChange,
  }: {
    rating: number
    size?: "sm" | "md" | "lg"
    interactive?: boolean
    onRatingChange?: (rating: number) => void
  }) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    }

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange?.(star)}
            disabled={!interactive}
            className={cn(
              sizeClasses[size],
              "transition-colors duration-200",
              interactive && "hover:scale-110 cursor-pointer",
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300",
            )}
          >
            <Star className={sizeClasses[size]} />
          </button>
        ))}
      </div>
    )
  }

  const filteredAndSortedReviews = reviews
    .filter((review) => {
      if (filterRating && review.rating !== filterRating) return false
      if (showVerifiedOnly && !review.verified) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.title || !newReview.content) return

    const review: Review = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "You",
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString().split("T")[0],
      verified: true,
      helpful: 0,
      notHelpful: 0,
      pros: newReview.pros ? newReview.pros.split(",").map((p) => p.trim()) : [],
      cons: newReview.cons ? newReview.cons.split(",").map((c) => c.trim()) : [],
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 0, title: "", content: "", pros: "", cons: "" })
    setShowWriteReview(false)
  }

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            Customer Reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">{reviewStats.averageRating}</div>
                <StarRating rating={reviewStats.averageRating} size="lg" />
                <p className="text-muted-foreground">Based on {reviewStats.totalReviews} reviews</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm">
                <Verified className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">
                  {Math.round((reviewStats.verifiedPurchases / reviewStats.totalReviews) * 100)}% verified purchases
                </span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <Progress
                    value={
                      (reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution] /
                        reviewStats.totalReviews) *
                      100
                    }
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-muted-foreground w-8">
                    {reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={() => setShowWriteReview(true)} className="premium-button">
              <MessageCircle className="h-4 w-4 mr-2" />
              Write a Review
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Add Photos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Modal */}
      <AnimatePresence>
        {showWriteReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWriteReview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Rating */}
                  <div className="space-y-2">
                    <Label>Overall Rating</Label>
                    <StarRating
                      rating={newReview.rating}
                      size="lg"
                      interactive
                      onRatingChange={(rating) => setNewReview((prev) => ({ ...prev, rating }))}
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="review-title">Review Title</Label>
                    <Input
                      id="review-title"
                      placeholder="Summarize your experience"
                      value={newReview.title}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="review-content">Your Review</Label>
                    <Textarea
                      id="review-content"
                      placeholder="Share your thoughts about this product..."
                      rows={4}
                      value={newReview.content}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                    />
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pros">Pros (comma separated)</Label>
                      <Textarea
                        id="pros"
                        placeholder="What did you like?"
                        rows={3}
                        value={newReview.pros}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, pros: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cons">Cons (comma separated)</Label>
                      <Textarea
                        id="cons"
                        placeholder="What could be improved?"
                        rows={3}
                        value={newReview.cons}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, cons: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleSubmitReview}
                      className="premium-button flex-1"
                      disabled={newReview.rating === 0 || !newReview.title || !newReview.content}
                    >
                      Submit Review
                    </Button>
                    <Button variant="outline" onClick={() => setShowWriteReview(false)} className="bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Sorting */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter & Sort:</span>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 rounded-md border border-border bg-background text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>

            {/* Rating Filter */}
            <div className="flex items-center gap-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={filterRating === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                  className="h-8"
                >
                  {rating} <Star className="h-3 w-3 ml-1 fill-current" />
                </Button>
              ))}
            </div>

            {/* Verified Only */}
            <Button
              variant={showVerifiedOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
              className="h-8"
            >
              <Verified className="h-3 w-3 mr-1" />
              Verified Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.userName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            <Verified className="h-3 w-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size="sm" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">{review.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{review.content}</p>

                  {/* Variant Info */}
                  {review.variant && (
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {review.variant.color}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {review.variant.storage}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {review.variant.material}
                      </Badge>
                    </div>
                  )}

                  {/* Pros and Cons */}
                  {(review.pros?.length || review.cons?.length) && (
                    <div className="grid md:grid-cols-2 gap-4 pt-2">
                      {review.pros && review.pros.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-green-600">Pros:</h5>
                          <ul className="space-y-1">
                            {review.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <ThumbsUp className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {review.cons && review.cons.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-red-600">Cons:</h5>
                          <ul className="space-y-1">
                            {review.cons.map((con, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <ThumbsDown className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Media */}
                  {(review.images?.length || review.videos?.length) && (
                    <div className="flex gap-2 pt-2">
                      {review.images?.map((image, index) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Review image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      ))}
                      {review.videos?.map((video, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 bg-gray-100 rounded-lg border flex items-center justify-center"
                        >
                          <Video className="h-6 w-6 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Review Actions */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not Helpful ({review.notHelpful})
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      {filteredAndSortedReviews.length < reviewStats.totalReviews && (
        <div className="text-center">
          <Button variant="outline" className="bg-transparent">
            Load More Reviews
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
