"use client"

import { useState, useEffect } from "react"
import { OptimizedProductViewer } from "@/components/optimized-3d-viewer"
import { LazyLoad } from "@/components/lazy-loading"
import { ProductReviews } from "@/components/product-reviews"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ShoppingCart, Heart, Share2, Star, MessageCircle, Info, Truck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface ProductVariant {
  id: string
  name: string
  color: string
  price: number
  image?: string
  modelUrl?: string
}

interface ProductOption {
  id: string
  name: string
  type: "color" | "material" | "size" | "storage"
  variants: ProductVariant[]
}

interface ProductConfig {
  id: string
  name: string
  basePrice: number
  description: string
  options: ProductOption[]
  features: string[]
}

interface Hotspot {
  id: string
  position: [number, number, number]
  title: string
  description: string
  feature?: string
  price?: number
}

interface ProductConfiguratorProps {
  productId?: string
}

const sampleProduct: ProductConfig = {
  id: "premium-device-pro",
  name: "Premium Device Pro",
  basePrice: 999,
  description:
    "Experience the future of technology with our flagship device featuring cutting-edge design and unmatched performance.",
  features: [
    "Advanced Neural Processing",
    "All-Day Battery Life",
    "Premium Materials",
    "Wireless Charging",
    "Water Resistant",
    "5G Connectivity",
  ],
  options: [
    {
      id: "color",
      name: "Color",
      type: "color",
      variants: [
        { id: "midnight", name: "Midnight Black", color: "#1a1a1a", price: 0 },
        { id: "silver", name: "Silver", color: "#c0c0c0", price: 0 },
        { id: "gold", name: "Gold", color: "#ffd700", price: 0 },
        { id: "purple", name: "Deep Purple", color: "#8b5cf6", price: 0 },
        { id: "blue", name: "Ocean Blue", color: "#3b82f6", price: 0 },
      ],
    },
    {
      id: "storage",
      name: "Storage",
      type: "storage",
      variants: [
        { id: "128gb", name: "128GB", color: "", price: 0 },
        { id: "256gb", name: "256GB", color: "", price: 200 },
        { id: "512gb", name: "512GB", color: "", price: 400 },
        { id: "1tb", name: "1TB", color: "", price: 800 },
      ],
    },
    {
      id: "material",
      name: "Material",
      type: "material",
      variants: [
        { id: "aluminum", name: "Aluminum", color: "", price: 0 },
        { id: "titanium", name: "Titanium", color: "", price: 300 },
        { id: "ceramic", name: "Ceramic", color: "", price: 500 },
      ],
    },
  ],
}

// Sample hotspots for the product
const productHotspots: Hotspot[] = [
  {
    id: "camera",
    position: [0.5, 0.8, 0.2] as [number, number, number],
    title: "Advanced Camera System",
    description: "Triple-lens camera with AI-powered photography and 8K video recording",
    feature: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
    price: 200,
  },
  {
    id: "display",
    position: [0, 0.3, 0.6] as [number, number, number],
    title: "Premium Display",
    description: "6.7-inch Super Retina XDR display with ProMotion technology",
    feature: "120Hz Refresh Rate, HDR10+",
  },
  {
    id: "processor",
    position: [0, -0.2, 0.1] as [number, number, number],
    title: "Neural Engine",
    description: "Next-generation chip with advanced machine learning capabilities",
    feature: "16-core Neural Engine",
  },
  {
    id: "battery",
    position: [0, -0.5, 0.2] as [number, number, number],
    title: "All-Day Battery",
    description: "Up to 28 hours of video playback with fast wireless charging",
    feature: "MagSafe Compatible",
  },
]

