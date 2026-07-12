function AdminCategoriesTab({
  categories,
  categoryName,
  setCategoryName,
  categoryFormMessage,
  handleCategorySubmit,
  handleCategoryDeleteClick,
  subcategories,
  subcategoryName,
  setSubcategoryName,
  subcategoryParent,
  setSubcategoryParent,
  subcategoryFormMessage,
  handleSubcategorySubmit,
  handleSubcategoryDeleteClick,
  loading
}) {
  return (
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
  );
}

export default AdminCategoriesTab;
