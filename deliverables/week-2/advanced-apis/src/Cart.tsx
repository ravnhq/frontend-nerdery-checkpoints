import { useCart } from './CartContext'
import './Cart.css'
import { useRef } from 'react'

const SAMPLE_PRODUCTS = [
  { id: 'coffee', name: 'Coffee', price: 10 },
  { id: 'bagel', name: 'Bagel', price: 5 },
] as const

function focusAddButton(
  id: string,
  addButtonRefs: React.RefObject<Map<string, HTMLButtonElement>>,
) {
  addButtonRefs.current.get(id)?.focus()
}
export function Cart() {
  const { state, total, add, remove, setQty, clear } = useCart()

  const addButtonRefs = useRef(new Map<string, HTMLButtonElement>())

  return (
    <section aria-label="Shopping cart">
      <div className="controls">
        <h2 className="subtitle">Cart</h2>

        <div>
          {SAMPLE_PRODUCTS.map((product) => (
            <button
              key={product.id}
              ref={(element) => {
                if (element) {
                  addButtonRefs.current.set(product.id, element)
                } else {
                  addButtonRefs.current.delete(product.id)
                }
              }}
              className="add-button"
              type="button"
              onClick={() => add(product)}
            >
              Add {product.name} (${product.price})
            </button>
          ))}
        </div>
      </div>

      {state.items.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {state.items.map((item) => (
            <li key={item.id} className="cart-item">
              <span>
                {item.name} — ${item.price} × {item.qty}
              </span>
              <div className="qty">
                <label>
                  Qty for {item.name}
                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => {
                      const qty = Number(e.target.value)

                      setQty(item.id, qty)

                      if (qty === 0) {
                        focusAddButton(item.id, addButtonRefs)
                      }
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    remove(item.id)
                    focusAddButton(item.id, addButtonRefs)
                  }}
                >
                  Remove {item.name}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="total">
        <p data-testid="cart-total">Total: ${total}</p>

        <button type="button" onClick={clear}>
          Clear cart
        </button>
      </div>
    </section>
  )
}
