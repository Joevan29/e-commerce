"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  Paperclip,
  Smile,
  X,
  Minimize2,
  Maximize2,
  Star,
  Clock,
  CheckCircle,
  Bot,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  sender: "user" | "agent" | "bot"
  timestamp: Date
  type: "text" | "image" | "file" | "system"
  status?: "sending" | "sent" | "delivered" | "read"
  agentInfo?: {
    name: string
    avatar?: string
    role: string
  }
}

interface ChatAgent {
  id: string
  name: string
  avatar?: string
  role: string
  status: "online" | "busy" | "away" | "offline"
  rating: number
  specialties: string[]
  responseTime: string
}

const sampleAgents: ChatAgent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Senior Support Specialist",
    status: "online",
    rating: 4.9,
    specialties: ["Product Questions", "Technical Support", "Returns"],
    responseTime: "< 1 min",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Sales Consultant",
    status: "online",
    rating: 4.8,
    specialties: ["Product Recommendations", "Pricing", "Customization"],
    responseTime: "< 2 min",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Technical Expert",
    status: "busy",
    rating: 5.0,
    specialties: ["AR Support", "3D Viewing", "Device Compatibility"],
    responseTime: "< 5 min",
  },
]

const quickReplies = [
  "I need help with my order",
  "Product information",
  "Technical support",
  "Return/Exchange",
  "Shipping questions",
  "AR viewing issues",
]

const sampleMessages: Message[] = [
  {
    id: "1",
    content: "Hello! Welcome to Premium 3D E-commerce. How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 300000),
    type: "text",
    status: "read",
  },
  {
    id: "2",
    content: "Hi! I'm interested in the Crystal Dragon Figurine but I'm not sure about the size. Can you help?",
    sender: "user",
    timestamp: new Date(Date.now() - 240000),
    type: "text",
    status: "read",
  },
  {
    id: "3",
    content:
      "I'd be happy to help! Let me connect you with Sarah, our product specialist who can provide detailed information about the Crystal Dragon Figurine.",
    sender: "bot",
    timestamp: new Date(Date.now() - 180000),
    type: "text",
    status: "read",
  },
  {
    id: "4",
    content:
      "Hi there! I'm Sarah, and I'd love to help you with the Crystal Dragon Figurine. It's 8 inches tall and 6 inches wide, perfect for display. Would you like to see it in AR to get a better sense of the size?",
    sender: "agent",
    timestamp: new Date(Date.now() - 120000),
    type: "text",
    status: "read",
    agentInfo: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior Support Specialist",
    },
  },
]

interface LiveChatSupportProps {
  className?: string
}

