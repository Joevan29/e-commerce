"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ARProductViewer } from "./ar-product-viewer"
import { Smartphone, Camera, Zap, Share2, Star, Users, TrendingUp, Award } from "lucide-react"

interface ARIntegrationProps {
  productName: string
  productId: string
  className?: string
}

export function ARIntegration({ productName, productId, className }: ARIntegrationProps) {
  const [activeTab, setActiveTab] = useState("viewer")
  const [arStats, setArStats] = useState({
    views: 1247,
    shares: 89,
    conversions: 34,
  })

  const arFeatures = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: "True-to-Scale Visualization",
      description: "See products at their actual size in your environment",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Real-time Lighting",
      description: "Dynamic lighting that matches your room conditions",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Cross-Platform Support",
      description: "Works on iOS, Android, and WebXR compatible devices",
    },
    {
      icon: <Share2 className="h-5 w-5" />,
      title: "Social Sharing",
      description: "Share AR experiences with friends and social media",
    },
  ]

  const arBenefits = [
    {
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      title: "40% Higher Engagement",
      description: "Users spend more time exploring products in AR",
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      title: "Reduced Returns",
      description: "Better product understanding leads to fewer returns",
    },
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      title: "Increased Confidence",
      description: "Customers feel more confident about their purchases",
    },
    {
      icon: <Award className="h-5 w-5 text-purple-500" />,
      title: "Premium Experience",
      description: "Stand out with cutting-edge shopping technology",
    },
  ]

  return (
    <div className={className}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="viewer">AR Viewer</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="stats">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="viewer" className="mt-6">
          <ARProductViewer productName={productName} className="w-full" />
        </TabsContent>

        <TabsContent value="features" className="mt-6 space-y-6">
          {/* AR Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-accent" />
                AR Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {arFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-accent/10 text-accent rounded-lg">{feature.icon}</div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AR Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Why AR Shopping?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {arBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 bg-card rounded-lg border">{benefit.icon}</div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Compatibility */}
          <Card>
            <CardHeader>
              <CardTitle>Device Compatibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">iOS</p>
                      <p className="text-xs text-muted-foreground">12.0+</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Android</p>
                      <p className="text-xs text-muted-foreground">7.0+</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-blue-100 rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">WebXR</p>
                      <p className="text-xs text-muted-foreground">Supported</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">ARCore</p>
                      <p className="text-xs text-muted-foreground">Ready</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-6 space-y-6">
          {/* AR Usage Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">{arStats.views.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">AR Views</div>
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +23% this week
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">{arStats.shares}</div>
                  <div className="text-sm text-muted-foreground">AR Shares</div>
                  <Badge variant="secondary" className="text-xs">
                    <Share2 className="h-3 w-3 mr-1" />
                    +15% this week
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">{arStats.conversions}</div>
                  <div className="text-sm text-muted-foreground">Conversions</div>
                  <Badge variant="secondary" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    +31% this week
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AR Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AR Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Session Duration</span>
                  <span className="font-medium">3m 24s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bounce Rate</span>
                  <span className="font-medium text-green-600">-18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Add to Cart Rate</span>
                  <span className="font-medium text-green-600">+42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                  <span className="font-medium">4.8/5</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AR Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-accent" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">"Amazing AR experience!"</p>
                      <p className="text-xs text-muted-foreground">
                        The AR feature helped me visualize the product perfectly in my space.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">"Game changer for online shopping"</p>
                      <p className="text-xs text-muted-foreground">
                        I feel much more confident about my purchases now.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
