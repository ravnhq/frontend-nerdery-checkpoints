import './cart.css'
import { CartProvider } from './CartContext'
import { Cart } from './Cart'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <main className="cart-page">
      <h1 className="cart-page__title">Shopping Cart</h1>
      <CartProvider>
        <Cart />
      </CartProvider>
    </main>
  )
}
