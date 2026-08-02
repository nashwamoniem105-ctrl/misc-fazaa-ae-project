import { useState, useEffect } from 'react'
import RegistrationFormArabic from './components/RegistrationFormArabic'
import RegistrationFormEnglish from './components/RegistrationFormEnglish'
import Payment from './components/Payment'
import AdminPanel from './components/AdminPanel'

type Page = 'home' | 'payment' | 'admin'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const path = window.location.pathname
    if (path === '/payment') return 'payment'
    if (path === '/admin') return 'admin'
    return 'home'
  })
  const [language, setLanguage] = useState<'ar' | 'en'>('ar')

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'))
  }

  const navigateTo = (page: Page) => {
    setCurrentPage(page)
    if (page === 'home') window.history.pushState({}, '', '/')
    else if (page === 'payment') window.history.pushState({}, '', '/payment')
    else if (page === 'admin') window.history.pushState({}, '', '/admin')
  }

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/payment') setCurrentPage('payment')
      else if (path === '/admin') setCurrentPage('admin')
      else setCurrentPage('home')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (currentPage === 'admin') {
    return <AdminPanel onBackToHome={() => navigateTo('home')} />
  }

  if (currentPage === 'payment') {
    return <Payment onBackToHome={() => navigateTo('home')} />
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Main Container */}
      <div className="max-w-[843px] mx-auto relative min-h-screen sm:min-h-0 overflow-x-hidden">
        
        {/* Language Switcher */}
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

        {/* Admin link */}
        <div className="flex justify-start px-4 py-1">
          <button 
            onClick={() => navigateTo('admin')}
            className="text-[10px] text-gray-400 hover:text-gray-600 transition"
          >
            {language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
          </button>
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
