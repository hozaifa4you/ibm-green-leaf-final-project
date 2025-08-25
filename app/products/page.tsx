"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export default function ProductsPage() {
  const { state, dispatch, plants, setPlants } = useCart()

  const handleAddToCart = (plant: any) => {
    // Add to cart
    dispatch({ type: "ADD_TO_CART", plant })

    // Mark plant as in cart
    setPlants((prevPlants) => prevPlants.map((p) => (p.id === plant.id ? { ...p, inCart: true } : p)))
  }

  const categories = ["Low Light", "Pet-Friendly", "Statement"]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">Our Plant Collection</h1>
          <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
            Discover the perfect plants for your space. Each one carefully selected for quality and beauty.
          </p>
        </div>

        {/* Product Categories */}
        {categories.map((category) => {
          const categoryPlants = plants.filter((plant) => plant.category === category)

          return (
            <div key={category} className="mb-16">
              <h2 className="text-2xl font-semibold text-foreground mb-6 font-sans">{category} Plants</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPlants.map((plant) => (
                  <Card key={plant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-square relative">
                        <Image src={plant.image || "/placeholder.svg"} alt={plant.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-card-foreground mb-2 font-sans">{plant.name}</h3>
                        <p className="text-2xl font-bold text-primary">${plant.price.toFixed(2)}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        onClick={() => handleAddToCart(plant)}
                        disabled={plant.inCart}
                        className="w-full"
                        variant={plant.inCart ? "secondary" : "default"}
                      >
                        {plant.inCart ? "Added to Cart" : "Add to Cart"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </main>
    </div>
  )
}
