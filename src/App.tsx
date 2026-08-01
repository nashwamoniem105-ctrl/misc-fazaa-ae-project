import { useState, useEffect } from 'react';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import Sheikh from './components/Sheikh';
import Footer from './components/Footer';
import type { Language } from './translations';

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className={`min-h-screen bg-[#e9e9e9] flex flex-col items-center py-0 md:py-8 ${language === 'ar' ? 'font-alexandria' : ''}`}>
      <div className="main-container">
        <Header language={language} onToggleLanguage={toggleLanguage} />
        <main className="w-full">
          <RegistrationForm language={language} />
          <Sheikh language={language} />
        </main>
        <Footer language={language} />
      </div>
    </div>
  );
}

export default App;