export function ProductConfigurator({ productId }: ProductConfiguratorProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    color: "midnight",
    storage: "128gb",
    material: "aluminum",
  })
  const [currentPrice, setCurrentPrice] = useState(sampleProduct.basePrice)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()
  const isMobile = useMobile()

  // Calculate total price based on selected options
  useEffect(() => {
    let totalPrice = sampleProduct.basePrice

    sampleProduct.options.forEach((option) => {
      const selectedVariantId = selectedOptions[option.id]
      const selectedVariant = option.variants.find((v) => v.id === selectedVariantId)
      if (selectedVariant) {
        totalPrice += selectedVariant.price
      }
    })

    setCurrentPrice(totalPrice)
  }, [selectedOptions])

  const handleOptionSelect = (optionId: string, variantId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: variantId,
    }))
  }

  const getSelectedVariant = (optionId: string) => {
    const option = sampleProduct.options.find((opt) => opt.id === optionId)
    const selectedVariantId = selectedOptions[option.id]
    return option?.variants.find((v) => v.id === selectedVariantId)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const addToCart = () => {
    const selectedVariants = sampleProduct.options.reduce(
      (acc, option) => {
        const selectedVariantId = selectedOptions[option.id]
        const selectedVariant = option.variants.find((v) => v.id === selectedVariantId)
        if (selectedVariant) {
          acc[option.id] = selectedVariant.name
        }
        return acc
      },
      {} as Record<string, string>,
    )

    const optionsPricing = sampleProduct.options.reduce(
      (acc, option) => {
        const selectedVariantId = selectedOptions[option.id]
        const selectedVariant = option.variants.find((v) => v.id === selectedVariantId)
        if (selectedVariant) {
          acc[option.id] = selectedVariant.price
        }
        return acc
      },
      {} as Record<string, number>,
    )

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: sampleProduct.id,
        name: sampleProduct.name,
        price: sampleProduct.basePrice,
        selectedOptions: selectedVariants,
        optionsPricing,
      },
    })

    dispatch({ type: "OPEN_CART" })

    // Show success toast
    toast.success("Added to cart!", {
      description: `${sampleProduct.name} has been added to your cart.`,
    })
  }

  const currentProduct = productId ? /* Fetch product based on productId */ sampleProduct : sampleProduct

  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", isMobile ? "py-4" : "py-8")}>
      <div className={cn("grid gap-12", isMobile ? "grid-cols-1 gap-6" : "lg:grid-cols-2")}>
        {/* 3D Product Viewer */}
        <div className="space-y-6">
          <LazyLoad>
            <OptimizedProductViewer
              productName={currentProduct.name}
              selectedColor={selectedOptions.color}
              selectedMaterial={selectedOptions.material}
              hotspots={productHotspots}
              className="shadow-2xl"
              enablePerformanceMode={isMobile}
            />
          </LazyLoad>

          {/* Product Gallery Thumbnails */}
          {!isMobile && (
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  className="w-16 h-16 rounded-lg bg-card border-2 border-transparent hover:border-accent transition-colors duration-200 flex items-center justify-center text-xs text-muted-foreground"
                >
                  View {index}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Configuration */}
        <div className={cn("space-y-8", isMobile && "space-y-6")}>
          {/* Product Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                New
              </Badge>
              <Badge variant="outline">Premium</Badge>
            </div>

            <h1 className={cn("font-bold text-foreground", isMobile ? "text-2xl" : "text-3xl")}>
              {currentProduct.name}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.7</span>
                <span className="text-sm text-muted-foreground">(127 reviews)</span>
              </div>
              <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                <MessageCircle className="h-4 w-4 mr-1" />
                Read Reviews
              </Button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={cn("font-bold text-foreground", isMobile ? "text-2xl" : "text-3xl")}>
                {formatPrice(currentPrice)}
              </span>
              {currentPrice > currentProduct.basePrice && (
                <span className={cn("text-muted-foreground line-through", isMobile ? "text-base" : "text-lg")}>
                  {formatPrice(currentProduct.basePrice)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{currentProduct.description}</p>
          </div>

          {/* Configuration Options */}
          <div className={cn("space-y-6", isMobile && "space-y-4")}>
            {currentProduct.options.map((option) => (
              <Card key={option.id}>
                <CardHeader className="pb-3">
                  <CardTitle className={cn("flex items-center justify-between", isMobile ? "text-base" : "text-lg")}>
                    {option.name}
                    {option.type === "color" && (
                      <div
                        className="w-6 h-6 rounded-full border-2 border-border"
                        style={{ backgroundColor: getSelectedVariant(option.id)?.color }}
                      />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className={cn("grid gap-3", isMobile ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3")}>
                    {option.variants.map((variant) => {
                      const isSelected = selectedOptions[option.id] === variant.id

                      return (
                        <button
                          key={variant.id}
                          onClick={() => handleOptionSelect(option.id, variant.id)}
                          className={cn(
                            "relative p-3 rounded-lg border-2 transition-all duration-200 text-left",
                            isSelected
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/50 hover:bg-accent/5",
                          )}
                        >
                          {option.type === "color" && (
                            <div
                              className="w-8 h-8 rounded-full border-2 border-border mb-2"
                              style={{ backgroundColor: variant.color }}
                            />
                          )}

                          <div className="space-y-1">
                            <div className="font-medium text-sm text-foreground">{variant.name}</div>
                            {variant.price > 0 && (
                              <div className="text-xs text-muted-foreground">+{formatPrice(variant.price)}</div>
                            )}
                          </div>

                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-accent-foreground" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className={cn(isMobile ? "text-base" : "text-lg")}>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-2")}>
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-4">
            <motion.div whileHover={{ scale: isMobile ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="w-full premium-button group" onClick={addToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - {formatPrice(currentPrice)}
              </Button>
            </motion.div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 premium-button bg-transparent"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={cn("w-4 h-4 mr-2", isWishlisted && "fill-current text-red-500")} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>

              <Button variant="outline" size="lg" className="premium-button bg-transparent">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Delivery Info */}
          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Free Delivery</span>
                  <span className="font-medium text-foreground">2-3 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Express Delivery</span>
                  <span className="font-medium text-foreground">Next Day (+$29)</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return Policy</span>
                  <span className="font-medium text-foreground">30 Days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Reviews (127)
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping
            </TabsTrigger>
            <TabsTrigger value="specs" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Specifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentProduct.description} This premium device represents the pinnacle of modern technology,
                    combining cutting-edge innovation with timeless design. Every component has been carefully selected
                    and crafted to deliver an unparalleled user experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">What's in the Box</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Premium Device Pro</li>
                    <li>• USB-C to Lightning Cable</li>
                    <li>• 20W USB-C Power Adapter</li>
                    <li>• Documentation</li>
                    <li>• Premium Carrying Case</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <ProductReviews productId={currentProduct.id} />
          </TabsContent>

          <TabsContent value="shipping" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Delivery Options</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Standard Delivery</div>
                          <div className="text-sm text-muted-foreground">2-3 business days</div>
                        </div>
                        <div className="font-semibold text-green-600">Free</div>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Express Delivery</div>
                          <div className="text-sm text-muted-foreground">Next business day</div>
                        </div>
                        <div className="font-semibold">$29</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Return Policy</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• 30-day return window</p>
                      <p>• Free return shipping</p>
                      <p>• Full refund guarantee</p>
                      <p>• Original packaging required</p>
                      <p>• No restocking fees</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Display</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>6.7-inch Super Retina XDR display</p>
                        <p>2796 x 1290 pixel resolution at 460 ppi</p>
                        <p>ProMotion technology with 120Hz refresh rate</p>
                        <p>HDR10 and Dolby Vision support</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Camera System</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>48MP Main camera with f/1.78 aperture</p>
                        <p>12MP Ultra Wide camera with f/2.2 aperture</p>
                        <p>12MP Telephoto camera with f/2.8 aperture</p>
                        <p>5x optical zoom range</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Performance</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>A17 Pro chip with 6-core CPU</p>
                        <p>6-core GPU with hardware-accelerated ray tracing</p>
                        <p>16-core Neural Engine</p>
                        <p>8GB unified memory</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Connectivity</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>5G (sub-6 GHz and mmWave)</p>
                        <p>Wi-Fi 6E (802.11ax)</p>
                        <p>Bluetooth 5.3</p>
                        <p>USB-C connector</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
