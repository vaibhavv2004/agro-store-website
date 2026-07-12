import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LanguageModal from './LanguageModal';
import { useCart } from '../context/CartContext';

function Layout() {
  const { cartCount, cartTotal } = useCart();
  const location = useLocation();
  
  // Don't show the floating button on the cart page itself
  const isCartPage = location.pathname === '/cart';

  return (
    <div className="flex flex-col min-h-screen relative pb-16 md:pb-0">
      <LanguageModal />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {/* Mobile Floating Checkout Button */}
      {!isCartPage && cartCount > 0 && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50 animate-fade-in">
          <Link 
            to="/cart" 
            className="bg-primary text-white p-4 rounded-xl shadow-lg flex items-center justify-between w-full hover:bg-accent transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-xs text-white/80 font-medium">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
              <span className="font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              Proceed to Checkout <i className="fa-solid fa-arrow-right"></i>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Layout;
