import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Cookie helper
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  
  // Set cookie for host name
  document.cookie = `${name}=${value}${expires}; path=/`;
  
  // Also set for domain if not localhost
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    document.cookie = `${name}=${value}${expires}; path=/; domain=.${window.location.hostname}`;
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    // 1. Create hidden element for Google Translate
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    // 2. Define callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ml,ta,hi',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    // 3. Load script dynamically
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 4. Retrieve language preference
    const savedLang = localStorage.getItem('agro_store_lang');
    if (savedLang) {
      setLanguageState(savedLang);
      // Ensure the cookie is correctly synchronized
      setCookie('googtrans', `/en/${savedLang}`, 30);
    } else {
      setShowLanguageModal(true);
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('agro_store_lang', lang);
    setCookie('googtrans', `/en/${lang}`, 30);
    setShowLanguageModal(false);
    
    // Reload the page to let Google Translate initialize and translate dynamic API data cleanly
    window.location.reload();
  };

  // Keep a basic local translation check for instantaneous navigation titles
  // but fallback to standard text since Google Translate does page translation.
  const t = (key) => {
    const translations = {
      en: {
        home: 'Home', about: 'About', products: 'Products', brands: 'Brands',
        gallery: 'Gallery', faq: 'FAQ', contact: 'Contact', cart: 'Cart', admin: 'Admin',
        whatsapp: 'WhatsApp', loadingProducts: 'Nourishing the catalog...'
      },
      ml: {
        home: 'ഹോം', about: 'ഞങ്ങളെക്കുറിച്ച്', products: 'ഉൽപ്പന്നങ്ങൾ', brands: 'ബ്രാൻഡുകൾ',
        gallery: 'ഗാലറി', faq: 'ചോദ്യോത്തരങ്ങൾ', contact: 'ബന്ധപ്പെടുക', cart: 'കാർട്ട്', admin: 'അഡ്മിൻ',
        whatsapp: 'വാട്സാപ്പ്', loadingProducts: 'വിവരങ്ങൾ ശേഖരിക്കുന്നു...'
      },
      ta: {
        home: 'முகப்பு', about: 'எங்களைப் பற்றி', products: 'தயாரிப்புகள்', brands: 'பிராண்டுகள்',
        gallery: 'கேலரி', faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', contact: 'தொடர்பு', cart: 'வண்டி', admin: 'நிர்வாகி',
        whatsapp: 'வாட்ஸ்அப்', loadingProducts: 'தயாரிப்புகளை ஏற்றுகிறது...'
      },
      hi: {
        home: 'होम', about: 'हमारे बारे में', products: 'उत्पाद', brands: 'ब्रांड',
        gallery: 'गैलरी', faq: 'एफएक्यू', contact: 'संपर्क', cart: 'कार्ट', admin: 'व्यवस्थापक',
        whatsapp: 'व्हाट्सएप', loadingProducts: 'उत्पादों को लोड किया जा रहा है...'
      }
    };
    return translations[language]?.[key] || key;
  };

  const translateDbText = (object, fieldName) => {
    return object ? (object[fieldName] || '') : '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateDbText, showLanguageModal, setShowLanguageModal }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
