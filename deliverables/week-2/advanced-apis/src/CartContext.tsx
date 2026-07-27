import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { cartReducer, initialCart, selectTotal, type CartState } from './cartReducer'

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  adjustQty: (id: string, delta: number) => void
  clear: () => void
}

const CartContext = createContext<CartApi | null>(null)

const STORAGE_KEY = 'shopping-cart-items'

function hydrateCart(): CartState {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    try {
      return JSON.parse(stored) as CartState
    } catch (e) {
      console.error('CartProvider: failed to parse persisted cart:', e)
    }
  }
  return initialCart
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, hydrateCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error('CartProvider: failed to persist cart:', e)
    }
  }, [state])

  const value: CartApi = useMemo(() => ({
    state,
    total: selectTotal(state),
    add: (item) => dispatch({ type: 'add', item }),
    remove: (id) => dispatch({ type: 'remove', id }),
    setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
    adjustQty: (id, delta) => dispatch({ type: 'adjustQty', id, delta }),
    clear: () => dispatch({ type: 'clear' }),
  }), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartApi {
  const value = useContext(CartContext)
  if (value === null) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return value
}
