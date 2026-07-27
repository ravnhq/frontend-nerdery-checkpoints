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
  | { type: 'adjustQty'; id: string; delta: number }
  | { type: 'clear' }

export const initialCart: CartState = { items: [] }

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`)
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => item.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.item.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        }
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'remove':
      return { items: state.items.filter((item) => item.id !== action.id) }
    case 'setQty':
      return action.qty <= 0
        ? { items: state.items.filter((item) => item.id !== action.id) }
        : {
          items: state.items.map((item) =>
            item.id === action.id ? { ...item, qty: action.qty } : item,
          ),
        }
    case 'adjustQty': {
      const target = state.items.find((item) => item.id === action.id)
      if (!target) return state
      const nextQty = target.qty + action.delta
      return nextQty <= 0
        ? { items: state.items.filter((item) => item.id !== action.id) }
        : {
          items: state.items.map((item) =>
            item.id === action.id ? { ...item, qty: nextQty } : item,
          ),
        }
    }
    case 'clear':
      return { items: [] }
    default: {
      return assertNever(action)
    }
  }
}

export function selectTotal(state: CartState): number {
  return state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
}
