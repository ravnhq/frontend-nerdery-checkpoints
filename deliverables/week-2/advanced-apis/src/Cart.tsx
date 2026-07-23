import {useRef} from 'react'
import { useCart } from './CartContext'
import { flushSync } from 'react-dom'

// Sample products the demo can add to the cart. Integer prices keep the
// displayed total easy to read and assert against.
const SAMPLE_PRODUCTS = [
  { id: 'coffee', name: 'Coffee', price: 10 },
  { id: 'bagel', name: 'Bagel', price: 5 },
] as const

export function Cart() {
  const { state, total, add, remove, setQty, clear } = useCart()
  const listRef = useRef<HTMLUListElement>(null)
  const addControlsRef = useRef<HTMLDivElement>(null)

  function focusAfterRemove() {
    const nextButton = listRef.current?.querySelector('button')
    if (nextButton) {
      nextButton.focus()
    } else {
      addControlsRef.current?.querySelector('button')?.focus()
    }
  }

  function handleRemove(id: string) {
    flushSync(() => {
      remove(id)
    })
    focusAfterRemove()
  }

  function handleSetQty(id: string, qty: number) {
    if (qty <= 0) {
      flushSync(() => setQty(id, qty))
      focusAfterRemove()
    } else {
      setQty(id, qty)
    }
  }

  function handleClear() {
    flushSync(() => {
      clear()
    })
    focusAfterRemove()
  }

  return (
    <section aria-label="Shopping cart">
      <h2>Cart</h2>

      <div ref={addControlsRef}>
        {SAMPLE_PRODUCTS.map((product) => (
          <button key={product.id} type="button" onClick={() => add(product)}>
            Add {product.name} (${product.price})
          </button>
        ))}
      </div>

      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul ref={listRef}>
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
