function WhyChooseUs() {
  const points = [
    { icon: 'fa-shield-halved', title: 'Genuine Products', desc: 'Authentic agricultural products from trusted manufacturers.' },
    { icon: 'fa-seedling', title: 'Expert Guidance', desc: 'Professional advice for better crop growth and farming.' },
    { icon: 'fa-tags', title: 'Trusted Brands', desc: 'Reliable agricultural brands with proven quality.' },
    { icon: 'fa-wheat-awn', title: 'Wide Range', desc: 'Everything from seeds to irrigation products.' },
    { icon: 'fa-indian-rupee-sign', title: 'Affordable Prices', desc: 'Best value products at farmer-friendly prices.' },
    { icon: 'fa-handshake', title: 'Customer First', desc: 'We are committed to customer satisfaction every day.' }
  ];

  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Why Choose Eachur Agro Store?
            </h2>
            <p className="text-lightText text-base mb-12 max-w-xl">
              We are committed to providing quality agricultural products, expert guidance and trusted solutions for every farmer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {points.map((point, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-[20px] text-center hover:shadow-whyCardHover hover:-translate-y-2 transition-all duration-[350ms] border border-gray-50 flex flex-col items-center h-full shadow-whyCard"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl mb-5 shadow-sm">
                    <i className={`fa-solid ${point.icon}`}></i>
                  </div>
                  <h5 className="font-bold text-dark text-lg mb-3">{point.title}</h5>
                  <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src="/assets/images/about/store.png" 
              alt="Eachur Agro Store"
              className="rounded-[20px] shadow-lg max-w-[500px] w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1589923188900-85dae023348b?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
