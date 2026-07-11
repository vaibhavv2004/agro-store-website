import { Link } from 'react-router-dom';

function GalleryPreview() {
  const images = [
    { src: 'assests/images/gallery/gallery1.jpg', alt: 'Agro Store Front' },
    { src: 'assests/images/gallery/gallery2.jpg', alt: 'Fertilizer Stock' },
    { src: 'assests/images/gallery/gallery3.jpg', alt: 'Seed Packets' },
    { src: 'assests/images/gallery/gallery4.jpg', alt: 'Sprayers Selection' },
    { src: 'assests/images/gallery/gallery5.jpg', alt: 'Organic Pesticides' },
    { src: 'assests/images/gallery/gallery6.jpg', alt: 'Gardening Tools' }
  ];

  return (
    <section className="bg-[#F8FCF7] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark">
            Our Store Gallery
          </h2>
          <p className="text-lightText mt-4 max-w-2xl mx-auto text-base">
            Take a glimpse of Eachur Agro Store, our products, and our commitment to serving farmers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div 
              key={index}
              className="overflow-hidden rounded-[20px] shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer aspect-video bg-gray-100"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600&sig=${index}`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Link to="/gallery" className="btn-primary-custom inline-block">
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
}

export default GalleryPreview;
