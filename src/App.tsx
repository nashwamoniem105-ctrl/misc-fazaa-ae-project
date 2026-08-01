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
    <div className={`min-h-screen bg-gray-100 flex flex-col items-center py-4 md:py-10 ${language === 'ar' ? 'font-alexandria' : ''}`}>
      <div className="main-container w-full max-w-[900px] bg-white rounded-lg shadow-xl overflow-hidden">
        <Header language={language} onToggleLanguage={toggleLanguage} />
        <main className="px-6 md:px-12 py-8">
          <RegistrationForm language={language} />
          <Sheikh language={language} />
        </main>
        <Footer language={language} />
      </div>
    </div>
  );
}

export default App;
