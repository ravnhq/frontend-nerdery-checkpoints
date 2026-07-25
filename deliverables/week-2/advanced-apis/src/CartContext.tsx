import React, { createContext, useContext } from 'react'
import { useReducer } from 'react'
import { cartReducer, type CartState, initialCart, selectTotal } from './cartReducer'

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}
const CartContext = createContext<CartApi | null>(null)
// STUB: provider just renders children.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart)
  const total = selectTotal(state)
  const add = (item: { id: string; name: string; price: number }) => {
    dispatch({ type: 'add', item })
  }
  const remove = (id: string) => {
    dispatch({ type: 'remove', id })
  }
  const setQty = (id: string, qty: number) => {
    dispatch({ type: 'setQty', id, qty })
  }
  const clear = () => {
    dispatch({ type: 'clear' })
  }
  return (
    <CartContext.Provider value={{ state, total, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>)
}

// STUB: returns a dummy that does NOT throw and never updates, so the
// context + integration tests fail (RED).
export function useCart(): CartApi {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within a CartProvider')
  return value
}
