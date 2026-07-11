function CTA() {
  return (
    <section className="bg-[#F5FAF3] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-secondary text-white py-14 px-6 sm:px-12 lg:px-16 rounded-[25px] text-center shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-5">
            Need Expert Farming Guidance?
          </h2>
          <p className="max-w-2xl mx-auto text-white/95 text-base sm:text-lg mb-8 leading-relaxed">
            Not sure which fertilizer, pesticide or seed is suitable for your crop? Visit Eachur Agro Store or contact us. Our team is happy to help.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+919446062168" 
              className="bg-white text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <i className="fa-solid fa-phone"></i>
              Call Now
            </a>
            <a 
              href="https://wa.me/919446062168"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 flex items-center gap-2"
            >
              <i className="fa-brands fa-whatsapp"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
