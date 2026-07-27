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

export function cartReducer(state: CartState, _action: CartAction): CartState {
  switch(_action.type) {
    case 'add': {
      if (state.items.find(item => item.id === _action.item.id)) {
        return {items: state.items.map(item => item.id === _action.item.id
          ? {...item, qty: item.qty+1}
          : item)}
      }
      else{
        return {items: [...state.items, {..._action.item, qty:1}] }
      }
    }
    case 'remove':
      return { items: state.items.filter(item => item.id != _action.id)}
    case 'setQty': {
      if(_action.qty <= 0)
        return {items: state.items.filter(item => item.id != _action.id)} 
      else {
        return {items: state.items.map(item => item.id === _action.id
          ? {...item, qty: _action.qty}
          : item)}
      }
    }
    case 'clear':
      return {items: []}
  }
}

export function selectTotal(_state: CartState): number {
  return _state.items.reduce((total, item) => {
    return total + item.qty * item.price
  },0)
}
