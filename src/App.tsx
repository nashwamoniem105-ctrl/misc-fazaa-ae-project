import { useState } from 'react'
import RegistrationFormArabic from './components/RegistrationFormArabic'
import RegistrationFormEnglish from './components/RegistrationFormEnglish'

function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'))
  }

  return (
    <div className="min-h-screen bg-[#e9e9e9]">
      {/* Language Switcher - Positioned exactly as in original site */}
      <div className="max-w-[843px] mx-auto relative">
        <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-50`}>
          <div 
            onClick={toggleLanguage}
            className="flex items-center cursor-pointer bg-[#455a64] rounded-full p-[2px] w-[52px] h-[26px] relative shadow-sm"
          >
            <div className={`absolute w-[22px] h-[22px] bg-white rounded-full shadow-sm transform transition-transform duration-200 flex items-center justify-center text-[9px] font-bold text-[#455a64] ${language === 'ar' ? 'translate-x-0' : 'translate-x-[26px]'}`}>
              {language === 'ar' ? 'EN' : 'AR'}
            </div>
            <span className={`text-[9px] font-bold text-white absolute ${language === 'ar' ? 'right-2' : 'left-2'}`}>
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
