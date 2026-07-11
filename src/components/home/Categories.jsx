import { useNavigate } from 'react-router-dom';

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { icon: '🌱', title: 'Seeds', desc: 'High quality vegetable, fruit and crop seeds.' },
    { icon: '🌾', title: 'Fertilizers', desc: 'Organic and chemical fertilizers for all crops.' },
    { icon: '🧪', title: 'Crop Protection', desc: 'Pesticides, fungicides and insecticides.' },
    { icon: '🌿', title: 'Organic Products', desc: 'Bio fertilizers, compost and eco-friendly solutions.' },
    { icon: '🚿', title: 'Sprayers', desc: 'Manual and battery-operated agricultural sprayers.' },
    { icon: '🪴', title: 'Garden Products', desc: 'Pots, tools, plants and home gardening essentials.' }
  ];

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
