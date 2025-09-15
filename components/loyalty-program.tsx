"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Star,
  Gift,
  Zap,
  Trophy,
  Coins,
  Users,
  Target,
  TrendingUp,
  Sparkles,
  Clock,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LoyaltyTier {
  id: string
  name: string
  color: string
  icon: React.ReactNode
  minPoints: number
  benefits: string[]
  multiplier: number
  description: string
}

interface LoyaltyReward {
  id: string
  name: string
  description: string
  pointsCost: number
  type: "discount" | "freebie" | "exclusive" | "experience"
  image?: string
  available: boolean
  expiresAt?: Date
  category: string
}

interface UserLoyalty {
  currentPoints: number
  totalEarned: number
  currentTier: string
  nextTier?: string
  pointsToNextTier: number
  memberSince: Date
  totalSpent: number
  ordersCount: number
  referrals: number
}

interface LoyaltyActivity {
  id: string
  type: "earned" | "redeemed" | "expired"
  points: number
  description: string
  date: Date
  orderId?: string
}

const loyaltyTiers: LoyaltyTier[] = [
  {
    id: "bronze",
    name: "Bronze Explorer",
    color: "#CD7F32",
    icon: <Star className="h-5 w-5" />,
    minPoints: 0,
    benefits: ["1x points on purchases", "Birthday discount", "Free shipping on orders $100+"],
    multiplier: 1,
    description: "Start your journey with exclusive perks",
  },
  {
    id: "silver",
    name: "Silver Collector",
    color: "#C0C0C0",
    icon: <Trophy className="h-5 w-5" />,
    minPoints: 1000,
    benefits: ["1.5x points on purchases", "Early access to sales", "Free shipping on orders $75+", "Priority support"],
    multiplier: 1.5,
    description: "Enhanced rewards and exclusive access",
  },
  {
    id: "gold",
    name: "Gold Connoisseur",
    color: "#FFD700",
    icon: <Crown className="h-5 w-5" />,
    minPoints: 2500,
    benefits: [
      "2x points on purchases",
      "Exclusive products",
      "Free shipping on all orders",
      "Personal shopping assistant",
      "VIP customer service",
    ],
    multiplier: 2,
    description: "Premium benefits for our valued customers",
  },
  {
    id: "platinum",
    name: "Platinum Elite",
    color: "#E5E4E2",
    icon: <Sparkles className="h-5 w-5" />,
    minPoints: 5000,
    benefits: [
      "3x points on purchases",
      "First access to new collections",
      "Complimentary gift wrapping",
      "Exclusive events invitations",
      "Dedicated account manager",
      "Custom product requests",
    ],
    multiplier: 3,
    description: "The ultimate luxury shopping experience",
  },
]

const loyaltyRewards: LoyaltyReward[] = [
  {
    id: "1",
    name: "10% Off Next Purchase",
    description: "Save 10% on your next order",
    pointsCost: 500,
    type: "discount",
    available: true,
    category: "Discounts",
  },
  {
    id: "2",
    name: "Free Premium Shipping",
    description: "Complimentary express shipping on your next order",
    pointsCost: 300,
    type: "freebie",
    available: true,
    category: "Shipping",
  },
  {
    id: "3",
    name: "Exclusive Crystal Keychain",
    description: "Limited edition crystal keychain - members only",
    pointsCost: 800,
    type: "exclusive",
    available: true,
    category: "Merchandise",
  },
  {
    id: "4",
    name: "VIP Shopping Experience",
    description: "Personal shopping session with our expert",
    pointsCost: 2000,
    type: "experience",
    available: true,
    category: "Experiences",
  },
  {
    id: "5",
    name: "25% Off Premium Items",
    description: "Exclusive discount on premium collection",
    pointsCost: 1200,
    type: "discount",
    available: true,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: "Discounts",
  },
  {
    id: "6",
    name: "Early Access Pass",
    description: "24-hour early access to new product launches",
    pointsCost: 1500,
    type: "exclusive",
    available: true,
    category: "Access",
  },
]

const sampleUserLoyalty: UserLoyalty = {
  currentPoints: 1750,
  totalEarned: 3200,
  currentTier: "silver",
  nextTier: "gold",
  pointsToNextTier: 750,
  memberSince: new Date("2023-06-15"),
  totalSpent: 4500,
  ordersCount: 12,
  referrals: 3,
}

