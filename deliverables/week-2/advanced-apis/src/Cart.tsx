import { useRef } from 'react';
import { useCart } from './CartContext';

const SAMPLE_PRODUCTS = [
  { id: 'coffee', name: 'Coffee', price: 10 },
  { id: 'bagel', name: 'Bagel', price: 5 },
] as const;

export function Cart() {
  const { state, total, add, remove, setQty, clear } = useCart();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const focusAddButton = () => buttonRef.current?.focus();

  return (
    <section className="cart" aria-label="Shopping cart">
      <h2 className="cart__heading">Cart</h2>

      <div className="cart__products">
        {SAMPLE_PRODUCTS.map((product, index) => (
          <button
            className="cart__button"
            ref={index === 0 ? buttonRef : undefined}
            key={product.id}
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
              <span className="cart__item-name">
                {item.name} — ${item.price} × {item.qty}
              </span>
              <label className="cart__qty-label">
                Qty for {item.name}
                <input
                  className="cart__qty-input"
                  type="number"
                  min={0}
                  value={item.qty}
                  onChange={(e) => {
                    const nextQty = Number(e.target.value);
                    setQty(item.id, nextQty);
                    if (nextQty <= 0) {
                      focusAddButton();
                    }
                  }}
                />
              </label>
              <button
                className="cart__remove"
                type="button"
                onClick={() => {
                  remove(item.id);
                  focusAddButton();
                }}
              >
                Remove {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="cart__total" data-testid="cart-total">Total: ${total}</p>

      <button
        className="cart__clear"
        type="button"
        onClick={() => {
          clear();
          focusAddButton();
        }}
      >
        Clear cart
      </button>
    </section>
  );
}
