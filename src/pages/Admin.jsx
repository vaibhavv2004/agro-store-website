import useAdminState from '../components/admin/useAdminState';

// Import sub-components
import AdminLogin from '../components/admin/AdminLogin';
import AdminProductsTab from '../components/admin/AdminProductsTab';
import AdminCategoriesTab from '../components/admin/AdminCategoriesTab';
import AdminBrandsTab from '../components/admin/AdminBrandsTab';
import AdminGalleryTab from '../components/admin/AdminGalleryTab';

function Admin() {
  const state = useAdminState();

  // Render auth lock screen
  if (!state.session) {
    return (
      <AdminLogin
        email={state.email}
        setEmail={state.setEmail}
        password={state.password}
        setPassword={state.setPassword}
        loading={state.loading}
        authError={state.authError}
        handleLogin={state.handleLogin}
      />
    );
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark flex items-center gap-2">⚙️ Store Settings</h1>
            <p className="text-lightText text-sm mt-1">Logged in as {state.session.user.email}</p>
          </div>
          <button
            onClick={state.handleLogout}
            className="bg-gray-150 hover:bg-gray-200 text-dark px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-gray-200 mb-8 gap-2 overflow-x-auto whitespace-nowrap pb-2">
          <button
            onClick={() => state.setActiveTab('products')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              state.activeTab === 'products' ? 'border-primary text-primary' : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            📦 Products
          </button>
          <button
            onClick={() => state.setActiveTab('categories')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              state.activeTab === 'categories' ? 'border-primary text-primary' : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            🏷️ Categories
          </button>
          <button
            onClick={() => state.setActiveTab('brands')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              state.activeTab === 'brands' ? 'border-primary text-primary' : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            🤝 Partner Brands
          </button>
          <button
            onClick={() => state.setActiveTab('gallery')}
            className={`px-5 py-2.5 font-bold text-sm border-b-2 transition-all ${
              state.activeTab === 'gallery' ? 'border-primary text-primary' : 'border-transparent text-lightText hover:text-dark'
            }`}
          >
            🖼️ Gallery Upload
          </button>
        </div>

        {/* Tab Display Router */}
        {state.activeTab === 'products' && (
          <AdminProductsTab
            products={state.products}
            categories={state.categories}
            subcategories={state.subcategories}
            listLoading={state.listLoading}
            editProductMode={state.editProductMode}
            productFormData={state.productFormData}
            setProductFormData={state.setProductFormData}
            productImageFile={state.productImageFile}
            productImageDimensions={state.productImageDimensions}
            productUploading={state.productUploading}
            productFormMessage={state.productFormMessage}
            handleProductSubmit={state.handleProductSubmit}
            handleProductEditClick={state.handleProductEditClick}
            handleProductDeleteClick={state.handleProductDeleteClick}
            resetProductForm={state.resetProductForm}
            fetchProducts={state.fetchProducts}
            handleProductFileChange={state.handleProductFileChange}
            loading={state.loading}
          />
        )}

        {state.activeTab === 'categories' && (
          <AdminCategoriesTab
            categories={state.categories}
            categoryName={state.categoryName}
            setCategoryName={state.setCategoryName}
            categoryFormMessage={state.categoryFormMessage}
            handleCategorySubmit={state.handleCategorySubmit}
            handleCategoryDeleteClick={state.handleCategoryDeleteClick}
            subcategories={state.subcategories}
            subcategoryName={state.subcategoryName}
            setSubcategoryName={state.setSubcategoryName}
            subcategoryParent={state.subcategoryParent}
            setSubcategoryParent={state.setSubcategoryParent}
            subcategoryFormMessage={state.subcategoryFormMessage}
            handleSubcategorySubmit={state.handleSubcategorySubmit}
            handleSubcategoryDeleteClick={state.handleSubcategoryDeleteClick}
            loading={state.loading}
          />
        )}

        {state.activeTab === 'brands' && (
          <AdminBrandsTab
            categories={state.categories}
            brands={state.brands}
            editBrandMode={state.editBrandMode}
            brandFormData={state.brandFormData}
            setBrandFormData={state.setBrandFormData}
            brandLogoFile={state.brandLogoFile}
            brandUploading={state.brandUploading}
            brandFormMessage={state.brandFormMessage}
            handleBrandSubmit={state.handleBrandSubmit}
            handleBrandEditClick={state.handleBrandEditClick}
            handleBrandDeleteClick={state.handleBrandDeleteClick}
            resetBrandForm={state.resetBrandForm}
            handleBrandFileChange={state.handleBrandFileChange}
            loading={state.loading}
          />
        )}

        {state.activeTab === 'gallery' && (
          <AdminGalleryTab
            galleryImages={state.galleryImages}
            galleryImageFile={state.galleryImageFile}
            galleryImageDimensions={state.galleryImageDimensions}
            galleryUploading={state.galleryUploading}
            galleryFormMessage={state.galleryFormMessage}
            handleGallerySubmit={state.handleGallerySubmit}
            handleGalleryDeleteClick={state.handleGalleryDeleteClick}
            handleMoveGalleryImage={state.handleMoveGalleryImage}
            handleGalleryFileChange={state.handleGalleryFileChange}
            loading={state.loading}
          />
        )}

      </div>
    </div>
  );
}

export default Admin;
