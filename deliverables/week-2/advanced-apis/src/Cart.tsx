import { useLayoutEffect, useRef } from 'react'
import { useCart } from './CartContext'
import './Cart.css'

// Sample products the demo can add to the cart. Integer prices keep the
// displayed total easy to read and assert against.
const SAMPLE_PRODUCTS = [
  { id: 'coffee', name: 'Coffee', price: 10 },
  { id: 'bagel', name: 'Bagel', price: 5 },
] as const

export function Cart() {
  const { state, total, add, remove, adjustQty, clear } = useCart()
  const firstAddButtonRef = useRef<HTMLButtonElement>(null)
  const previousItemCount = useRef(state.items.length)

  // Remove / clear / setQty→0 can unmount whatever element currently holds
  // focus, which drops it to <body>. When the item count just dropped, send
  // focus back to a control that's guaranteed to still exist rather than
  // leaving it lost. Comparing counts (rather than a "first render" flag)
  // keeps this correct under StrictMode's dev-only double effect
  // invocation on mount, which would otherwise re-arm a flag-based guard.
  useLayoutEffect(() => {
    const shrank = state.items.length < previousItemCount.current
    previousItemCount.current = state.items.length
    if (shrank && document.activeElement === document.body) {
      firstAddButtonRef.current?.focus()
    }
  }, [state.items])

  return (
    <section className="cart" aria-label="Shopping cart">
      <h2 className="cart__heading">Cart</h2>

      <div className="cart__products">
        {SAMPLE_PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            type="button"
            className="cart__add"
            ref={index === 0 ? firstAddButtonRef : undefined}
            onClick={() => add(product)}
          >
            Add {product.name} (${product.price})
          </button>
        ))}
      </div>

      {state.items.length === 0 ? (
        <p className="cart__empty">Your cart is empty.</p>
      ) : (
        <ul className="cart__list">
          {state.items.map((item) => (
            <li key={item.id} className="cart__row">
              <span className="cart__name">{item.name}</span>
              <span className="cart__sep">—</span>
              <span className="cart__price">${item.price}</span>
              <span className="cart__stepper">
                <button
                  type="button"
                  className="cart__step cart__step--decrease"
                  aria-label={`Decrease quantity for ${item.name}`}
                  onClick={() => adjustQty(item.id, -1)}
                >
                  -
                </button>
                <span className="cart__qty" aria-live="polite">
                  {item.qty}
                </span>
                <button
                  type="button"
                  className="cart__step cart__step--increase"
                  aria-label={`Increase quantity for ${item.name}`}
                  onClick={() => adjustQty(item.id, 1)}
                >
                  +
                </button>
              </span>
              <button type="button" className="cart__remove" onClick={() => remove(item.id)}>
                Remove {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="cart__total" data-testid="cart-total">
        Total: ${total}
      </p>

      <button type="button" className="cart__clear" onClick={clear}>
        Clear cart
      </button>
    </section>
  )
}
