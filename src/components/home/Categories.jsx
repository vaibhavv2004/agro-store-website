import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const PRESETS = {
  'Seeds': { icon: '🌱', desc: 'High quality vegetable, fruit and crop seeds.' },
  'Fertilizers': { icon: '🌾', desc: 'Organic and chemical fertilizers for all crops.' },
  'Crop Protection': { icon: '🧪', desc: 'Pesticides, fungicides and insecticides.' },
  'Organic Products': { icon: '🌿', desc: 'Bio fertilizers, compost and eco-friendly solutions.' },
  'Sprayers': { icon: '🚿', desc: 'Manual and battery-operated agricultural sprayers.' },
  'Garden Products': { icon: '🪴', desc: 'Pots, tools, plants and home gardening essentials.' }
};

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600';

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped = data.map(cat => {
          const preset = PRESETS[cat.name] || { icon: '📦', desc: 'Quality agricultural products and solutions.' };
          return {
            title: cat.name,
            icon: preset.icon,
            desc: preset.desc
          };
        });
        setCategories(mapped);
      } else {
        // Fallback static list
        setCategories(
          Object.keys(PRESETS).map(key => ({
            title: key,
            icon: PRESETS[key].icon,
            desc: PRESETS[key].desc
          }))
        );
      }
    } catch (err) {
      console.warn('Could not fetch categories from database:', err.message);
      setCategories(
        Object.keys(PRESETS).map(key => ({
          title: key,
          icon: PRESETS[key].icon,
          desc: PRESETS[key].desc
        }))
      );
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark">
            Product Categories
          </h2>
          <p className="text-lightText mt-4 max-w-2xl mx-auto text-base">
            Everything you need for healthy crops, better yields and successful farming.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => navigate('/products', { state: { category: cat.title } })}
              className="bg-white p-8 rounded-custom shadow-custom hover:shadow-hoverCard hover:-translate-y-2 transition-all duration-300 text-center cursor-pointer flex flex-col items-center border border-gray-50 h-full"
            >
              <div className="text-5xl mb-6">{cat.icon}</div>
              <h4 className="text-xl font-bold text-dark mb-4">{cat.title}</h4>
              <p className="text-lightText text-sm leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="btn-primary-custom inline-flex items-center gap-2"
          >
            View More Products <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Categories;
