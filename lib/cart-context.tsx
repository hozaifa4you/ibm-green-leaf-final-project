"use client"

import React, { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Plant {
  id: string
  name: string
  price: number
  category: string
  image: string
  inCart: boolean
}

export interface CartItem extends Plant {
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalCost: number
}

type CartAction =
  | { type: "ADD_TO_CART"; plant: Plant }
  | { type: "REMOVE_FROM_CART"; plantId: string }
  | { type: "UPDATE_QUANTITY"; plantId: string; quantity: number }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  plants: Plant[]
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find((item) => item.id === action.plant.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.plant.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalCost: state.totalCost + action.plant.price,
        }
      } else {
        const newItem: CartItem = { ...action.plant, quantity: 1 }
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalCost: state.totalCost + action.plant.price,
        }
      }
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.items.find((item) => item.id === action.plantId)
      if (!itemToRemove) return state

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.plantId),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalCost: state.totalCost - itemToRemove.price * itemToRemove.quantity,
      }
    }

    case "UPDATE_QUANTITY": {
      const item = state.items.find((item) => item.id === action.plantId)
      if (!item) return state

      const quantityDiff = action.quantity - item.quantity

      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.plantId),
          totalItems: state.totalItems - item.quantity,
          totalCost: state.totalCost - item.price * item.quantity,
        }
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.plantId ? { ...item, quantity: action.quantity } : item,
      )

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalCost: state.totalCost + item.price * quantityDiff,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalCost: 0,
      }

    default:
      return state
  }
}

const initialPlants: Plant[] = [
  // Low Light Plants
  {
    id: "1",
    name: "Snake Plant",
    price: 29.99,
    category: "Low Light",
    image: "/placeholder.svg?height=300&width=300&text=Snake+Plant",
    inCart: false,
  },
  {
    id: "2",
    name: "ZZ Plant",
    price: 34.99,
    category: "Low Light",
    image: "/placeholder.svg?height=300&width=300&text=ZZ+Plant",
    inCart: false,
  },

  // Pet-Friendly Plants
  {
    id: "3",
    name: "Spider Plant",
    price: 19.99,
    category: "Pet-Friendly",
    image: "/placeholder.svg?height=300&width=300&text=Spider+Plant",
    inCart: false,
  },
  {
    id: "4",
    name: "Boston Fern",
    price: 24.99,
    category: "Pet-Friendly",
    image: "/placeholder.svg?height=300&width=300&text=Boston+Fern",
    inCart: false,
  },

  // Statement Plants
  {
    id: "5",
    name: "Fiddle Leaf Fig",
    price: 89.99,
    category: "Statement",
    image: "/placeholder.svg?height=300&width=300&text=Fiddle+Leaf+Fig",
    inCart: false,
  },
  {
    id: "6",
    name: "Monstera Deliciosa",
    price: 59.99,
    category: "Statement",
    image: "/placeholder.svg?height=300&width=300&text=Monstera+Deliciosa",
    inCart: false,
  },
]

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalCost: 0,
  })

  const [plants, setPlants] = React.useState<Plant[]>(initialPlants)

  return <CartContext.Provider value={{ state, dispatch, plants, setPlants }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
