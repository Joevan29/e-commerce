"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  Truck,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Globe,
  Headphones,
} from "lucide-react"

const supportChannels = [
  {
    id: 1,
    name: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    availability: "24/7",
    responseTime: "< 2 minutes",
    color: "bg-green-500",
  },
  {
    id: 2,
    name: "Phone Support",
    description: "Speak directly with our experts",
    icon: Phone,
    availability: "Mon-Fri 9AM-6PM EST",
    responseTime: "Immediate",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Email Support",
    description: "Detailed assistance via email",
    icon: Mail,
    availability: "24/7",
    responseTime: "< 4 hours",
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Video Call",
    description: "Face-to-face consultation",
    icon: Headphones,
    availability: "By Appointment",
    responseTime: "Same Day",
    color: "bg-orange-500",
  },
]

const faqCategories = [
  {
    name: "Orders & Shipping",
    icon: Truck,
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3-5 business days within the US. International shipping varies by location, typically 7-14 business days. We offer expedited shipping options for faster delivery.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard.",
      },
      {
        question: "What if my item arrives damaged?",
        answer:
          "We package all items with premium protection. If your item arrives damaged, contact us within 48 hours with photos, and we'll arrange a replacement or full refund immediately.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. All international orders include tracking and insurance.",
      },
    ],
  },
  {
    name: "Authentication & Security",
    icon: Shield,
    questions: [
      {
        question: "How do you authenticate items?",
        answer:
          "Every item undergoes rigorous authentication by certified experts using advanced technology including quantum verification, UV analysis, and blockchain certification.",
      },
      {
        question: "What if an item fails authentication?",
        answer:
          "If any item fails our authentication process, we provide a full refund plus compensation for your time. We also report counterfeit items to relevant authorities.",
      },
      {
        question: "Can I get a certificate of authenticity?",
        answer:
          "Yes, every premium item comes with a digital certificate of authenticity stored on the blockchain, plus a physical certificate for items over $500.",
      },
      {
        question: "How secure is my personal information?",
        answer:
          "We use military-grade encryption and comply with all international privacy standards. Your data is never shared with third parties without explicit consent.",
      },
    ],
  },
  {
    name: "Payments & Returns",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and cryptocurrency. All transactions are secured with 256-bit SSL encryption.",
      },
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for most items. Items must be in original condition. Premium items over $1000 have a 14-day return window due to their exclusive nature.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Refunds are processed within 2-3 business days after we receive the returned item. The refund will appear on your original payment method within 5-7 business days.",
      },
      {
        question: "Are there any return fees?",
        answer:
          "Returns due to defects or our error are free. Customer-initiated returns may incur a 10% restocking fee for items over $500 to cover authentication and handling costs.",
      },
    ],
  },
  {
    name: "Account & Technical",
    icon: HelpCircle,
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' in the top right corner, provide your email and create a password. You'll receive a verification email to activate your account.",
      },
      {
        question: "I forgot my password, what do I do?",
        answer:
          "Click 'Forgot Password' on the login page, enter your email, and we'll send you a secure reset link. The link expires in 24 hours for security.",
      },
      {
        question: "How do I use the 3D viewer?",
        answer:
          "Our 3D viewer works on all modern browsers. Click and drag to rotate, scroll to zoom, and use the controls to change materials or colors. No plugins required!",
      },
      {
        question: "Can I save items to a wishlist?",
        answer:
          "Yes! Click the heart icon on any item to add it to your wishlist. You can access your wishlist from your account dashboard and share it with others.",
      },
    ],
  },
]

const supportStats = [
  { label: "Customer Satisfaction", value: "99.8%", icon: Star },
  { label: "Average Response Time", value: "< 2 min", icon: Clock },
  { label: "Support Languages", value: "12", icon: Globe },
  { label: "Support Agents", value: "50+", icon: Users },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Orders & Shipping")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  })

  const selectedCategoryData = faqCategories.find((cat) => cat.name === selectedCategory)

  const filteredQuestions =
    selectedCategoryData?.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
  }

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
            <Badge className="mb-6 bg-accent text-accent-foreground text-lg px-6 py-2">Premium Support</Badge>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              We're Here to Help
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get expert assistance from our dedicated support team. Whether you need help with orders, authentication,
              or technical questions, we're available 24/7.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              {supportStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary mr-2" />
                    <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Support Channel</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple ways to get the help you need, when you need it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-full ${channel.color} text-white mb-4`}>
                      <channel.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Availability:</span>
                        <span className="font-medium">{channel.availability}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Response:</span>
                        <span className="font-medium">{channel.responseTime}</span>
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Start {channel.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about our products and services
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {faqCategories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="transition-all duration-200"
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            {filteredQuestions.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="mb-4 overflow-hidden">
                  <button
                    className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                      {expandedFAQ === index ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No questions found matching your search.</p>
                <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-muted-foreground">
                Can't find what you're looking for? Send us a message and we'll get back to you quickly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-6">Send us a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@premiumcollectibles.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-muted-foreground">24/7 Live Chat & Email</p>
                        <p className="text-sm text-muted-foreground">Phone: Mon-Fri 9AM-6PM EST</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Premium Support Benefits</h3>
                  <div className="space-y-3">
                    {[
                      "Priority response within 2 minutes",
                      "Dedicated account manager for VIP customers",
                      "Free authentication consultations",
                      "Exclusive access to expert collectors",
                      "White-glove delivery service",
                      "24/7 technical support",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
