function Testimonials() {
  const reviews = [
    {
      stars: 5,
      text: '"Excellent service and quality products. They always suggest the right products for my crops."',
      role: 'Farmer',
      loc: 'Eachur'
    },
    {
      stars: 5,
      text: '"Good quality seeds and fertilizers. Friendly staff and affordable prices."',
      role: 'Customer',
      loc: 'Kannur'
    },
    {
      stars: 5,
      text: '"Highly recommend this store. Genuine products and expert guidance."',
      role: 'Farmer',
      loc: 'Kannur'
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark">
            What Our Customers Say
          </h2>
          <p className="text-lightText mt-4 max-w-2xl mx-auto text-base">
            Trusted by farmers across Eachur and nearby areas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[20px] p-8 shadow-whyCard hover:shadow-whyCardHover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between border border-gray-100 text-center h-full"
            >
              <div>
                <div className="flex justify-center gap-1 text-accent mb-5">
                  {[...Array(rev.stars)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <p className="text-gray-600 italic text-base leading-relaxed mb-6">
                  {rev.text}
                </p>
              </div>
              <div>
                <h5 className="font-bold text-dark text-lg">{rev.role}</h5>
                <span className="text-primary text-sm font-medium mt-1 inline-block">{rev.loc}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
