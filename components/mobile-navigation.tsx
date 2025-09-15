"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Search, Home, Package, Heart, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, dispatch } = useCart()
  const isMobile = useMobile()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Products", href: "/products", icon: <Package className="h-4 w-4" /> },
    { name: "Wishlist", href: "/wishlist", icon: <Heart className="h-4 w-4" /> },
    { name: "Account", href: "/account", icon: <User className="h-4 w-4" /> },
  ]

  if (!isMobile) return null

  return (
    <>
      {/* Mobile Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50 lg:hidden">
        <div className="px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xs">V</span>
            </div>
            <span className="font-bold text-lg text-foreground">VERTEX</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9"
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
            >
              <ShoppingCart className="h-4 w-4" />
              <AnimatePresence>
                {state.itemCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {state.itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border/50 lg:hidden">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              {item.icon}
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}