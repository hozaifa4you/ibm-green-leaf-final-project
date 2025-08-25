"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const { state } = useCart()

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary font-sans">GreenLeaf</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-serif">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors font-serif">
              Products
            </Link>
          </nav>

          {/* Shopping Cart */}
          <Link href="/cart">
            <Button variant="outline" size="sm" className="relative bg-transparent">
              <ShoppingCart className="h-5 w-5" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {state.totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart with {state.totalItems} items</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
