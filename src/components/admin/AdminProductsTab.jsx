import Loader from '../Loader';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600';

function AdminProductsTab({
  products,
  categories,
  subcategories,
  listLoading,
  editProductMode,
  productFormData,
  setProductFormData,
  productImageFile,
  productImageDimensions,
  productUploading,
  productFormMessage,
  handleProductSubmit,
  handleProductEditClick,
  handleProductDeleteClick,
  resetProductForm,
  fetchProducts,
  handleProductFileChange,
  loading
}) {
  // Filter subcategories matching current product category selection
  const activeProductSubcategories = subcategories.filter(
    sub => sub.category_name === productFormData.category
  );

  return (
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
  );
}

export default AdminProductsTab;
