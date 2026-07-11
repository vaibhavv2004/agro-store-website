import WhyChooseUs from '../components/home/WhyChooseUs';

function About() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About Eachur Agro Store</h1>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
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
