import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../supabaseClient';

const ALL_PRODUCTS = [
  { id: 1, name: 'Hybrid Tomato Seeds', category: 'Seeds', price: '₹45', img: 'tomato_seed.jpg', desc: 'High-yield hybrid tomato seeds with high disease resistance.' },
  { id: 2, name: 'Organic NPK Fertilizer', category: 'Fertilizers', price: '₹220', img: 'npk.jpg', desc: 'Balanced nitrogen, phosphorus, and potassium mix for crops.' },
  { id: 3, name: 'Eco Neem Oil Spray', category: 'Crop Protection', price: '₹180', img: 'neem_oil.jpg', desc: 'Natural pest repellent and insecticide for garden plants.' },
  { id: 4, name: 'Bio-Compost Organic Manure', category: 'Organic Products', price: '₹120', img: 'manure.jpg', desc: '100% organic decomposed manure for enhanced soil fertility.' },
  { id: 5, name: '16L Battery Sprayer', category: 'Sprayers', price: '₹2,450', img: 'sprayer_battery.jpg', desc: 'Rechargeable battery-operated sprayer with multi-nozzle attachments.' },
  { id: 6, name: 'Premium Terracotta Pots', category: 'Garden Products', price: '₹90', img: 'pots.jpg', desc: 'Durable clay pots ideal for indoor and outdoor plants.' },
  { id: 7, name: 'Sweet Corn Seeds', category: 'Seeds', price: '₹60', img: 'corn_seed.jpg', desc: 'Premium grade sweet corn seeds for farm sowing.' },
  { id: 8, name: 'Urea Fertilizer 5kg', category: 'Fertilizers', price: '₹150', img: 'urea.jpg', desc: 'High nitrogen chemical fertilizer for rapid crop growth.' },
  { id: 9, name: 'Broad Spectrum Fungicide', category: 'Crop Protection', price: '₹350', img: 'fungicide.jpg', desc: 'Effective protection against leaf blight and powder mildew.' },
  { id: 10, name: 'Vermicompost Premium', category: 'Organic Products', price: '₹140', img: 'vermi.jpg', desc: 'Worm-composted soil conditioner enriched with micro-nutrients.' },
  { id: 11, name: 'Manual Pressure Sprayer 2L', category: 'Sprayers', price: '₹250', img: 'sprayer_2l.jpg', desc: 'Handy garden sprayer for watering and foliar feeding.' },
  { id: 12, name: 'Premium Hand Trowel', category: 'Garden Products', price: '₹110', img: 'trowel.jpg', desc: 'Ergonomic stainless steel hand trowel for planting.' }
];

const BASE_CATEGORIES = ['All', 'Seeds', 'Fertilizers', 'Crop Protection', 'Organic Products', 'Sprayers', 'Garden Products'];

function Products() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(BASE_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, addToCart, updateQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedCategory(location.state.category);
    }
    fetchProducts();
  }, [location]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(['All', ...new Set([...BASE_CATEGORIES.slice(1), ...uniqueCategories])]);
      } else {
        setProducts(ALL_PRODUCTS);
        const uniqueCategories = [...new Set(ALL_PRODUCTS.map(p => p.category))];
        setCategories(['All', ...new Set([...BASE_CATEGORIES.slice(1), ...uniqueCategories])]);
      }
    } catch (err) {
      console.warn('Could not fetch products from database, using fallback data:', err.message);
      setProducts(ALL_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const getCartItem = (productId) => {
    return cart.find(item => item.id === productId);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.description || product.desc || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Our Agricultural Products</h1>
        <p className="mt-4 text-white/80 max-w-xl mx-auto px-4">
          Browse through our curated list of high-quality products for all your farming and gardening needs.
        </p>
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-6"
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
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            {loading && products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-custom shadow-sm">
                <p className="text-lightText text-lg">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-custom shadow-sm">
                <p className="text-lightText text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-custom overflow-hidden shadow-custom border border-gray-100 flex flex-col justify-between h-full group">
                    <div className="aspect-square bg-gray-50 overflow-hidden relative">
                      <img
                        src={prod.img_url || `https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=400&sig=${prod.id}`}
                        alt={prod.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {prod.category}
                      </span>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-dark text-lg mb-2">{prod.name}</h4>
                        <p className="text-lightText text-xs leading-relaxed mb-4">{prod.description || prod.desc}</p>
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


