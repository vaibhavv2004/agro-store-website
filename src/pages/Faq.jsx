import { useState } from 'react';

const FAQS = [
  {
    question: 'What products are available at Eachur Agro Store?',
    answer: 'We offer a wide range of seeds, organic and chemical fertilizers, bio-compost, pesticides, insecticides, fungicides, sprayers, crop boosters, and home gardening essentials.'
  },
  {
    question: 'Can I get guidance before purchasing?',
    answer: 'Yes, absolutely. Our experienced team offers diagnostic assistance and guides you in selecting the right product and dosage based on your crop type and seasonal condition.'
  },
  {
    question: 'Where is your store located?',
    answer: 'Our store is located in Eachur, Kannur district, Kerala. You can easily find us on Google Maps (links and direction details are available on the Contact page).'
  },
  {
    question: 'Do you provide home delivery?',
    answer: 'Currently, we operate on-site sales at our store. Home delivery services and direct shipping for large orders are coming very soon.'
  },
  {
    question: 'What are your business hours?',
    answer: 'We are open from Monday through Saturday, from 9:00 AM to 6:00 PM. We are closed on Sundays.'
  }
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Banner */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-white/80 max-w-xl mx-auto px-4">
          Got questions? We have answers. If you do not find what you are looking for, feel free to contact us directly.
        </p>
      </section>

      {/* Accordion Container */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-custom border border-gray-100 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-dark font-bold text-base sm:text-lg focus:outline-none transition-colors hover:text-primary"
                >
                  <span>{faq.question}</span>
                  <span className={`transform transition-transform duration-300 text-primary ${isOpen ? 'rotate-180' : ''}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-gray-50' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 py-5 text-lightText text-sm sm:text-base leading-relaxed bg-gray-50/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Faq;
