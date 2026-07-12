function AdminBrandsTab({
  categories,
  brands,
  editBrandMode,
  brandFormData,
  setBrandFormData,
  brandLogoFile,
  brandUploading,
  brandFormMessage,
  handleBrandSubmit,
  handleBrandEditClick,
  handleBrandDeleteClick,
  resetBrandForm,
  handleBrandFileChange,
  loading
}) {
  return (
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
  );
}

export default AdminBrandsTab;
