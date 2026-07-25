export interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'add'; item: { id: string; name: string; price: number } }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'clear' }

export const initialCart: CartState = { items: [] }

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find(item => item.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(item => item.id === action.item.id
            ? { ...item, qty: item.qty + 1 }
            : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, qty: 1 }]
      }
    }
    case 'remove': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)

      }
    }
    case 'setQty': {
      if (action.qty > 0) {
        return {
          ...state,
          items: state.items.map(item => item.id === action.id
            ? { ...item, qty: action.qty }
            : item
          )
        }
      }
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      }
    }
    case 'clear': {
      return {
        ...state,
        items: []
      }
    }

  }
  return state
}

export function selectTotal(state: CartState): number {
  return state.items.reduce((total, item) => total + (item.price * item.qty), 0)
}
