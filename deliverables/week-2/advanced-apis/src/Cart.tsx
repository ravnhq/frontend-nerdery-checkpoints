import { useLayoutEffect, useRef } from 'react'
import { useCart } from './CartContext'
import type { Product } from './cartReducer'

// Sample products the demo can add to the cart. Integer prices keep the
// displayed total easy to read and assert against.
const SAMPLE_PRODUCTS: Product[] = [
  { id: 'coffee', name: 'Coffee', price: 10 },
  { id: 'bagel', name: 'Bagel', price: 5 },
]

export function Cart() {
  const { state, total, add, remove, setQty, clear } = useCart()
  const firstAddButtonRef = useRef<HTMLButtonElement>(null)
  const shouldRestoreFocusRef = useRef(false)

  useLayoutEffect(() => {
    if (!shouldRestoreFocusRef.current) return
    shouldRestoreFocusRef.current = false
    firstAddButtonRef.current?.focus()
  }, [state.items])

  function restoreFocusAfterRemoval() {
    shouldRestoreFocusRef.current = true
  }

  function handleRemove(id: string) {
    restoreFocusAfterRemoval()
    remove(id)
  }

  function handleSetQty(id: string, qty: number) {
    if (qty <= 0) {
      restoreFocusAfterRemoval()
    }
    setQty(id, qty)
  }

  function handleQtyInput(id: string, value: string) {
    if (value === '') return

    const qty = Number(value)
    if (Number.isNaN(qty)) return

    handleSetQty(id, qty)
  }

  function handleClear() {
    if (state.items.length > 0) {
      restoreFocusAfterRemoval()
    }
    clear()
  }

  return (
    <section className="cart" aria-label="Shopping cart">
      <h2 className="cart__title">Cart</h2>

      <div className="cart__actions">
        {SAMPLE_PRODUCTS.map((product, index) => (
          <button
            className="cart__button cart__button--primary"
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
        <p className="cart__empty">Your cart is empty.</p>
      ) : (
        <ul className="cart__list">
          {state.items.map((item) => (
            <li className="cart__item" key={item.id}>
              <div className="cart__item-info">
                <span className="cart__item-name">{item.name}</span>
                <span className="cart__item-meta">
                  ${item.price} × {item.qty}
                </span>
              </div>
              <div className="cart__item-controls">
                <label>
                  Qty for {item.name}
                  <input
                    className="cart__input"
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => handleQtyInput(item.id, e.currentTarget.value)}
                  />
                </label>
                <button
                  className="cart__button cart__button--danger"
                  type="button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove {item.name}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="cart__total" data-testid="cart-total">Total: ${total}</p>

      <button className="cart__button" type="button" onClick={handleClear}>
        Clear cart
      </button>
    </section>
  )
}
