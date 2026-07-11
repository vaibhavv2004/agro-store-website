import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Products and Category State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Seeds', 'Fertilizers', 'Crop Protection', 'Organic Products', 'Sprayers', 'Garden Products']);
  
  // Form State
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Seeds',
    price: '',
    description: '',
    img_url: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      const fetchedProducts = data || [];
      setProducts(fetchedProducts);
      
      const uniqueCategories = [...new Set(fetchedProducts.map(p => p.category))];
      const baseCategories = ['Seeds', 'Fertilizers', 'Crop Protection', 'Organic Products', 'Sprayers', 'Garden Products'];
      const allCategories = [...new Set([...baseCategories, ...uniqueCategories])];
      setCategories(allCategories);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload file to 'product-images' bucket
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please verify you created a public storage bucket named "product-images" in Supabase.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormMessage(null);

    let finalImgUrl = formData.img_url;

    // If a new file is uploaded, store it
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) {
        finalImgUrl = uploadedUrl;
      } else {
        setLoading(false);
        return;
      }
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      price: formData.price.startsWith('₹') ? formData.price : `₹${formData.price}`,
      description: formData.description,
      img_url: finalImgUrl || 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=400',
    };

    if (editMode) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', selectedProductId);

      if (error) {
        setFormMessage({ type: 'error', text: error.message });
      } else {
        setFormMessage({ type: 'success', text: 'Product updated successfully!' });
        resetForm();
        fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([payload]);

      if (error) {
        setFormMessage({ type: 'error', text: error.message });
      } else {
        setFormMessage({ type: 'success', text: 'Product added successfully!' });
        resetForm();
        fetchProducts();
      }
    }
    setLoading(false);
  };

  const handleEditClick = (product) => {
    setEditMode(true);
    setSelectedProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.replace('₹', ''),
      description: product.description,
      img_url: product.img_url,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        alert('Error deleting product: ' + error.message);
      } else {
        fetchProducts();
      }
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setSelectedProductId(null);
    setFormData({
      name: '',
      category: 'Seeds',
      price: '',
      description: '',
      img_url: '',
    });
    setImageFile(null);
  };

  // Render Login screen if not authenticated
  if (!session) {
    return (
      <div className="bg-background min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-custom p-8 shadow-custom border border-gray-100">
          <div className="text-center mb-6">
            <span className="text-4xl">🌿</span>
            <h2 className="text-2xl font-bold text-dark mt-2">Admin Login</h2>
            <p className="text-lightText text-sm">Sign in to manage Eachur Agro Store products</p>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-dark mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="admin@eachuragro.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-accent text-white py-2.5 rounded-full font-semibold transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard if authenticated
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark flex items-center gap-2">
              ⚙️ Admin Dashboard
            </h1>
            <p className="text-lightText text-sm mt-1">Logged in as {session.user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-150 hover:bg-gray-200 text-dark px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add / Edit Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-custom p-6 shadow-custom border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-dark mb-4 border-b border-gray-100 pb-2">
                {editMode ? 'Edit Product' : 'Add New Product'}
              </h3>

              {formMessage && (
                <div
                  className={`p-3 rounded-lg text-sm mb-4 ${
                    formMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}
                >
                  {formMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Tomato Seeds"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">Category *</label>
                  <input
                    list="category-options"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="Select or type a category"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  />
                  <datalist id="category-options">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">Price (₹) *</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. 150 or ₹150"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Write a brief description..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-lightText file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20"
                  />
                  {formData.img_url && !imageFile && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={formData.img_url} alt="Current product" className="w-10 h-10 object-cover rounded" />
                      <span className="text-[10px] text-lightText truncate max-w-[150px]">Current Image</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-150">
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="flex-1 bg-primary hover:bg-accent text-white py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : loading ? 'Saving...' : editMode ? 'Update' : 'Save'}
                  </button>
                  {editMode && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-150 hover:bg-gray-200 text-dark px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Product Listing Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-custom shadow-custom border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-dark">Current Inventory</h3>
                <button
                  onClick={fetchProducts}
                  className="text-primary hover:text-accent font-semibold text-sm flex items-center gap-1"
                >
                  <i className="fa-solid fa-rotate-right"></i> Refresh
                </button>
              </div>

              {loading && products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lightText">Loading inventory...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lightText">No products in database. Add your first product on the left!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-dark uppercase">
                        <th className="p-4">Item</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.img_url}
                                alt={prod.name}
                                className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                              />
                              <div>
                                <h4 className="font-semibold text-dark">{prod.name}</h4>
                                <p className="text-[10px] text-lightText truncate max-w-[200px]">{prod.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-xs bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full font-medium">
                              {prod.category}
                            </span>
                          </td>
                          <td className="p-4 font-semibold text-primary">{prod.price}</td>
                          <td className="p-4">
                            <div className="flex gap-3 justify-center">
                              <button
                                onClick={() => handleEditClick(prod)}
                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                title="Edit"
                              >
                                <i className="fa-solid fa-pen-to-square text-base"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteClick(prod.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Delete"
                              >
                                <i className="fa-solid fa-trash-can text-base"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
