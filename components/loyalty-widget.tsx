"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Crown, Coins, Star, Gift, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoyaltyWidgetProps {
  className?: string
  compact?: boolean
}

export function LoyaltyWidget({ className, compact = false }: LoyaltyWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Sample data - would come from user context in real app
  const loyaltyData = {
    currentPoints: 1750,
    currentTier: "Silver Collector",
    nextTier: "Gold Connoisseur",
    pointsToNext: 750,
    progressPercentage: 70,
    multiplier: 1.5,
  }

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("fixed top-20 right-4 z-40", className)}
      >
        <Card className="w-64 shadow-lg border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-accent" />
                <span className="font-medium text-sm">Loyalty Points</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {loyaltyData.currentTier}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-accent" />
                  <span className="font-bold text-lg">{loyaltyData.currentPoints.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground">{loyaltyData.multiplier}x multiplier</div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress to {loyaltyData.nextTier}</span>
                  <span>{loyaltyData.pointsToNext} to go</span>
                </div>
                <Progress value={loyaltyData.progressPercentage} className="h-2" />
              </div>

              <Button size="sm" className="w-full premium-button text-xs">
                <Gift className="h-3 w-3 mr-1" />
                View Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("space-y-4", className)}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 text-accent rounded-lg">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Loyalty Status</h3>
                <p className="text-sm text-muted-foreground">{loyaltyData.currentTier}</p>
              </div>
            </div>
            <Badge className="bg-accent/10 text-accent">{loyaltyData.multiplier}x Points</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">{loyaltyData.currentPoints.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Available Points</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">{loyaltyData.pointsToNext}</div>
              <div className="text-xs text-muted-foreground">To Next Tier</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to {loyaltyData.nextTier}</span>
              <span>{loyaltyData.progressPercentage}%</span>
            </div>
            <Progress value={loyaltyData.progressPercentage} className="h-3" />
          </div>

          <div className="flex gap-2 mt-4">
            <Button size="sm" className="flex-1 premium-button">
              <Gift className="h-4 w-4 mr-1" />
              Rewards
            </Button>
            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
              <TrendingUp className="h-4 w-4 mr-1" />
              Activity
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Rewards Preview */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" />
            Available Rewards
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>10% Off Next Purchase</span>
              <Badge variant="outline" className="text-xs">
                500 pts
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Free Premium Shipping</span>
              <Badge variant="outline" className="text-xs">
                300 pts
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Exclusive Crystal Keychain</span>
              <Badge variant="outline" className="text-xs">
                800 pts
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
