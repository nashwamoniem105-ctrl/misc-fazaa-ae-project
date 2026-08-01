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
    <div className="min-h-screen bg-gray-50 font-alexandria" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <main>
        <Features language={language} />
        <RegistrationForm language={language} />
        <Sheikh language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}

export default App;