export function LiveChatSupport({ className }: LiveChatSupportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentAgent, setCurrentAgent] = useState<ChatAgent | null>(sampleAgents[0])
  const [chatStatus, setChatStatus] = useState<"waiting" | "connected" | "ended">("connected")
  const [satisfaction, setSatisfaction] = useState<number | null>(null)
  const [showAgentSelection, setShowAgentSelection] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0)
      inputRef.current?.focus()
    }
  }, [isOpen])

  // Simulate agent typing
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setIsTyping(true)
      const timer = setTimeout(
        () => {
          setIsTyping(false)
          // Add agent response
          const responses = [
            "I understand your concern. Let me check that for you right away.",
            "That's a great question! I have the information you need.",
            "I'd be happy to help you with that. Let me get the details.",
            "Perfect! I can definitely assist you with this.",
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]

          addMessage({
            id: Date.now().toString(),
            content: randomResponse,
            sender: "agent",
            timestamp: new Date(),
            type: "text",
            status: "sent",
            agentInfo: currentAgent
              ? {
                  name: currentAgent.name,
                  avatar: currentAgent.avatar,
                  role: currentAgent.role,
                }
              : undefined,
          })
        },
        2000 + Math.random() * 2000,
      )

      return () => clearTimeout(timer)
    }
  }, [messages])

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
    if (!isOpen && message.sender !== "user") {
      setUnreadCount((prev) => prev + 1)
    }
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
      status: "sending",
    }

    addMessage(message)
    setNewMessage("")

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" as const } : msg)))
    }, 1000)
  }

  const handleQuickReply = (reply: string) => {
    setNewMessage(reply)
    setTimeout(() => sendMessage(), 100)
  }

  const selectAgent = (agent: ChatAgent) => {
    setCurrentAgent(agent)
    setShowAgentSelection(false)
    addMessage({
      id: Date.now().toString(),
      content: `You're now connected with ${agent.name}, ${agent.role}. How can I help you today?`,
      sender: "agent",
      timestamp: new Date(),
      type: "text",
      status: "sent",
      agentInfo: {
        name: agent.name,
        avatar: agent.avatar,
        role: agent.role,
      },
    })
  }

  const endChat = () => {
    setChatStatus("ended")
    addMessage({
      id: Date.now().toString(),
      content: "Chat session ended. Thank you for contacting us! Please rate your experience.",
      sender: "system",
      timestamp: new Date(),
      type: "system",
      status: "sent",
    })
  }

  const submitRating = (rating: number) => {
    setSatisfaction(rating)
    toast.success("Thank you for your feedback!")
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "sent":
      case "delivered":
        return <CheckCircle className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCircle className="h-3 w-3 text-accent" />
      default:
        return null
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg premium-button relative"
          >
            <MessageCircle className="h-6 w-6" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "600px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn("bg-background border shadow-2xl rounded-lg overflow-hidden", isMinimized ? "w-80" : "w-96")}
          >
            {/* Chat Header */}
            <CardHeader className="p-4 bg-accent/5 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {currentAgent ? (
                    <>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentAgent.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{currentAgent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm">{currentAgent.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              currentAgent.status === "online"
                                ? "bg-green-500"
                                : currentAgent.status === "busy"
                                  ? "bg-yellow-500"
                                  : currentAgent.status === "away"
                                    ? "bg-orange-500"
                                    : "bg-gray-500",
                            )}
                          />
                          <span className="text-xs text-muted-foreground">
                            {currentAgent.status} • {currentAgent.responseTime}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">Support Chat</CardTitle>
                        <span className="text-xs text-muted-foreground">AI Assistant</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setShowAgentSelection(true)} className="h-8 w-8 p-0">
                    <User className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <>
                {/* Agent Selection Modal */}
                <AnimatePresence>
                  {showAgentSelection && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-background z-10"
                    >
                      <CardHeader className="p-4 border-b">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Choose an Agent</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAgentSelection(false)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3 max-h-96 overflow-y-auto">
                        {sampleAgents.map((agent) => (
                          <motion.div
                            key={agent.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => selectAgent(agent)}
                            className="p-3 border rounded-lg cursor-pointer hover:bg-accent/5 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">{agent.name}</h4>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">{agent.rating}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">{agent.role}</p>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={cn(
                                      "w-2 h-2 rounded-full",
                                      agent.status === "online"
                                        ? "bg-green-500"
                                        : agent.status === "busy"
                                          ? "bg-yellow-500"
                                          : agent.status === "away"
                                            ? "bg-orange-500"
                                            : "bg-gray-500",
                                    )}
                                  />
                                  <span className="text-xs text-muted-foreground">
                                    {agent.status} • {agent.responseTime}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {agent.specialties.slice(0, 2).map((specialty, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Messages */}
                <CardContent className="p-0 h-96 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex gap-3", message.sender === "user" ? "justify-end" : "justify-start")}
                      >
                        {message.sender !== "user" && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            {message.sender === "agent" && message.agentInfo ? (
                              <>
                                <AvatarImage src={message.agentInfo.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{message.agentInfo.name.charAt(0)}</AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarFallback>
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </>
                            )}
                          </Avatar>
                        )}

                        <div className={cn("max-w-[80%] space-y-1", message.sender === "user" && "items-end")}>
                          <div
                            className={cn(
                              "rounded-lg px-3 py-2 text-sm",
                              message.sender === "user"
                                ? "bg-accent text-accent-foreground ml-auto"
                                : message.type === "system"
                                  ? "bg-muted text-muted-foreground text-center"
                                  : "bg-muted",
                            )}
                          >
                            {message.content}
                          </div>
                          <div
                            className={cn(
                              "flex items-center gap-1 text-xs text-muted-foreground",
                              message.sender === "user" ? "justify-end" : "justify-start",
                            )}
                          >
                            <span>{formatTime(message.timestamp)}</span>
                            {message.sender === "user" && getStatusIcon(message.status)}
                          </div>
                        </div>

                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          {currentAgent ? (
                            <>
                              <AvatarImage src={currentAgent.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{currentAgent.name.charAt(0)}</AvatarFallback>
                            </>
                          ) : (
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* Quick Replies */}
                {messages.length <= 4 && (
                  <div className="p-4 border-t bg-muted/20">
                    <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.slice(0, 3).map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs h-7"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Satisfaction Rating */}
                {chatStatus === "ended" && satisfaction === null && (
                  <div className="p-4 border-t bg-muted/20">
                    <p className="text-sm font-medium mb-2">How was your experience?</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button
                          key={rating}
                          variant="ghost"
                          size="sm"
                          onClick={() => submitRating(rating)}
                          className="h-8 w-8 p-0"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Input */}
                {chatStatus !== "ended" && (
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          ref={inputRef}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          className="pr-20"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Paperclip className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Smile className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button onClick={sendMessage} disabled={!newMessage.trim()} size="sm" className="premium-button">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
