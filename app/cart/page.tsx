"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch, setPlants } = useCart()

  const handleIncreaseQuantity = (plantId: string, currentQuantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", plantId, quantity: currentQuantity + 1 })
  }

  const handleDecreaseQuantity = (plantId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch({ type: "UPDATE_QUANTITY", plantId, quantity: currentQuantity - 1 })
    } else {
      handleRemoveItem(plantId)
    }
  }

  const handleRemoveItem = (plantId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", plantId })
    // Update plants state to mark as not in cart
    setPlants((prevPlants) => prevPlants.map((p) => (p.id === plantId ? { ...p, inCart: false } : p)))
  }

  const handleCheckout = () => {
    alert("Coming Soon! Checkout functionality will be available soon.")
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4 font-sans">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8 font-serif">
              Looks like you haven't added any plants to your cart yet.
            </p>
            <Link href="/products">
              <Button size="lg" className="font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-sans">Shopping Cart</h1>
          <p className="text-muted-foreground font-serif">Review your selected plants before checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Plant Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    </div>

                    {/* Plant Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-card-foreground font-sans">{item.name}</h3>
                      <p className="text-sm text-muted-foreground font-serif">{item.category}</p>
                      <p className="text-lg font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-8 text-center font-semibold">{item.quantity}</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-4 font-sans">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-serif">Total Items:</span>
                    <span className="font-semibold">{state.totalItems}</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span className="font-sans">Total Cost:</span>
                    <span className="text-primary">${state.totalCost.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleCheckout} className="w-full font-semibold" size="lg">
                    Checkout - Coming Soon
                  </Button>

                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full font-semibold bg-transparent" size="lg">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
