import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
              🌿 Eachur Agro Store
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted destination for quality agricultural products, expert farming guidance, and reliable solutions for better farming.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-300 flex items-center justify-center">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-300 flex items-center justify-center">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="https://wa.me/919446062168" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-300 flex items-center justify-center">
                <i className="fa-brands fa-whatsapp text-sm"></i>
              </a>
              <a href="tel:+919446062168" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-300 flex items-center justify-center">
                <i className="fa-solid fa-phone text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Quick Links</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">About</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Products</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Gallery</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Product Categories</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Seeds</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Fertilizers</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Pesticides</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Bio Fertilizers</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Garden Products</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-secondary transition-colors duration-300 text-sm">Sprayers</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Contact Info</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <i className="fa-solid fa-location-dot mt-1 text-secondary"></i>
                <a 
                  href="https://maps.app.goo.gl/UdKg31z9usd4DFJV7?g_st=am" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-secondary transition-colors duration-300"
                >
                  Eachur, Kannur, Kerala
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="fa-solid fa-phone text-secondary"></i>
                <span>+91 9446062168</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="fa-brands fa-whatsapp text-secondary"></i>
                <span>WhatsApp Support</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="fa-solid fa-envelope text-secondary"></i>
                <span>info@eachuragro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs gap-4">
          <p>© 2026 Eachur Agro Store. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-secondary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors duration-300">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
