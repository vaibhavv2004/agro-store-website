function Brands() {
  const brands = [
    { name: 'IFFCO', category: 'Fertilizers', desc: 'Indian Farmers Fertiliser Cooperative Limited, a leader in organic and chemical fertilizers.' },
    { name: 'Syngenta', category: 'Crop Protection', desc: 'Global leader in crop science, providing world-class seeds and pesticides.' },
    { name: 'Bayer Crop Science', category: 'Crop Protection', desc: 'Pioneers in fungicides, insecticides, and crop yield enhancement solutions.' },
    { name: 'Mahadhan', category: 'Fertilizers', desc: 'Premium quality specialty fertilizers for fruits, vegetables, and cash crops.' },
    { name: 'Seminis Seeds', category: 'Seeds', desc: 'High-quality vegetable seed solutions for maximum yield and disease protection.' },
    { name: 'Falcon Garden Tools', category: 'Garden Products', desc: 'High-grade agriculture and home gardening hand tools and equipment.' }
  ];

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Trusted Brands We Partner With</h1>
        <p className="mt-4 text-white/80 max-w-xl mx-auto px-4">
          We stock products from leading national and international agro brands to guarantee quality and authenticity.
        </p>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-custom shadow-custom border border-gray-100 flex flex-col justify-between h-full hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <span className="inline-block bg-primary-light text-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
                  {brand.category}
                </span>
                <h3 className="text-2xl font-bold text-dark mb-4">{brand.name}</h3>
                <p className="text-lightText text-sm leading-relaxed">{brand.desc}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs text-primary font-semibold flex items-center gap-1">
                  <i className="fa-solid fa-circle-check"></i> Authorized Dealer
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;
