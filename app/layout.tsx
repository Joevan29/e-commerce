import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"
import { Navigation } from "@/components/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Footer } from "@/components/footer"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Premium 3D E-commerce - Experience the Future of Tech",
  description: "Discover cutting-edge products with interactive 3D visualization and premium shopping experience",
  generator: "v0.app",
  keywords: ["3D", "e-commerce", "premium", "technology", "interactive"],
  authors: [{ name: "Premium 3D" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#8b5cf6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <CartProvider>
          <Suspense fallback={null}>
            <Navigation />
            <MobileNavigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Suspense>
          <CartDrawer />
          <Toaster />
          {process.env.NODE_ENV === "development" && <PerformanceMonitor />}
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
