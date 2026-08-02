import { useState } from 'react'
import RegistrationFormArabic from './components/RegistrationFormArabic'
import RegistrationFormEnglish from './components/RegistrationFormEnglish'

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLanguage('ar')}
          className={`px-4 py-2 rounded-l-lg font-bold transition-all ${
            language === 'ar'
              ? 'bg-gold-500 text-white'
              : 'bg-white text-gold-500 border border-gold-500'
          }`}
        >
          العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-r-lg font-bold transition-all ${
            language === 'en'
              ? 'bg-gold-500 text-white'
              : 'bg-white text-gold-500 border border-gold-500'
          }`}
        >
          English
        </button>
      </div>

      {/* Main Content */}
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {language === 'ar' ? (
          <RegistrationFormArabic />
        ) : (
          <RegistrationFormEnglish />
        )}
      </div>
    </div>
  )
}

export default App
