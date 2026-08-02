import { useState } from 'react'
import RegistrationFormArabic from './components/RegistrationFormArabic'
import RegistrationFormEnglish from './components/RegistrationFormEnglish'

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'))
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Language Switcher - Exact match for the target site */}
      <div className="max-w-[800px] mx-auto relative">
        <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-50`}>
          <div 
            onClick={toggleLanguage}
            className="flex items-center cursor-pointer bg-[#455a64] rounded-full p-1 w-14 h-7 relative transition-all duration-300"
          >
            <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-[10px] font-bold text-[#455a64] ${language === 'ar' ? 'translate-x-0' : 'translate-x-7'}`}>
              {language === 'ar' ? 'EN' : 'AR'}
            </div>
            <span className={`text-[10px] font-bold text-white absolute ${language === 'ar' ? 'right-2' : 'left-2'}`}>
              {language === 'ar' ? 'EN' : 'AR'}
            </span>
          </div>
        </div>
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
