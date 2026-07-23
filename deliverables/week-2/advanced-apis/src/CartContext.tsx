import React, { useContext, useReducer } from 'react'
import { cartReducer, type CartState, initialCart, selectTotal } from './cartReducer'

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = React.createContext<CartApi | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart)
  function add(item: { id: string; name: string; price: number }) {
    dispatch({ type: 'add', item })
  }
  function remove(id: string) {
    dispatch({ type: 'remove', id })
  }
  function setQty(id: string, qty: number) {
    dispatch({ type: 'setQty', id, qty })
  }
  function clear() {
    dispatch({ type: 'clear' })
  }
  const total = selectTotal(state)
  return (
    <CartContext.Provider value={{ state, total, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartApi {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
