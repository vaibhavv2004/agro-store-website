import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', crop: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', crop: '', message: '' });
    }, 3000);
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Banner */}
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
          <h1 className="text-4xl font-bold text-white">Contact Eachur Agro Store</h1>
          <p className="mt-4 text-white max-w-xl mx-auto px-4">
            Have inquiries or need advice? Send us a message or visit our store.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Info & Form */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-custom shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-dark mb-6">Send Us a Message</h3>
              {submitted ? (
                <div className="bg-primary-light text-primary p-4 rounded-lg font-medium text-sm text-center">
                  ✅ Thank you! We will get back to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1">Crop Type (Optional)</label>
                      <input 
                        type="text"
                        value={form.crop}
                        onChange={(e) => setForm({...form, crop: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">Message</label>
                    <textarea 
                      rows="4" 
                      required
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary-custom">
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Map & Details */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-custom shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-2xl font-bold text-dark">Store Details</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center text-xl flex-shrink-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-dark">Location</h5>
                    <p className="text-lightText text-sm mt-1">Eachur, Kannur, Kerala</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center text-xl flex-shrink-0">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-dark">Phone</h5>
                    <p className="text-lightText text-sm mt-1">+91 9446062168</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center text-xl flex-shrink-0">
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-dark">WhatsApp</h5>
                    <p className="text-lightText text-sm mt-1">Chat with us anytime for instant advice</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center text-xl flex-shrink-0">
                    <i className="fa-solid fa-clock"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-dark">Business Hours</h5>
                    <p className="text-lightText text-sm mt-1">Monday - Saturday: 9:00 AM - 6:00 PM <br />Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="https://maps.app.goo.gl/UdKg31z9usd4DFJV7?g_st=am" target="_blank" rel="noopener noreferrer" className="btn-primary-custom flex items-center gap-2">
                  <i className="fa-solid fa-location-arrow"></i> Get Directions
                </a>
                <a href="tel:+919446062168" className="btn-outline-success flex items-center gap-2">
                  <i className="fa-solid fa-phone"></i> Call Now
                </a>
              </div>
            </div>

            {/* Visual Store Map Placeholder wrapped as link */}
            <a 
              href="https://maps.app.goo.gl/UdKg31z9usd4DFJV7?g_st=am" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block rounded-custom overflow-hidden shadow-sm aspect-video bg-gray-150 relative hover:opacity-90 transition-all duration-300 group"
            >
              <img 
                src="/assets/images/about/store.png" 
                alt="Store Map Location" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1589923188900-85dae023348b?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors flex items-center justify-center">
                <span className="bg-white/90 text-dark font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm">
                  📍 Click to view on Google Maps
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
