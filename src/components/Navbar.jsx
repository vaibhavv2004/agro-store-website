import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Brands', path: '/brands' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <img src="/favicon.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="hidden sm:inline">Eachur Agro Store</span>
              <span className="sm:hidden">Eachur Agro</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  isActive(link.path) ? 'text-primary font-semibold' : 'text-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="relative p-2 text-dark hover:text-primary transition-colors duration-300 mr-2"
              title="Shopping Cart"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                  {cartCount}
                </span>
              )}
            </Link>
            <a
              href="https://wa.me/919446062168"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-accent transition-colors duration-300 flex items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              WhatsApp
            </a>
          </div>

          <div className="flex items-center lg:hidden space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-dark hover:text-primary transition-colors duration-300"
              title="Shopping Cart"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark hover:text-primary hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <i className="fa-solid fa-xmark text-2xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden bg-white border-t border-gray-200`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                isActive(link.path)
                  ? 'bg-primary-light text-primary font-semibold'
                  : 'text-dark hover:bg-gray-50 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-200 px-3">
            <a
              href="https://wa.me/919446062168"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

