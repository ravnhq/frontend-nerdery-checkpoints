import React, { createContext, useContext, useReducer } from 'react';
import { CartAction, cartReducer, type CartState, initialCart, selectTotal } from './cartReducer';

type CartContextType = {
  state: CartState
  dispatch: React.ActionDispatch<[_action: CartAction]>
}

export const CartContext = createContext<CartContextType | null>(null);

export interface CartApi {
  state: CartState
  total: number
  add: (item: { id: string; name: string; price: number }) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');

  const total = selectTotal(context.state);

  return {
    state: context.state,
    total,
    add: (item) => context.dispatch({ type: 'add', item }),
    remove: (id) => context.dispatch({ type: 'remove', id }),
    setQty: (id, qty) => context.dispatch({ type: 'setQty', id, qty }),
    clear: () => context.dispatch({ type: 'clear' }),
  };
}