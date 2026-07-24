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
  const { items } = state;

  switch (action.type) {
    case 'add':
      {
        const existingItem = items.find(item => item.id === action.item.id);
        if (existingItem) {
          const updatedItems = items.map(item => {
            if (item.id === existingItem.id) {
              return { ...item, qty: item.qty + 1 };
            }
            return item;
          });
          return { items: updatedItems };
        } else {
          return { items: [...items, { ...action.item, qty: 1 }] };
        }
      }
    case 'clear':
      return { items: [] };
    case 'remove':
      {
        const filteredItems = items.filter(item => item.id !== action.id);
        return { items: filteredItems };
      }
    case 'setQty':
      {
        if (action.qty <= 0) {
          const filteredItems = items.filter(item => item.id !== action.id);
          return { items: filteredItems };
        } else {
          const updatedItems = items.map(item => {
            if (item.id === action.id) {
              return { ...item, qty: action.qty };
            }
            return item;
          });
          return { items: updatedItems };
        }
      }
    default:
      return state;
  }
}

export function selectTotal(state: CartState): number {
  return state.items.reduce((previousValue, currentValue) => previousValue + (currentValue.price * currentValue.qty), 0);
}
