function Gallery() {
  const images = [
    { src: 'assests/images/gallery/gallery1.jpg', title: 'Store Front', desc: 'Eachur Agro Store entrance ready to serve customers.' },
    { src: 'assests/images/gallery/gallery2.jpg', title: 'Organic Manure Section', desc: 'Various bio fertilizers and vermicompost stock.' },
    { src: 'assests/images/gallery/gallery3.jpg', title: 'Premium Seed Rack', desc: 'Organized selection of high-yield vegetable seeds.' },
    { src: 'assests/images/gallery/gallery4.jpg', title: 'Agricultural Sprayers', desc: 'Battery-operated and manual sprayer display.' },
    { src: 'assests/images/gallery/gallery5.jpg', title: 'Crop Protection Shelf', desc: 'Authorized pesticides, fungicides and insecticides.' },
    { src: 'assests/images/gallery/gallery6.jpg', title: 'Home Gardening Pots', desc: 'Terracotta, plastic pots and micro gardening tools.' },
    { src: 'assests/images/gallery/gallery7.jpg', title: 'Drip Irrigation Fittings', desc: 'Sprinklers, drip lines, and water pipes for farm setups.' },
    { src: 'assests/images/gallery/gallery8.jpg', title: 'Bio-stimulants Collection', desc: 'Organic booster sprays and growth regulators.' },
    { src: 'assests/images/gallery/gallery9.jpg', title: 'Customer Consulting Desk', desc: 'Providing crop diagnostic support and guidelines.' }
  ];

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Store & Activity Gallery</h1>
        <p className="mt-4 text-white/80 max-w-xl mx-auto px-4">
          A visual tour of our store layouts, stock collections, and community outreach.
        </p>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <div 
              key={index}
              className="bg-white rounded-[20px] overflow-hidden shadow-custom border border-gray-100 group cursor-pointer"
            >
              <div className="aspect-video bg-gray-100 overflow-hidden relative">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600&sig=${index + 10}`;
                  }}
                />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-dark text-lg mb-2">{img.title}</h4>
                <p className="text-lightText text-sm leading-relaxed">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
