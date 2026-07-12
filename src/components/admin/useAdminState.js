import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600';

export default function useAdminState() {
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

  // --- API DATA FETCHERS ---
  const fetchProducts = async () => {
    setListLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setProducts(data || []);
    setListLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setCategories(data);
      if (data.length > 0) {
        if (!productFormData.category) setProductFormData(p => ({ ...p, category: data[0].name }));
        if (!subcategoryParent) setSubcategoryParent(data[0].name);
        if (!brandFormData.category) setBrandFormData(p => ({ ...p, category: data[0].name }));
      }
    }
  };

  const fetchSubcategories = async () => {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .order('category_name', { ascending: true })
      .order('name', { ascending: true });

    if (!error) setSubcategories(data || []);
  };

  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setBrands(data || []);
  };

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setGalleryImages(data || []);
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

  // --- STORAGE UPLOADER ---
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

  // --- FILE CHANGE LOGISTICS ---
  const handleProductFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImageFile(file);
      const img = new Image();
      img.onload = () => setProductImageDimensions({ width: img.width, height: img.height });
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
      img.onload = () => setGalleryImageDimensions({ width: img.width, height: img.height });
      img.src = URL.createObjectURL(file);
    } else {
      setGalleryImageFile(null);
      setGalleryImageDimensions(null);
    }
  };

  const handleBrandFileChange = (e) => {
    const file = e.target.files[0];
    setBrandLogoFile(file || null);
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
      if (uploadedUrl) finalImgUrl = uploadedUrl;
      else {
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
      const { error } = await supabase.from('products').update(payload).eq('id', selectedProductId);
      if (error) setProductFormMessage({ type: 'error', text: error.message });
      else {
        setProductFormMessage({ type: 'success', text: 'Product updated successfully!' });
        resetProductForm();
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from('products').insert([payload]);
      if (error) setProductFormMessage({ type: 'error', text: error.message });
      else {
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
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (!error) fetchProducts();
      else alert('Error: ' + error.message);
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
    const { error } = await supabase.from('categories').insert([{ name: categoryName.trim() }]);
    if (error) setCategoryFormMessage({ type: 'error', text: error.message });
    else {
      setCategoryFormMessage({ type: 'success', text: `Category "${categoryName}" added successfully!` });
      setCategoryName('');
      fetchCategories();
    }
    setLoading(false);
  };

  const handleCategoryDeleteClick = async (catId, catName) => {
    if (window.confirm(`Are you sure you want to delete category "${catName}"?`)) {
      setLoading(true);
      const { error } = await supabase.from('categories').delete().eq('id', catId);
      if (!error) fetchCategories();
      else alert('Error: ' + error.message);
      setLoading(false);
    }
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !subcategoryParent) return;

    setLoading(true);
    setSubcategoryFormMessage(null);
    const { error } = await supabase.from('subcategories').insert([{
      name: subcategoryName.trim(),
      category_name: subcategoryParent
    }]);
    if (error) setSubcategoryFormMessage({ type: 'error', text: error.message });
    else {
      setSubcategoryFormMessage({ type: 'success', text: `Subcategory "${subcategoryName}" added!` });
      setSubcategoryName('');
      fetchSubcategories();
    }
    setLoading(false);
  };

  const handleSubcategoryDeleteClick = async (subcatId, subcatName) => {
    if (window.confirm(`Are you sure you want to delete subcategory "${subcatName}"?`)) {
      setLoading(true);
      const { error } = await supabase.from('subcategories').delete().eq('id', subcatId);
      if (!error) fetchSubcategories();
      else alert('Error: ' + error.message);
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
      if (uploadedUrl) finalLogoUrl = uploadedUrl;
      else {
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
      const { error } = await supabase.from('brands').update(payload).eq('id', selectedBrandId);
      if (error) setBrandFormMessage({ type: 'error', text: error.message });
      else {
        setBrandFormMessage({ type: 'success', text: 'Brand updated successfully!' });
        resetBrandForm();
        fetchBrands();
      }
    } else {
      const { error } = await supabase.from('brands').insert([payload]);
      if (error) setBrandFormMessage({ type: 'error', text: error.message });
      else {
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
      const { error } = await supabase.from('brands').delete().eq('id', brandId);
      if (!error) fetchBrands();
      else alert('Error: ' + error.message);
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
    if (!galleryImageFile) return;

    setLoading(true);
    setGalleryUploading(true);
    setGalleryFormMessage(null);

    const uploadedUrl = await uploadImageToStorage(galleryImageFile, 'gallery');

    if (uploadedUrl) {
      const { error } = await supabase.from('gallery').insert([{
        src: uploadedUrl,
        title: 'Gallery Image',
        desc_text: ''
      }]);

      if (error) setGalleryFormMessage({ type: 'error', text: error.message });
      else {
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
      const { error } = await supabase.from('gallery').delete().eq('id', imageId);
      if (!error) fetchGalleryImages();
      else alert('Error: ' + error.message);
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

    await Promise.all([
      supabase.from('gallery').update({ created_at: timeTarget }).eq('id', newImages[index].id),
      supabase.from('gallery').update({ created_at: timeIndex }).eq('id', newImages[targetIndex].id)
    ]);
    
    await fetchGalleryImages();
    setLoading(false);
  };

  return {
    session,
    email, setEmail,
    password, setPassword,
    loading,
    authError,
    activeTab, setActiveTab,
    products,
    categories,
    subcategories,
    brands,
    galleryImages,
    listLoading,
    editProductMode,
    productFormData, setProductFormData,
    productImageFile,
    productImageDimensions,
    productUploading,
    productFormMessage,
    categoryName, setCategoryName,
    categoryFormMessage,
    subcategoryName, setSubcategoryName,
    subcategoryParent, setSubcategoryParent,
    subcategoryFormMessage,
    editBrandMode,
    brandFormData, setBrandFormData,
    brandLogoFile,
    brandUploading,
    brandFormMessage,
    galleryImageFile,
    galleryImageDimensions,
    galleryUploading,
    galleryFormMessage,
    handleLogin,
    handleLogout,
    handleProductFileChange,
    handleGalleryFileChange,
    handleBrandFileChange,
    handleProductSubmit,
    handleProductEditClick,
    handleProductDeleteClick,
    resetProductForm,
    fetchProducts,
    handleCategorySubmit,
    handleCategoryDeleteClick,
    handleSubcategorySubmit,
    handleSubcategoryDeleteClick,
    handleBrandSubmit,
    handleBrandEditClick,
    handleBrandDeleteClick,
    resetBrandForm,
    handleGallerySubmit,
    handleGalleryDeleteClick,
    handleMoveGalleryImage
  };
}
