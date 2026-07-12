import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('products'), path: '/products' },
    { name: t('brands'), path: '/brands' },
    { name: t('gallery'), path: '/gallery' },
  ];

  const aboutDropdownLinks = [
    { name: t('about'), path: '/about' },
    { name: t('faq'), path: '/faq' },
    { name: t('contact'), path: '/contact' },
  ];

  const getAboutUsLabel = () => {
    if (language === 'ml') return 'ഞങ്ങളെക്കുറിച്ച്';
    if (language === 'ta') return 'எங்களைப் பற்றி';
    return 'About Us';
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 flex-shrink-0">
              <img src="/favicon.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
              <span className="hidden sm:inline whitespace-nowrap notranslate">Eachur Agro Store</span>
              <span className="sm:hidden whitespace-nowrap notranslate">Eachur Agro</span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {/* Main Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary notranslate ${
                  isActive(link.path) ? 'text-primary font-semibold' : 'text-dark'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* About Us Dropdown Menu */}
            <div className="relative group z-50">
              <button 
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary flex items-center gap-1 focus:outline-none py-2 notranslate ${
                  aboutDropdownLinks.some(link => isActive(link.path)) ? 'text-primary font-semibold' : 'text-dark'
                }`}
              >
                {getAboutUsLabel()} <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </button>
              <div className="absolute right-0 mt-0.5 w-44 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                {aboutDropdownLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-primary-light hover:text-primary transition-colors notranslate ${
                      isActive(link.path) ? 'text-primary bg-primary-light/30 font-semibold' : 'text-dark'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/cart"
              className="relative p-2 text-dark hover:text-primary transition-colors duration-300"
              title="Shopping Cart"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Language Switcher Dropdown */}
            <div className="relative group z-50">
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-dark hover:bg-gray-50 transition-all duration-300"
                title="Switch Language / மொழி / ഭാഷ / भाषा"
              >
                <span>🌐</span> {language === 'en' ? 'EN' : language === 'ml' ? 'ML' : language === 'ta' ? 'TA' : 'HI'}
              </button>
              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <button onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-primary-light hover:text-primary transition-colors ${language === 'en' ? 'text-primary bg-primary-light/30' : 'text-dark'}`}>English</button>
                <button onClick={() => setLanguage('ml')} className={`block w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-primary-light hover:text-primary transition-colors ${language === 'ml' ? 'text-primary bg-primary-light/30' : 'text-dark'}`}>മലയാളം</button>
                <button onClick={() => setLanguage('ta')} className={`block w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-primary-light hover:text-primary transition-colors ${language === 'ta' ? 'text-primary bg-primary-light/30' : 'text-dark'}`}>தமிழ்</button>
                <button onClick={() => setLanguage('hi')} className={`block w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-primary-light hover:text-primary transition-colors ${language === 'hi' ? 'text-primary bg-primary-light/30' : 'text-dark'}`}>हिन्दी</button>
              </div>
            </div>

            <a
              href="https://wa.me/919446062168"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-accent transition-colors duration-300 flex items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              {t('whatsapp')}
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
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 notranslate ${
                isActive(link.path)
                  ? 'bg-primary-light text-primary font-semibold'
                  : 'text-dark hover:bg-gray-50 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile About Us Submenu */}
          <div className="px-3 py-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-lightText uppercase tracking-wider block mb-1 notranslate">
              {getAboutUsLabel()}
            </span>
            <div className="pl-3 border-l-2 border-gray-150 space-y-1 mt-1">
              {aboutDropdownLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-300 notranslate ${
                    isActive(link.path)
                      ? 'bg-primary-light text-primary font-semibold'
                      : 'text-dark hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Language Switcher */}
          <div className="px-3 py-3 border-t border-gray-150 flex flex-col gap-2">
            <span className="text-xs font-semibold text-lightText uppercase tracking-wider">Language / மொழி / ഭാഷ / भाषा:</span>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`py-2 text-center rounded-lg text-xs font-semibold border transition-all ${language === 'en' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-dark border-gray-200'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('ml')}
                className={`py-2 text-center rounded-lg text-xs font-semibold border transition-all ${language === 'ml' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-dark border-gray-200'}`}
              >
                മലയാളം
              </button>
              <button 
                onClick={() => setLanguage('ta')}
                className={`py-2 text-center rounded-lg text-xs font-semibold border transition-all ${language === 'ta' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-dark border-gray-200'}`}
              >
                தமிழ்
              </button>
              <button 
                onClick={() => setLanguage('hi')}
                className={`py-2 text-center rounded-lg text-xs font-semibold border transition-all ${language === 'hi' ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-dark border-gray-200'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="pt-4 pb-2 border-t border-gray-200 px-3">
            <a
              href="https://wa.me/919446062168"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              {t('whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
