// tipo para un producto antes de convertirlo en item del carrito
export interface Product {
  id: string
  name: string
  price: number
}

// tipo para cada producto en el carrito
export interface CartItem extends Product {
  qty: number
}

// el estado del carrito es basicamente una lista de items
export interface CartState {
  items: CartItem[]
}
 
// union de todas las acciones posibles que puede recibir el reducer
export type CartAction =
  | { type: 'add'; item: Product }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'clear' }

// estado inicial: carrito vacio
export const initialCart: CartState = { items: [] }

// el reducer tiene que ser puro, nunca muto el state directamente
// siempre retorno un objeto nuevo con spread
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      // si ya existe el item, solo le sumo 1 a la cantidad
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        }
      }
      // si no existe lo agrego con qty 1
      return {
        ...state,
        items: [...state.items, { ...action.item, qty: 1 }],
      }
    }
    case 'remove':
      // filtro el item que quiero sacar
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'setQty': {
      // si la cantidad es 0 o negativa, directamente lo elimino
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: action.qty } : i,
        ),
      }
    }
    case 'clear':
      // vacio todo el carrito
      return { ...state, items: [] }
    default: {
      const _exhaustive: never = action
      return _exhaustive
    }
  }
}

// selector que calcula el total sumando precio * cantidad de cada item
export function selectTotal(state: CartState): number {
  return state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
}
