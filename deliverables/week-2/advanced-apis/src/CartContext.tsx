import React from 'react'
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
  const [state, dispatch] = React.useReducer(cartReducer, initialCart)

  const api: CartApi = {
    state,
    total: selectTotal(state),
    add: (item) => dispatch({ type: 'add', item }),
    remove: (id) => dispatch({ type: 'remove', id }),
    setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
    clear: () => dispatch({ type: 'clear' }),
  }

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart(): CartApi {
  const context = React.use(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
