import React, { useReducer } from 'react'
import { type CartState, initialCart, cartReducer, selectTotal } from './cartReducer'

export const cartContext = React.createContext<CartApi | null>(null)

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart)
  const total = selectTotal(state)
  const value: CartApi = {
    state,
    total,
    add: item => {dispatch({type: 'add', item})},
    remove: id => {dispatch({type: 'remove', id})},
    setQty: (id, qty) => {dispatch({type: 'setQty', id, qty})},
    clear: () => {dispatch({type: 'clear'})}
  }


  return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}

export function useCart(): CartApi {
  const context = React.use(cartContext)
  if(!context){
    throw new Error('userCart must be used inside CartProvider')
  }
  return context
}
