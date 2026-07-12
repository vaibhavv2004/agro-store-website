import WhyChooseUs from '../components/home/WhyChooseUs';

function About() {
  return (
    <div>
      {/* Page Header */}
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
          <h1 className="text-4xl font-bold text-white">About Eachur Agro Store</h1>
          <p className="mt-4 text-white max-w-xl mx-auto">
            Empowering Kanur's agricultural community with quality inputs and professional advice since inception.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-background p-8 rounded-custom border border-gray-100 shadow-sm">
              <div className="text-primary text-3xl mb-4">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Our Mission</h3>
              <p className="text-lightText leading-relaxed">
                To supply genuine, high-yield seeds, eco-friendly organic products, and advanced tools at affordable rates. We aim to help local farmers maximize crop yield while preserving the ecological health of the soil.
              </p>
            </div>
            
            <div className="bg-background p-8 rounded-custom border border-gray-100 shadow-sm">
              <div className="text-primary text-3xl mb-4">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Our Vision</h3>
              <p className="text-lightText leading-relaxed">
                To become the leading agricultural partner in Kannur, recognized for introducing modern, sustainable farming techniques, premium crop protection, and reliable irrigation solutions to every household.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us component */}
      <WhyChooseUs />
    </div>
  );
}

export default About;
