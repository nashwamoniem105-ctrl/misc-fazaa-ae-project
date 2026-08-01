import { useState, useEffect } from 'react';
import Header from './components/Header';
import Features from './components/Features';
import RegistrationForm from './components/RegistrationForm';
import Sheikh from './components/Sheikh';
import Footer from './components/Footer';

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>(() => {
    return (localStorage.getItem('language') as 'ar' | 'en') || 'ar';
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
    <div className="min-h-screen bg-gray-100" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <div className="container mx-auto bg-white shadow-lg">
        <Features language={language} />
        <RegistrationForm language={language} />
        <Sheikh language={language} />
      </div>
      <Footer language={language} />
    </div>
  );
}

export default App;
