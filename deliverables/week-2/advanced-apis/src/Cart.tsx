import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { useCart } from './CartContext'

// Sample products the demo can add to the cart. Integer prices keep the
// displayed total easy to read and assert against.
const SAMPLE_PRODUCTS = [
  { id: 'coffee', name: 'Coffee', price: 10 },
  { id: 'bagel', name: 'Bagel', price: 5 },
] as const

export function Cart() {
  const { state, total, add, remove, setQty, clear } = useCart()
  const firstAddButtonRef = useRef<HTMLButtonElement>(null)

  const focusAddControls = () => {
    firstAddButtonRef.current?.focus()
  }

  const handleRemove = (id: string) => {
    flushSync(() => remove(id))
    focusAddControls()
  }

  const handleSetQty = (id: string, qty: number) => {
    if (qty <= 0) {
      flushSync(() => setQty(id, qty))
      focusAddControls()
    } else {
      setQty(id, qty)
    }
  }

  const handleClear = () => {
    flushSync(() => clear())
    focusAddControls()
  }

  return (
    <section aria-label="Shopping cart">
      <h2>Cart</h2>

      <div>
        {SAMPLE_PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            ref={index === 0 ? firstAddButtonRef : undefined}
            type="button"
            onClick={() => add(product)}
          >
            Add {product.name} (${product.price})
          </button>
        ))}
      </div>

      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {state.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} — ${item.price} × {item.qty}
              </span>
              <label>
                Qty for {item.name}
                <input
                  type="number"
                  min={0}
                  value={item.qty}
                  onChange={(e) => handleSetQty(item.id, Number(e.target.value))}
                />
              </label>
              <button type="button" onClick={() => handleRemove(item.id)}>
                Remove {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p data-testid="cart-total">Total: ${total}</p>

      <button type="button" onClick={handleClear}>
        Clear cart
      </button>
    </section>
  )
}
