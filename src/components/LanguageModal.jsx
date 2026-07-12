import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

function LanguageModal() {
  const { showLanguageModal, setLanguage, language: currentLang } = useLanguage();
  const [selectedLang, setSelectedLang] = useState(currentLang || 'en');

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (showLanguageModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showLanguageModal]);

  if (!showLanguageModal) return null;

  const handleContinue = () => {
    setLanguage(selectedLang);
  };

  const getHeadingText = () => {
    if (selectedLang === 'ml') return 'ഭാഷ തിരഞ്ഞെടുക്കുക';
    if (selectedLang === 'ta') return 'மொழியைத் தேர்ந்தெடுக்கவும்';
    if (selectedLang === 'hi') return 'भाषा चुनें';
    return 'Select Your Language';
  };

  const getSubtitleText = () => {
    if (selectedLang === 'ml') {
      return 'ഏച്ചൂർ അഗ്രോ സ്റ്റോറിലേക്ക് സ്വാഗതം. നിങ്ങളുടെ ഷോപ്പിംഗ് അനുഭവം കൂടുതൽ എളുപ്പമാക്കാൻ ഇഷ്ടമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക.';
    }
    if (selectedLang === 'ta') {
      return 'ஈச்சூர் அக்ரோ ஸ்டோருக்கு உங்களை வரவேற்கிறோம். உங்கள் ஷாப்பிங் அனுபவத்தைத் தனிப்பयனாக்க உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.';
    }
    if (selectedLang === 'hi') {
      return 'ईचूर एग्रो स्टोर में आपका स्वागत है। अपने शॉपिंग अनुभव को बेहतर बनाने के लिए कृपया अपनी पसंदीदा भाषा चुनें।';
    }
    return 'Welcome to Eachur Agro Store. Please choose your preferred language to customize your shopping experience.';
  };

  const getButtonText = () => {
    if (selectedLang === 'ml') return 'തുടരുക';
    if (selectedLang === 'ta') return 'தொடரவும்';
    if (selectedLang === 'hi') return 'जारी रखें';
    return 'Continue';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-md"></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 scale-100 flex flex-col items-center p-6 text-center animate-fade-in animate-float-custom">
        {/* Decorative Top Leaf Sprout */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <span className="text-2xl">🌱</span>
        </div>

        <h3 className="text-xl font-bold text-dark mb-1.5">
          {getHeadingText()}
        </h3>
        
        <p className="text-lightText text-[11px] mb-6 px-1 leading-relaxed">
          {getSubtitleText()}
        </p>

        {/* Options */}
        <div className="w-full max-h-[170px] overflow-y-auto pr-1.5 space-y-2 mb-6 custom-scrollbar">
          {/* English */}
          <button
            onClick={() => setSelectedLang('en')}
            className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
              selectedLang === 'en'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-100 hover:border-primary/30 text-dark'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🇬🇧</span>
              <div className="text-left">
                <p className="font-semibold text-xs">English</p>
                <p className="text-[9px] text-lightText">Shop in English</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              selectedLang === 'en' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedLang === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
            </div>
          </button>

          {/* Malayalam */}
          <button
            onClick={() => setSelectedLang('ml')}
            className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
              selectedLang === 'ml'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-100 hover:border-primary/30 text-dark'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🇮🇳</span>
              <div className="text-left">
                <p className="font-semibold text-xs">മലയാളം</p>
                <p className="text-[9px] text-lightText">മലയാളത്തിൽ കാണുക</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              selectedLang === 'ml' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedLang === 'ml' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
            </div>
          </button>

          {/* Tamil */}
          <button
            onClick={() => setSelectedLang('ta')}
            className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
              selectedLang === 'ta'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-100 hover:border-primary/30 text-dark'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🇮🇳</span>
              <div className="text-left">
                <p className="font-semibold text-xs">தமிழ்</p>
                <p className="text-[9px] text-lightText">தமிழில் பார்க்க</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              selectedLang === 'ta' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedLang === 'ta' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
            </div>
          </button>

          {/* Hindi */}
          <button
            onClick={() => setSelectedLang('hi')}
            className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
              selectedLang === 'hi'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-100 hover:border-primary/30 text-dark'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🇮🇳</span>
              <div className="text-left">
                <p className="font-semibold text-xs">हिन्दी</p>
                <p className="text-[9px] text-lightText">हिंदी में देखें</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              selectedLang === 'hi' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedLang === 'hi' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
            </div>
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-primary hover:bg-accent text-white py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98] duration-300 text-sm"
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}

export default LanguageModal;
