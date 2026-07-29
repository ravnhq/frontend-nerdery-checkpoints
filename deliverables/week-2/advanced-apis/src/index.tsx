import { CartProvider } from './CartContext'
import { Cart } from './Cart'
import './index.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <main
      style={{
        fontFamily: 'system-ui',
        maxWidth: 640,
        margin: '1rem auto',
        padding: '0 1rem',
      }}
    >
      <h1 className="cart-title">Shopping Cart</h1>
      <CartProvider>
        <Cart />
      </CartProvider>
    </main>
  )
}
