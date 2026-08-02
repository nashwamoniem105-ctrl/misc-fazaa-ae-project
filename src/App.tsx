import { useState } from 'react'
import RegistrationFormArabic from './components/RegistrationFormArabic'
import RegistrationFormEnglish from './components/RegistrationFormEnglish'

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Language Switcher - Matching target site style */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleLanguage}
          className="w-10 h-10 bg-[#1e3a5f] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg hover:bg-[#162d4a] transition-colors border-2 border-white"
        >
          {language === 'ar' ? 'EN' : 'AR'}
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
