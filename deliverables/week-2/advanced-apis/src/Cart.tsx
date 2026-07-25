import { useRef } from 'react'
import { useCart } from './CartContext'

// Sample products the demo can add to the cart. Integer prices keep the
// displayed total easy to read and assert against.
const SAMPLE_PRODUCTS = [
  { id: 'coffee', name: 'Coffee', price: 10 },
  { id: 'bagel', name: 'Bagel', price: 5 },
] as const

export function Cart() {
  const { state, total, add, remove, setQty, clear } = useCart()
  const sectionRef = useRef<HTMLElement>(null)
  return (
    <section aria-label="Shopping cart" ref={sectionRef} tabIndex={-1}>
      <h2>Cart</h2>

      <div>
        {SAMPLE_PRODUCTS.map((product) => (
          <button key={product.id} type="button" onClick={() => add(product)}>
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
                  onChange={(e) => setQty(item.id, Number(e.target.value))}
                />
              </label>
              <button type="button"
                onClick={() => {
                  remove(item.id)
                  sectionRef.current?.focus()
                }} >
                Remove {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p data-testid="cart-total">Total: ${total}</p>

      <button type="button" onClick={() => {
        clear()
        sectionRef.current?.focus()
      }}>
        Clear cart
      </button>
    </section>
  )
}
