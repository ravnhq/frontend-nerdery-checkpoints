import { CartProvider } from './CartContext'
import { Cart } from './Cart'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'
import './index.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <ThemeProvider>
      <main className="cart-demo">
        <div className="cart-demo__inner">
          <header className="cart-demo__masthead">
            <h1 className="cart-demo__title">Shopping Cart</h1>
            <ThemeToggle />
          </header>
          <CartProvider>
            <Cart />
          </CartProvider>
        </div>
      </main>
    </ThemeProvider>
  )
}
