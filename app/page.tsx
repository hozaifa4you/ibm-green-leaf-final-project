import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Background Image */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(21, 128, 61, 0.3), rgba(21, 128, 61, 0.3)), url('/hero-plants.png')`,
        }}
      >
        <div className="absolute inset-0 bg-primary/20" />

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          {/* Company Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-sans">GreenLeaf</h1>

          {/* Company Paragraph */}
          <p className="text-xl md:text-2xl mb-8 font-serif leading-relaxed max-w-2xl mx-auto">
            Transform your space into a thriving green sanctuary. We curate the finest houseplants to bring nature's
            beauty and wellness benefits directly to your home. From beginner-friendly succulents to statement fiddle
            leaf figs, discover your perfect plant companion.
          </p>

          {/* Get Started Button */}
          <Link href="/products">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-sans">Expert Care Guides</h3>
              <p className="text-muted-foreground font-serif">
                Detailed care instructions for every plant to ensure your green friends thrive.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-sans">Safe Delivery</h3>
              <p className="text-muted-foreground font-serif">
                Carefully packaged and shipped to arrive healthy and ready to flourish.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-sans">Plant Parent Support</h3>
              <p className="text-muted-foreground font-serif">
                Join our community of plant lovers and get ongoing support for your plant journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