const sampleActivities: LoyaltyActivity[] = [
  {
    id: "1",
    type: "earned",
    points: 150,
    description: "Purchase: Crystal Dragon Figurine",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    orderId: "ORD-001",
  },
  {
    id: "2",
    type: "earned",
    points: 50,
    description: "Product review bonus",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "redeemed",
    points: -500,
    description: "Redeemed: 10% Off Next Purchase",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    type: "earned",
    points: 100,
    description: "Referral bonus",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
]

interface LoyaltyProgramProps {
  className?: string
}

export function LoyaltyProgram({ className }: LoyaltyProgramProps) {
  const [userLoyalty, setUserLoyalty] = useState<UserLoyalty>(sampleUserLoyalty)
  const [activities, setActivities] = useState<LoyaltyActivity[]>(sampleActivities)
  const [selectedReward, setSelectedReward] = useState<LoyaltyReward | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const currentTier = loyaltyTiers.find((tier) => tier.id === userLoyalty.currentTier)
  const nextTier = loyaltyTiers.find((tier) => tier.id === userLoyalty.nextTier)

  const progressPercentage =
    currentTier && nextTier
      ? ((userLoyalty.currentPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
      : 100

  const redeemReward = (reward: LoyaltyReward) => {
    if (userLoyalty.currentPoints >= reward.pointsCost) {
      setUserLoyalty((prev) => ({
        ...prev,
        currentPoints: prev.currentPoints - reward.pointsCost,
      }))

      const newActivity: LoyaltyActivity = {
        id: Date.now().toString(),
        type: "redeemed",
        points: -reward.pointsCost,
        description: `Redeemed: ${reward.name}`,
        date: new Date(),
      }

      setActivities((prev) => [newActivity, ...prev])
      setSelectedReward(null)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "earned":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "redeemed":
        return <Gift className="h-4 w-4 text-blue-500" />
      case "expired":
        return <Clock className="h-4 w-4 text-red-500" />
      default:
        return <Coins className="h-4 w-4" />
    }
  }

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Target className="h-4 w-4" />
      case "freebie":
        return <Gift className="h-4 w-4" />
      case "exclusive":
        return <Crown className="h-4 w-4" />
      case "experience":
        return <Sparkles className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Loyalty Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Crown className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold text-foreground">Loyalty Program</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Earn points with every purchase and unlock exclusive rewards, early access, and VIP experiences.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="tiers">Tiers</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Status */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Points & Tier Card */}
            <Card className="relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(135deg, ${currentTier?.color}20, ${currentTier?.color}05)`,
                }}
              />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {currentTier?.icon}
                    {currentTier?.name}
                  </CardTitle>
                  <Badge style={{ backgroundColor: currentTier?.color, color: "white" }}>Current Tier</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-foreground">{userLoyalty.currentPoints.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Available Points</div>
                </div>

                {nextTier && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to {nextTier.name}</span>
                      <span>{userLoyalty.pointsToNextTier} points to go</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{userLoyalty.totalEarned.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{currentTier?.multiplier}x</div>
                    <div className="text-xs text-muted-foreground">Points Multiplier</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Member Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Member Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">${userLoyalty.totalSpent.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Spent</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">{userLoyalty.ordersCount}</div>
                    <div className="text-xs text-muted-foreground">Orders Placed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">{userLoyalty.referrals}</div>
                    <div className="text-xs text-muted-foreground">Friends Referred</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">
                      {Math.floor((Date.now() - userLoyalty.memberSince.getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-xs text-muted-foreground">Days as Member</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground">Member since</div>
                  <div className="font-medium">{formatDate(userLoyalty.memberSince)}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Your Current Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTier?.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          {/* Available Rewards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loyaltyRewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card
                  className={cn(
                    "h-full transition-all duration-300",
                    userLoyalty.currentPoints >= reward.pointsCost ? "hover:shadow-lg cursor-pointer" : "opacity-60",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getRewardTypeIcon(reward.type)}
                        <Badge variant="outline" className="text-xs">
                          {reward.category}
                        </Badge>
                      </div>
                      {reward.expiresAt && (
                        <Badge variant="destructive" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Limited
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{reward.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{reward.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-accent" />
                        <span className="font-bold text-foreground">{reward.pointsCost.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">points</span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => setSelectedReward(reward)}
                        disabled={userLoyalty.currentPoints < reward.pointsCost || !reward.available}
                        className="premium-button"
                      >
                        {userLoyalty.currentPoints >= reward.pointsCost ? "Redeem" : "Not Enough Points"}
                      </Button>
                    </div>

                    {reward.expiresAt && (
                      <div className="text-xs text-muted-foreground">Expires: {formatDate(reward.expiresAt)}</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-6">
          {/* Tier Progression */}
          <div className="space-y-6">
            {loyaltyTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    tier.id === userLoyalty.currentTier && "ring-2 ring-accent shadow-lg",
                  )}
                >
                  <div className="absolute inset-0 opacity-5" style={{ backgroundColor: tier.color }} />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
                        >
                          {tier.icon}
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {tier.name}
                            {tier.id === userLoyalty.currentTier && (
                              <Badge style={{ backgroundColor: tier.color, color: "white" }}>Current</Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">{tier.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{tier.minPoints.toLocaleString()}+</div>
                        <div className="text-xs text-muted-foreground">points required</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="font-medium">{tier.multiplier}x points multiplier</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Points Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <div className="font-medium text-sm">{activity.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(activity.date)}
                          {activity.orderId && ` • Order: ${activity.orderId}`}
                        </div>
                      </div>
                    </div>
                    <div className={cn("font-bold", activity.points > 0 ? "text-green-600" : "text-red-600")}>
                      {activity.points > 0 ? "+" : ""}
                      {activity.points} pts
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reward Confirmation Modal */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedReward(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-lg shadow-2xl max-w-md w-full"
            >
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-accent" />
                    Redeem Reward
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-lg">{selectedReward.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedReward.description}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 p-4 bg-accent/5 rounded-lg">
                    <Coins className="h-5 w-5 text-accent" />
                    <span className="font-bold text-xl">{selectedReward.pointsCost.toLocaleString()}</span>
                    <span className="text-muted-foreground">points</span>
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    You have {userLoyalty.currentPoints.toLocaleString()} points available
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setSelectedReward(null)} className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => redeemReward(selectedReward)}
                      disabled={userLoyalty.currentPoints < selectedReward.pointsCost}
                      className="flex-1 premium-button"
                    >
                      Confirm Redemption
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
