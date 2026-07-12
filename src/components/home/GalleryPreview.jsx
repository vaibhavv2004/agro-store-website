import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function GalleryPreview() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreviewImages();
  }, []);

  const fetchPreviewImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      setImages(data || []);
    } catch (err) {
      console.warn('Could not fetch preview gallery images:', err.message);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Hide the gallery section completely on the homepage if there are no images uploaded
  if (loading || images.length === 0) return null;

  return (
    <section className="bg-[#F8FCF7] py-20 animate-fade-in">
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

        {/* Grid - dynamic masonry columns based on image dimensions */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <div 
              key={img.id || index}
              className="break-inside-avoid bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group cursor-pointer inline-block w-full"
            >
              <img 
                src={img.src} 
                alt="Store Activity Preview" 
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
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
