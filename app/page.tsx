"use client"

import dynamic from 'next/dynamic'
import { AnimatedHero } from "@/components/animated-hero"
import { FeaturedProductSection } from "@/components/FeaturedProductSection"
import { AppleFeatures } from "@/components/apple-features"
import { LazyLoad } from "@/components/lazy-loading"
import { SceneLoader } from "@/components/SceneLoader"

const DroneScene = dynamic(
  () => import('@/components/DroneScene').then((mod) => mod.DroneScene),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
)

const KeyboardScene = dynamic(
  () => import('@/components/KeyboardScene').then((mod) => mod.KeyboardScene),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
)

const HeadphoneScene = dynamic(
  () => import('@/components/HeadphoneScene').then((mod) => mod.HeadphoneScene),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <AnimatedHero />

      <LazyLoad>
        <FeaturedProductSection
          title={
            <>
              Engineered for the<br />
              <span className="text-accent">Perfect Shot</span>
            </>
          }
          description="Capture breathtaking cinematic footage with our professional-grade drone, featuring a 3-axis gimbal, carbon fiber body, and unparalleled stability."
          productLink="/product/cinematic-drone"
          reverseLayout={false}
        >
          <DroneScene className="h-full w-full" />
        </FeaturedProductSection>
      </LazyLoad>
      
      <LazyLoad>
        <FeaturedProductSection
          title={
            <>
              Designed for Feel,<br />
              <span className="text-accent">Built to Last</span>
            </>
          }
          description="Experience the ultimate typing satisfaction. Our modular mechanical keyboard features a frosted polycarbonate case, hot-swappable switches, and fully customizable keycaps."
          productLink="/product/modular-keyboard"
          reverseLayout={true}
        >
          <KeyboardScene className="h-full w-full" />
        </FeaturedProductSection>
      </LazyLoad>

      <LazyLoad>
        <FeaturedProductSection
          title={
            <>
              Immerse Yourself<br />
              <span className="text-accent">in Pure Sound</span>
            </>
          }
          description="Discover unparalleled audio clarity and comfort. Our premium wireless headphones are crafted with anodized aluminum, plush leather, and high-fidelity drivers."
          productLink="/product/wireless-headphones"
          reverseLayout={false}
        >
          <HeadphoneScene className="h-full w-full" />
        </FeaturedProductSection>
      </LazyLoad>

      <LazyLoad>
        <AppleFeatures />
      </LazyLoad>
    </div>
  )
}