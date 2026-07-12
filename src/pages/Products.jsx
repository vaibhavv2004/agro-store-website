import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const FALLBACK_CATEGORIES = ['All', 'Seeds', 'Fertilizers', 'Crop Protection', 'Organic Products', 'Sprayers', 'Garden Products'];
const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600';

const ALL_PRODUCTS = [
  { id: 1, name: 'Premium Tomato Seeds', category: 'Seeds', price: '₹49', desc: 'High-yield hybrid tomato seeds, disease resistant.', img_url: '/assets/images/products/seeds1.jpg' },
  { id: 2, name: 'Organic NPK Fertilizer', category: 'Fertilizers', price: '₹299', desc: '100% organic nitrogen, phosphorus, and potassium mix.', img_url: '/assets/images/products/fertilizer1.jpg' },
  { id: 3, name: 'Neem Oil Pest Spray', category: 'Crop Protection', price: '₹180', desc: 'Natural organic insect killer and fungicide.', img_url: '/assets/images/products/pesticide1.jpg' },
  { id: 4, name: 'Battery Knapsack Sprayer', category: 'Sprayers', price: '₹1999', desc: '16L capacity, durable battery, multiple nozzles.', img_url: '/assets/images/products/sprayer1.jpg' },
  { id: 5, name: 'Biodegradable Plant Pots', category: 'Garden Products', price: '₹120', desc: 'Pack of 12 eco-friendly coco-peat seed starting pots.', img_url: '/assets/images/products/pot1.jpg' }
];

import { useLanguage } from '../context/LanguageContext';

function Products() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, addToCart, updateQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { translateDbText } = useLanguage();

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }
    fetchCategoriesAndProducts();
  }, [location]);

  const fetchCategoriesAndProducts = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch categories
      const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('name')
        .order('created_at', { ascending: true });
        
      if (!catError && catData && catData.length > 0) {
        setCategories(['All', ...catData.map(c => c.name)]);
      } else {
        setCategories(FALLBACK_CATEGORIES);
      }

      // 2. Fetch products
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(ALL_PRODUCTS);
      }
    } catch (err) {
      console.warn('Could not fetch data from database, using fallback data:', err.message);
      setProducts(ALL_PRODUCTS);
      setCategories(FALLBACK_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  const getCartItem = (productId) => {
    return cart.find(item => item.id === productId);
  };

  const getCategoryTranslation = (cat) => {
    return cat;
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = translateDbText(product, 'name').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          translateDbText(product, product.description ? 'description' : 'desc').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Banner */}
      <section className="relative bg-dark h-52 sm:h-60 flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Green Color Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-[#1B4D2A]/90"></div>
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 C25 15, 35 15, 35 25 C35 35, 25 35, 20 20 C15 35, 5 35, 5 25 C5 15, 15 15, 20 5 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold text-white">Our Products</h1>
          <p className="mt-4 text-white max-w-xl mx-auto px-4">
            Explore our wide range of high-quality seeds, fertilizers, crop protection and garden products.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Category Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-custom shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-dark mb-4">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-6 animate-fade-in"
              />

              <h3 className="text-lg font-bold text-dark mb-4">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-fit lg:w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-dark hover:bg-gray-100'
                    }`}
                  >
                    {getCategoryTranslation(cat)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            {loading && products.length === 0 ? (
              <div className="bg-white rounded-custom shadow-sm py-12">
                <Loader message="Nourishing the catalog..." />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-custom shadow-sm">
                <p className="text-lightText text-lg">No products found matching your filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-custom overflow-hidden shadow-custom border border-gray-100 flex flex-col justify-between h-full group">
                    <div className="aspect-square bg-gray-50 overflow-hidden relative">
                      <img
                        src={prod.img_url || DEFAULT_FALLBACK_IMAGE}
                        alt={translateDbText(prod, 'name')}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DEFAULT_FALLBACK_IMAGE;
                        }}
                      />
                      <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {getCategoryTranslation(prod.category)}
                      </span>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-dark text-lg mb-2">{translateDbText(prod, 'name')}</h4>
                        <p className="text-lightText text-xs leading-relaxed mb-4">{translateDbText(prod, prod.description ? 'description' : 'desc')}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                        <span className="text-primary font-bold text-lg">{prod.price}</span>
                        {(() => {
                          const cartItem = getCartItem(prod.id);
                          if (cartItem) {
                            return (
                              <div className="flex items-center border border-primary/20 rounded-full overflow-hidden bg-primary/5">
                                <button
                                  onClick={() => updateQuantity(prod.id, cartItem.quantity - 1)}
                                  className="px-3 py-1.5 hover:bg-primary hover:text-white text-primary font-bold transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1.5 text-dark font-bold text-sm min-w-[32px] text-center">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(prod.id, cartItem.quantity + 1)}
                                  className="px-3 py-1.5 hover:bg-primary hover:text-white text-primary font-bold transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            );
                          }
                          return (
                            <button
                              onClick={() => addToCart(prod)}
                              className="px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 bg-primary text-white hover:bg-accent"
                            >
                              <i className="fa-solid fa-cart-plus"></i> Add to Cart
                            </button>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Products;
