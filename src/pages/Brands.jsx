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
      <section className="relative bg-dark h-52 sm:h-60 flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Green Color Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-[#1B4D2A]/90"></div>
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 C25 15, 35 15, 35 25 C35 35, 25 35, 20 20 C15 35, 5 35, 5 25 C5 15, 15 15, 20 5 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-bold text-white">Trusted Brands We Partner With</h1>
          <p className="mt-4 text-white max-w-xl mx-auto px-4">
            We stock products from leading national and international agro brands to guarantee quality and authenticity.
          </p>
        </div>
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
