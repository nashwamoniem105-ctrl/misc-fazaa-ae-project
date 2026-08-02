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
      {/* Main Container */}
      <div className="max-w-[843px] mx-auto relative min-h-screen sm:min-h-0 overflow-x-hidden">
        
        {/* Language Switcher - Matches the screenshot layout perfectly */}
        <div className={`flex w-full px-4 pt-4 ${language === 'ar' ? 'justify-end' : 'justify-end'}`}>
          <div 
            onClick={toggleLanguage}
            className="flex items-center cursor-pointer bg-[#455a64] rounded-full p-[2px] w-[54px] h-[28px] relative shadow-sm z-50"
          >
            <div className={`absolute w-[24px] h-[24px] bg-white rounded-full shadow-md transform transition-transform duration-200 flex items-center justify-center text-[10px] font-bold text-[#455a64] ${language === 'ar' ? 'translate-x-0' : 'translate-x-[26px]'}`}>
              {language === 'ar' ? 'EN' : 'AR'}
            </div>
            <span className={`text-[10px] font-bold text-white absolute ${language === 'ar' ? 'left-[8px]' : 'right-[8px]'}`}>
              {language === 'ar' ? 'EN' : 'AR'}
            </span>
          </div>
        </div>

        {/* Content Wrapper */}
        <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {language === 'ar' ? (
            <RegistrationFormArabic />
          ) : (
            <RegistrationFormEnglish />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
