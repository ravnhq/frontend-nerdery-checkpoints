import { CartProvider } from './CartContext';
import { Cart } from './Cart';
import './styles.css';

export default function Demo() {
  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 640, margin: '1rem auto', padding: '0 1rem' }}>
      <h1>Shopping Cart</h1>
      <CartProvider>
        <Cart />
      </CartProvider>
    </main>
  );
}
