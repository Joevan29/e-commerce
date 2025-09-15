"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LiveChatSupport } from "./live-chat-support"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Headphones, Zap, Clock, Users, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatWidgetProps {
  className?: string
  showStats?: boolean
}

export function ChatWidget({ className, showStats = false }: ChatWidgetProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [chatStats] = useState({
    averageResponseTime: "< 2 min",
    satisfaction: 4.8,
    agentsOnline: 12,
    totalChats: 1247,
  })

  useEffect(() => {
    // Show widget after page load
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn("relative", className)}>
      {/* Chat Stats (Optional) */}
      {showStats && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Headphones className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold text-foreground">24/7 Live Support</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-foreground">{chatStats.averageResponseTime}</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl font-bold text-foreground">{chatStats.satisfaction}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-foreground">{chatStats.agentsOnline}</div>
                    <div className="text-xs text-muted-foreground">Agents Online</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-bold text-foreground">{chatStats.totalChats.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Chats Today</div>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    Instant Connect
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    Expert Support
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    24/7 Available
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Live Chat Component */}
      <LiveChatSupport />

      {/* Chat Prompt (appears briefly) */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-20 right-4 z-40"
        >
          <Card className="w-64 shadow-lg border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-accent" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Need help?</p>
                  <p className="text-xs text-muted-foreground">Our support team is online and ready to assist you!</p>
                  <Button size="sm" className="w-full premium-button text-xs">
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
