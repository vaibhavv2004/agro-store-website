import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Loader from '../components/Loader';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600';

function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  
  // Dashboard Tabs: 'products' | 'categories' | 'brands' | 'gallery'
  const [activeTab, setActiveTab] = useState('products');

  // State Lists
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  // Loading States
  const [listLoading, setListLoading] = useState(false);

  // Forms State - Products
  const [editProductMode, setEditProductMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productFormData, setProductFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    img_url: '',
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImageDimensions, setProductImageDimensions] = useState(null);
  const [productUploading, setProductUploading] = useState(false);
  const [productFormMessage, setProductFormMessage] = useState(null);

  // Forms State - Categories & Subcategories
  const [categoryName, setCategoryName] = useState('');
  const [categoryFormMessage, setCategoryFormMessage] = useState(null);
  
  const [subcategoryName, setSubcategoryName] = useState('');
  const [subcategoryParent, setSubcategoryParent] = useState('');
  const [subcategoryFormMessage, setSubcategoryFormMessage] = useState(null);

  // Forms State - Brands
  const [editBrandMode, setEditBrandMode] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [brandFormData, setBrandFormData] = useState({
    name: '',
    category: '',
    desc_text: '',
    logo_url: '',
  });
  const [brandLogoFile, setBrandLogoFile] = useState(null);
  const [brandUploading, setBrandUploading] = useState(false);
  const [brandFormMessage, setBrandFormMessage] = useState(null);

  // Forms State - Gallery
  const [galleryImageFile, setGalleryImageFile] = useState(null);
  const [galleryImageDimensions, setGalleryImageDimensions] = useState(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryFormMessage, setGalleryFormMessage] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchCategories();
      fetchSubcategories();
      fetchProducts();
      fetchBrands();
      fetchGalleryImages();
    }
  }, [session]);

  // --- API OPERATIONS ---

  const fetchProducts = async () => {
    setListLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
    setListLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      const fetchedCats = data || [];
      setCategories(fetchedCats);
      
      // Default selections
      if (fetchedCats.length > 0) {
        if (!productFormData.category) {
          setProductFormData(prev => ({ ...prev, category: fetchedCats[0].name }));
        }
        if (!subcategoryParent) {
          setSubcategoryParent(fetchedCats[0].name);
        }
        if (!brandFormData.category) {
          setBrandFormData(prev => ({ ...prev, category: fetchedCats[0].name }));
        }
      }
    }
  };

  const fetchSubcategories = async () => {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .order('category_name', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching subcategories:', error);
    } else {
      setSubcategories(data || []);
    }
  };

  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching brands:', error);
    } else {
      setBrands(data || []);
    }
  };

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery images:', error);
    } else {
      setGalleryImages(data || []);
    }
  };

  // --- AUTH HANDLERS ---
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

  // --- GENERAL IMAGE UPLOADER ---
  const uploadImageToStorage = async (file, folderPath) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folderPath}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      alert('Failed to upload image. Please verify you created a public storage bucket named "product-images" in Supabase.');
      return null;
    }
  };

  // --- FILE CHANGE DIMENSION EXTRACTORS ---
  const handleProductFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImageFile(file);
      const img = new Image();
      img.onload = () => {
        setProductImageDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    } else {
      setProductImageFile(null);
      setProductImageDimensions(null);
    }
  };

  const handleGalleryFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGalleryImageFile(file);
      const img = new Image();
      img.onload = () => {
        setGalleryImageDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    } else {
      setGalleryImageFile(null);
      setGalleryImageDimensions(null);
    }
  };

  const handleBrandFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandLogoFile(file);
    } else {
      setBrandLogoFile(null);
    }
  };

  // --- PRODUCT SUBMIT HANDLERS ---
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProductFormMessage(null);

    let finalImgUrl = productFormData.img_url;

    if (productImageFile) {
      setProductUploading(true);
      const uploadedUrl = await uploadImageToStorage(productImageFile, 'products');
      setProductUploading(false);
      if (uploadedUrl) {
        finalImgUrl = uploadedUrl;
      } else {
        setLoading(false);
        return;
      }
    }

    const payload = {
      name: productFormData.name,
      category: productFormData.category || (categories[0]?.name || 'Seeds'),
      subcategory: productFormData.subcategory || null,
      price: productFormData.price.startsWith('₹') ? productFormData.price : `₹${productFormData.price}`,
      description: productFormData.description,
      img_url: finalImgUrl || DEFAULT_FALLBACK_IMAGE,
    };

    if (editProductMode) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', selectedProductId);

      if (error) {
        setProductFormMessage({ type: 'error', text: error.message });
      } else {
        setProductFormMessage({ type: 'success', text: 'Product updated successfully!' });
        resetProductForm();
        fetchProducts();
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([payload]);

      if (error) {
        setProductFormMessage({ type: 'error', text: error.message });
      } else {
        setProductFormMessage({ type: 'success', text: 'Product added successfully!' });
        resetProductForm();
        fetchProducts();
      }
    }
    setLoading(false);
  };

  const handleProductEditClick = (product) => {
    setEditProductMode(true);
    setSelectedProductId(product.id);
    setProductFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || '',
      price: product.price.replace('₹', ''),
      description: product.description || '',
      img_url: product.img_url,
    });
    setProductImageFile(null);
    setProductImageDimensions(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductDeleteClick = async (productId) => {
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

  const resetProductForm = () => {
    setEditProductMode(false);
    setSelectedProductId(null);
    setProductFormData({
      name: '',
      category: categories[0]?.name || 'Seeds',
      subcategory: '',
      price: '',
      description: '',
      img_url: '',
    });
    setProductImageFile(null);
    setProductImageDimensions(null);
  };

  // --- CATEGORIES & SUBCATEGORIES HANDLERS ---
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setLoading(true);
    setCategoryFormMessage(null);

    const { error } = await supabase
      .from('categories')
      .insert([{ name: categoryName.trim() }]);

    if (error) {
      setCategoryFormMessage({ type: 'error', text: error.message });
    } else {
      setCategoryFormMessage({ type: 'success', text: `Category "${categoryName}" added successfully!` });
      setCategoryName('');
      fetchCategories();
    }
    setLoading(false);
  };

  const handleCategoryDeleteClick = async (catId, catName) => {
    if (window.confirm(`Are you sure you want to delete category "${catName}"? This will not delete products assigned to this category, but they will fall back.`)) {
      setLoading(true);
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', catId);

      if (error) {
        alert('Error deleting category: ' + error.message);
      } else {
        fetchCategories();
      }
      setLoading(false);
    }
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !subcategoryParent) return;

    setLoading(true);
    setSubcategoryFormMessage(null);

    const { error } = await supabase
      .from('subcategories')
      .insert([{
        name: subcategoryName.trim(),
        category_name: subcategoryParent
      }]);

    if (error) {
      setSubcategoryFormMessage({ type: 'error', text: error.message });
    } else {
      setSubcategoryFormMessage({ type: 'success', text: `Subcategory "${subcategoryName}" added inside "${subcategoryParent}"!` });
      setSubcategoryName('');
      fetchSubcategories();
    }
    setLoading(false);
  };

  const handleSubcategoryDeleteClick = async (subcatId, subcatName) => {
    if (window.confirm(`Are you sure you want to delete subcategory "${subcatName}"?`)) {
      setLoading(true);
      const { error } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', subcatId);

      if (error) {
        alert('Error deleting subcategory: ' + error.message);
      } else {
        fetchSubcategories();
      }
      setLoading(false);
    }
  };

  // --- BRANDS HANDLERS ---
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBrandFormMessage(null);

    let finalLogoUrl = brandFormData.logo_url;

    if (brandLogoFile) {
      setBrandUploading(true);
      const uploadedUrl = await uploadImageToStorage(brandLogoFile, 'brands');
      setBrandUploading(false);
      if (uploadedUrl) {
        finalLogoUrl = uploadedUrl;
      } else {
        setLoading(false);
        return;
      }
    }

    const payload = {
      name: brandFormData.name,
      category: brandFormData.category || (categories[0]?.name || 'Seeds'),
      desc_text: brandFormData.desc_text,
      logo_url: finalLogoUrl || null,
    };

    if (editBrandMode) {
      const { error } = await supabase
        .from('brands')
        .update(payload)
        .eq('id', selectedBrandId);

      if (error) {
        setBrandFormMessage({ type: 'error', text: error.message });
      } else {
        setBrandFormMessage({ type: 'success', text: 'Brand updated successfully!' });
        resetBrandForm();
        fetchBrands();
      }
    } else {
      const { error } = await supabase
        .from('brands')
        .insert([payload]);

      if (error) {
        setBrandFormMessage({ type: 'error', text: error.message });
      } else {
        setBrandFormMessage({ type: 'success', text: 'Brand added successfully!' });
        resetBrandForm();
        fetchBrands();
      }
    }
    setLoading(false);
  };

  const handleBrandEditClick = (brand) => {
    setEditBrandMode(true);
    setSelectedBrandId(brand.id);
    setBrandFormData({
      name: brand.name,
      category: brand.category,
      desc_text: brand.desc_text || '',
      logo_url: brand.logo_url || '',
    });
    setBrandLogoFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandDeleteClick = async (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      setLoading(true);
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);

      if (error) {
        alert('Error deleting brand: ' + error.message);
      } else {
        fetchBrands();
      }
      setLoading(false);
    }
  };

  const resetBrandForm = () => {
    setEditBrandMode(false);
    setSelectedBrandId(null);
    setBrandFormData({
      name: '',
      category: categories[0]?.name || 'Seeds',
      desc_text: '',
      logo_url: '',
    });
    setBrandLogoFile(null);
  };

  // --- GALLERY HANDLERS ---
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryImageFile) {
      alert('Please select an image file to upload.');
      return;
    }

    setLoading(true);
    setGalleryUploading(true);
    setGalleryFormMessage(null);

    const uploadedUrl = await uploadImageToStorage(galleryImageFile, 'gallery');

    if (uploadedUrl) {
      const { error } = await supabase
        .from('gallery')
        .insert([{
          src: uploadedUrl,
          title: 'Gallery Image',
          desc_text: ''
        }]);

      if (error) {
        setGalleryFormMessage({ type: 'error', text: error.message });
      } else {
        setGalleryFormMessage({ type: 'success', text: 'Gallery item uploaded successfully!' });
        setGalleryImageFile(null);
        setGalleryImageDimensions(null);
        fetchGalleryImages();
      }
    } else {
      setGalleryFormMessage({ type: 'error', text: 'Storage upload failed.' });
    }

    setGalleryUploading(false);
    setLoading(false);
  };

  const handleGalleryDeleteClick = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      setLoading(true);
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', imageId);

      if (error) {
        alert('Error deleting gallery image: ' + error.message);
      } else {
        fetchGalleryImages();
      }
      setLoading(false);
    }
  };

  const handleMoveGalleryImage = async (index, direction) => {
    const newImages = [...galleryImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    setLoading(true);

    const timeIndex = newImages[index].created_at;
    const timeTarget = newImages[targetIndex].created_at;

    const update1 = supabase
      .from('gallery')
      .update({ created_at: timeTarget })
      .eq('id', newImages[index].id);

    const update2 = supabase
      .from('gallery')
      .update({ created_at: timeIndex })
      .eq('id', newImages[targetIndex].id);

    await Promise.all([update1, update2]);
    
    await fetchGalleryImages();
    setLoading(false);
  };

  // Filter subcategories matching current product category selection
  const activeProductSubcategories = subcategories.filter(
    sub => sub.category_name === productFormData.category
  );

  // --- LOGIN SCREEN ---
  if (!session) {
    return (
      <div className="bg-background min-h-screen py-16 flex items-center justify-center px-4 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-custom p-8 shadow-custom border border-gray-100">
          <div className="text-center mb-6">
            <span className="text-4xl">🌿</span>
            <h2 className="text-2xl font-bold text-dark mt-2">Admin Login</h2>
            <p className="text-lightText text-sm">Sign in to manage Eachur Agro Store</p>
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

  // --- ADMIN DASHBOARD ---
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark flex items-center gap-2">
              ⚙️ Store Settings
            </h1>
            <p className="text-lightText text-sm mt-1">Logged in as {session.user.email}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="bg-gray-150 hover:bg-gray-200 text-dark px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-gray-200 mb-8 gap-2 overflow-x-auto whitespace-nowrap pb-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-primary text-primary'
                : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            📦 Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              activeTab === 'categories'
                ? 'border-primary text-primary'
                : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            🏷️ Categories
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              activeTab === 'brands'
                ? 'border-primary text-primary'
                : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            🤝 Partner Brands
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              activeTab === 'gallery'
                ? 'border-primary text-primary'
                : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            🖼️ Gallery Upload
          </button>
        </div>

        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Add / Edit Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-custom p-6 shadow-custom border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-dark mb-4 border-b border-gray-100 pb-2">
                  {editProductMode ? 'Edit Product' : 'Add New Product'}
                </h3>

                {productFormMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm mb-4 ${
                      productFormMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {productFormMessage.text}
                  </div>
                )}

                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={productFormData.name}
                      onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                      placeholder="e.g. Tomato Seeds"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Category *</label>
                    <select
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value, subcategory: '' })}
                      required
                      className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-dark custom-select"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Subcategory (Optional)</label>
                    <select
                      value={productFormData.subcategory}
                      onChange={(e) => setProductFormData({ ...productFormData, subcategory: e.target.value })}
                      className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-dark custom-select"
                    >
                      <option value="">None / Plain Category</option>
                      {activeProductSubcategories.map((sub) => (
                        <option key={sub.id} value={sub.name}>{sub.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Price (₹) *</label>
                    <input
                      type="text"
                      required
                      value={productFormData.price}
                      onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                      placeholder="e.g. 150 or ₹150"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Description</label>
                    <textarea
                      value={productFormData.description}
                      onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
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
                      onChange={handleProductFileChange}
                      className="w-full text-xs text-lightText file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20"
                    />
                    {productImageDimensions && (
                      <p className="mt-2 text-xs text-secondary font-semibold">
                        Dimensions: {productImageDimensions.width} × {productImageDimensions.height} px
                      </p>
                    )}
                    {productFormData.img_url && !productImageFile && (
                      <div className="mt-2 flex items-center gap-2">
                        <img src={productFormData.img_url} alt="Current product" className="w-10 h-10 object-cover rounded animate-fade-in" />
                        <span className="text-[10px] text-lightText truncate max-w-[150px]">Current Image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-150">
                    <button
                      type="submit"
                      disabled={loading || productUploading}
                      className="flex-1 bg-primary hover:bg-accent text-white py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                      {productUploading ? 'Uploading...' : loading ? 'Saving...' : editProductMode ? 'Update' : 'Save'}
                    </button>
                    {editProductMode && (
                      <button
                        type="button"
                        onClick={resetProductForm}
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

                {listLoading && products.length === 0 ? (
                  <div className="py-12">
                    <Loader message="Preparing dashboard..." />
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
                          <th className="p-4">Category / Sub</th>
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
                                  src={prod.img_url || DEFAULT_FALLBACK_IMAGE}
                                  alt={prod.name}
                                  className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = DEFAULT_FALLBACK_IMAGE;
                                  }}
                                />
                                <div>
                                  <h4 className="font-semibold text-dark">{prod.name}</h4>
                                  <p className="text-[10px] text-lightText truncate max-w-[200px]">{prod.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1 items-start">
                                <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">
                                  {prod.category}
                                </span>
                                {prod.subcategory && (
                                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                    ↳ {prod.subcategory}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-4 font-semibold text-primary">{prod.price}</td>
                            <td className="p-4">
                              <div className="flex gap-3 justify-center">
                                <button
                                  onClick={() => handleProductEditClick(prod)}
                                  className="text-blue-500 hover:text-blue-700 transition-colors"
                                  title="Edit"
                                >
                                  <i className="fa-solid fa-pen-to-square text-base"></i>
                                </button>
                                <button
                                  onClick={() => handleProductDeleteClick(prod.id)}
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
        )}

        {/* --- CATEGORIES TAB --- */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Categories Administration Box */}
            <div className="space-y-8">
              <div className="bg-white rounded-custom p-6 shadow-custom border border-gray-100">
                <h3 className="text-lg font-bold text-dark mb-4 border-b border-gray-100 pb-2">
                  Add New Parent Category
                </h3>

                {categoryFormMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm mb-4 ${
                      categoryFormMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {categoryFormMessage.text}
                  </div>
                )}

                <form onSubmit={handleCategorySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Category Name *</label>
                    <input
                      type="text"
                      required
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="e.g. Irrigation Tools"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-accent text-white py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Add Category'}
                  </button>
                </form>
              </div>

              {/* Categories Catalog */}
              <div className="bg-white rounded-custom shadow-custom border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-dark">Parent Category Catalog</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-dark uppercase">
                        <th className="p-4">Category Name</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {categories.map((cat) => (
                        <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-semibold text-dark">{cat.name}</td>
                          <td className="p-4">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleCategoryDeleteClick(cat.id, cat.name)}
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
              </div>
            </div>

            {/* Subcategories Administration Box */}
            <div className="space-y-8">
              <div className="bg-white rounded-custom p-6 shadow-custom border border-gray-100">
                <h3 className="text-lg font-bold text-dark mb-4 border-b border-gray-100 pb-2">
                  Add New Subcategory
                </h3>

                {subcategoryFormMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm mb-4 ${
                      subcategoryFormMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {subcategoryFormMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubcategorySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Parent Category *</label>
                    <select
                      value={subcategoryParent}
                      onChange={(e) => setSubcategoryParent(e.target.value)}
                      required
                      className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-dark custom-select"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Subcategory Name *</label>
                    <input
                      type="text"
                      required
                      value={subcategoryName}
                      onChange={(e) => setSubcategoryName(e.target.value)}
                      placeholder="e.g. Tomato (inside Seeds)"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-accent text-white py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Add Subcategory'}
                  </button>
                </form>
              </div>

              {/* Subcategories Catalog */}
              <div className="bg-white rounded-custom shadow-custom border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-dark">Subcategory Catalog</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-dark uppercase">
                        <th className="p-4">Subcategory Name</th>
                        <th className="p-4">Parent Category</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {subcategories.map((sub) => (
                        <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 font-semibold text-dark">{sub.name}</td>
                          <td className="p-4">
                            <span className="text-xs bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full font-medium">
                              {sub.category_name}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleSubcategoryDeleteClick(sub.id, sub.name)}
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
              </div>
            </div>
          </div>
        )}

        {/* --- BRANDS TAB --- */}
        {activeTab === 'brands' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in bg-background">
            {/* Left: Add/Edit Brand Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-custom p-6 shadow-custom border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-dark mb-4 border-b border-gray-100 pb-2">
                  {editBrandMode ? 'Edit Partner Brand' : 'Add Partner Brand'}
                </h3>

                {brandFormMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm mb-4 ${
                      brandFormMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {brandFormMessage.text}
                  </div>
                )}

                <form onSubmit={handleBrandSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={brandFormData.name}
                      onChange={(e) => setBrandFormData({ ...brandFormData, name: e.target.value })}
                      placeholder="e.g. IFFCO"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Primary Category *</label>
                    <select
                      value={brandFormData.category}
                      onChange={(e) => setBrandFormData({ ...brandFormData, category: e.target.value })}
                      required
                      className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-dark custom-select"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Description / Dealer Status</label>
                    <textarea
                      value={brandFormData.desc_text}
                      onChange={(e) => setBrandFormData({ ...brandFormData, desc_text: e.target.value })}
                      rows="3"
                      placeholder="e.g. Indian Farmers Fertiliser Cooperative Limited..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Brand Logo (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBrandFileChange}
                      className="w-full text-xs text-lightText file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20"
                    />
                    {brandFormData.logo_url && !brandLogoFile && (
                      <div className="mt-2 flex items-center gap-2 animate-fade-in">
                        <img src={brandFormData.logo_url} alt="Current logo" className="w-12 h-12 object-contain bg-gray-50 border p-1 rounded" />
                        <span className="text-[10px] text-lightText truncate max-w-[150px]">Current Logo</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-150">
                    <button
                      type="submit"
                      disabled={loading || brandUploading}
                      className="flex-1 bg-primary hover:bg-accent text-white py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                      {brandUploading ? 'Uploading...' : loading ? 'Saving...' : editBrandMode ? 'Update' : 'Save'}
                    </button>
                    {editBrandMode && (
                      <button
                        type="button"
                        onClick={resetBrandForm}
                        className="bg-gray-150 hover:bg-gray-200 text-dark px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Brand Listings Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-custom shadow-custom border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-dark">Partner Brands</h3>
                </div>

                {brands.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lightText">No brands loaded. Add a partner brand on the left!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-dark uppercase">
                          <th className="p-4">Brand Logo / Name</th>
                          <th className="p-4">Primary Category</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {brands.map((br) => (
                          <tr key={br.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                {br.logo_url ? (
                                  <img
                                    src={br.logo_url}
                                    alt={br.name}
                                    className="w-12 h-12 object-contain bg-gray-50 border p-1 rounded-lg flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-gray-100 text-lightText rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-xs">
                                    No Logo
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-semibold text-dark">{br.name}</h4>
                                  <p className="text-[10px] text-lightText truncate max-w-[200px]">{br.desc_text}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="text-xs bg-primary-light text-primary px-2.5 py-0.5 rounded-full font-medium">
                                {br.category}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-3 justify-center">
                                <button
                                  onClick={() => handleBrandEditClick(br)}
                                  className="text-blue-500 hover:text-blue-700 transition-colors"
                                  title="Edit"
                                >
                                  <i className="fa-solid fa-pen-to-square text-base"></i>
                                </button>
                                <button
                                  onClick={() => handleBrandDeleteClick(br.id)}
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
        )}

        {/* --- GALLERY TAB --- */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Left Column: Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-custom p-6 shadow-custom border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold text-dark mb-4 border-b border-gray-100 pb-2">
                  Upload Gallery Image
                </h3>

                {galleryFormMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm mb-4 ${
                      galleryFormMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {galleryFormMessage.text}
                  </div>
                )}

                <form onSubmit={handleGallerySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-dark mb-1">Select Image File *</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handleGalleryFileChange}
                      className="w-full text-xs text-lightText file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20"
                    />
                    {galleryImageDimensions && (
                      <p className="mt-2 text-xs text-secondary font-semibold animate-fade-in">
                        Original Dimensions: {galleryImageDimensions.width} × {galleryImageDimensions.height} px
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || galleryUploading}
                    className="w-full bg-primary hover:bg-accent text-white py-2 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {galleryUploading ? 'Uploading Image...' : loading ? 'Saving...' : 'Upload Item'}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Gallery Catalog List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-custom shadow-custom border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-dark">Uploaded Gallery Items</h3>
                </div>

                {galleryImages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lightText">No gallery uploads found in Supabase.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-dark uppercase">
                          <th className="p-4">Image Info</th>
                          <th className="p-4 text-center">Arrange / Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {galleryImages.map((img, idx) => (
                          <tr key={img.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={img.src}
                                  alt="Gallery item"
                                  className="w-24 h-auto max-h-24 object-contain rounded-lg flex-shrink-0"
                                />
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-4 items-center justify-center">
                                {/* Arrange Buttons */}
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleMoveGalleryImage(idx, 'up')}
                                    disabled={idx === 0 || loading}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-light hover:text-primary transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-dark"
                                    title="Move Up"
                                  >
                                    <i className="fa-solid fa-arrow-up text-xs"></i>
                                  </button>
                                  <button
                                    onClick={() => handleMoveGalleryImage(idx, 'down')}
                                    disabled={idx === galleryImages.length - 1 || loading}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary-light hover:text-primary transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-dark"
                                    title="Move Down"
                                  >
                                    <i className="fa-solid fa-arrow-down text-xs"></i>
                                  </button>
                                </div>
                                <div className="w-[1px] h-5 bg-gray-250"></div>
                                <button
                                  onClick={() => handleGalleryDeleteClick(img.id)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                  title="Delete"
                                  disabled={loading}
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
        )}

      </div>
    </div>
  );
}

export default Admin;
