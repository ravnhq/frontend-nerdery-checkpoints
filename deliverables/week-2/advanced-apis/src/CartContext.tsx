import React, { createContext, useContext, useMemo, useReducer } from 'react'
import {
  cartReducer,
  type CartState,
  initialCart,
  selectTotal,
} from './cartReducer'

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartApi | null>(null)

export function CartProvider({
  children,
}: {
  readonly children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(cartReducer, initialCart)

  const total = selectTotal(state)

  const value = useMemo<CartApi>(
    () => ({
      state,
      total,
      add: (item) =>
        dispatch({
          type: 'add',
          item,
        }),
      remove: (id) =>
        dispatch({
          type: 'remove',
          id,
        }),
      setQty: (id, qty) =>
        dispatch({
          type: 'setQty',
          id,
          qty,
        }),
      clear: () =>
        dispatch({
          type: 'clear',
        }),
    }),
    [state, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartApi {
  const value = useContext(CartContext)
  if (!value) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return value
}
