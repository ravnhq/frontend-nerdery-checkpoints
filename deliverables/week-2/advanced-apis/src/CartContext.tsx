import { createContext, use, useReducer, type ReactNode } from 'react'
import { cartReducer, initialCart, selectTotal, type CartState } from './cartReducer'

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartApi | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart)
  const total = selectTotal(state)

  const value: CartApi = {
    state,
    total,
    add: (item) => dispatch({ type: 'add', item }),
    remove: (id) => dispatch({ type: 'remove', id }),
    setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
    clear: () => dispatch({ type: 'clear' }),
  }

  return <CartContext value={value}>{children}</CartContext>
}

export function useCart(): CartApi {
  const context = use(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
