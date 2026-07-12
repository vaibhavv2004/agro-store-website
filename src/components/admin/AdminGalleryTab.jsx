function AdminGalleryTab({
  galleryImages,
  galleryImageFile,
  galleryImageDimensions,
  galleryUploading,
  galleryFormMessage,
  handleGallerySubmit,
  handleGalleryDeleteClick,
  handleMoveGalleryImage,
  handleGalleryFileChange,
  loading
}) {
  return (
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
  );
}

export default AdminGalleryTab;
