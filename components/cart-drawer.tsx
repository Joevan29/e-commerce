"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function CartDrawer() {
  const { state, dispatch } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const getItemTotal = (item: any) => {
    const optionsTotal = Object.values(item.optionsPricing).reduce((a: number, b: number) => a + b, 0)
    return (item.price + optionsTotal) * item.quantity
  }

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch({ type: "CLOSE_CART" })}
          />

          {/* Cart Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">Shopping Cart ({state.itemCount})</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="hover:bg-accent/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">Add some products to get started</p>
                  <Button onClick={() => dispatch({ type: "CLOSE_CART" })}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {state.items.map((item) => (
                      <motion.div
                        key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              {/* Product Image */}
                              <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center border">
                                <div className="w-8 h-8 bg-accent/20 rounded" />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                                    <div className="text-xs text-muted-foreground space-y-1">
                                      {Object.entries(item.selectedOptions).map(([key, value]) => (
                                        <div key={key}>
                                          {key}: {value}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>

                                {/* Quantity and Price */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-6 w-6 bg-transparent"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-6 w-6 bg-transparent"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <div className="text-sm font-semibold text-foreground">
                                    {formatPrice(getItemTotal(item))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">{formatPrice(state.total)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/checkout">
                    <Button
                      className="w-full premium-button"
                      size="lg"
                      onClick={() => dispatch({ type: "CLOSE_CART" })}
                    >
                      Checkout
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => dispatch({ type: "CLOSE_CART" })}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
