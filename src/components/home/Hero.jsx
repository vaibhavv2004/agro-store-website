import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Content */}
          <div className="flex flex-col items-start justify-between h-full">
            <div className="w-full">
              <span className="bg-primary-light text-primary px-4 py-2 rounded-full font-semibold text-sm">
                🌱 Trusted Agricultural Store
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.3rem] font-bold text-dark mt-6 leading-tight">
                Empowering Farmers with <br />
                <span className="text-primary">Quality Agricultural Solutions</span>
              </h1>
              
              <p className="text-lightText mt-6 text-lg max-w-xl">
                We provide quality seeds, fertilizers, pesticides, garden products and agricultural solutions for healthy crops and better yields.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto">
                <Link to="/products" className="btn-primary-custom text-center w-full sm:w-auto">
                  Explore Products
                </Link>
                <Link to="/contact" className="btn-outline-success text-center w-full sm:w-auto">
                  Contact Us
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-12 pt-8 border-t border-borderCol w-full">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary">👨‍🌾 500+</h3>
                <p className="text-lightText text-xs sm:text-sm mt-1">Happy Customers</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary">🏢 50+</h3>
                <p className="text-lightText text-xs sm:text-sm mt-1">Trusted Brands</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary">📦 500+</h3>
                <p className="text-lightText text-xs sm:text-sm mt-1">Products</p>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="flex justify-center h-full min-h-[350px] lg:min-h-full">
            <img 
              src="/assets/images/hero/hero2.jpg" 
              alt="Agriculture Hero" 
              className="w-full h-full object-cover rounded-[20px] animate-float-custom"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
