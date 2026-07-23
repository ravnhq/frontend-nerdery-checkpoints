import { createContext, useContext, useReducer, useMemo, type ReactNode } from 'react'
import { type CartState, type Product, initialCart, cartReducer, selectTotal } from './cartReducer'

// interfaz que define todo lo que el contexto expone a los componentes
export interface CartApi {
  state: CartState
  total: number
  add: (item: Product) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

// creo el contexto con null, despues valido en el hook
const CartContext = createContext<CartApi | null>(null)

// provider que envuelve la app y le da acceso al carrito a todos los hijos
export function CartProvider({ children }: { children: ReactNode }) {
  // useReducer en vez de useState porque el state del carrito es complejo
  const [state, dispatch] = useReducer(cartReducer, initialCart)
  const total = selectTotal(state)

  // uso useMemo para no recrear el objeto api en cada render innecesariamente
  // las funciones adentro solo hacen dispatch con la accion correcta
  const api = useMemo<CartApi>(
    () => ({
      state,
      total,
      add: (item) => dispatch({ type: 'add', item }),
      remove: (id) => dispatch({ type: 'remove', id }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [state, total],
  )

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

// hook para usar el carrito desde cualquier componente
// si no esta dentro de CartProvider, tira error para avisarte
export function useCart(): CartApi {
  const value = useContext(CartContext)
  if (value === null) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return value
}
