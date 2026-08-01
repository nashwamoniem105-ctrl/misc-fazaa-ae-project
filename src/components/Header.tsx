import { useState } from 'react';
import type { Language } from '../translations';
import { translations } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  const t = translations[language];
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <header className="relative">
      {/* Language Toggle Overlay */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div 
          onClick={onToggleLanguage}
          className="relative w-14 h-7 bg-[#2c3e50] rounded-full cursor-pointer p-1 transition-all duration-300"
        >
          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-[#2c3e50] ${language === 'en' ? 'left-1' : 'right-1'}`}>
            {language === 'en' ? 'EN' : 'AR'}
          </div>
          <span className={`absolute top-1.5 text-[10px] font-bold text-white transition-all duration-300 ${language === 'en' ? 'right-2' : 'left-2'}`}>
            {language === 'en' ? 'AR' : 'EN'}
          </span>
        </div>
      </div>

      {/* Hero Image - AL USRA + FAZAA banner */}
      <div className="w-full">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt={language === 'ar' ? 'شعار الأسرة وفزعة' : 'AL USRA and FAZAA Banner'} 
          className="w-full h-auto block object-contain"
        />
      </div>

      {/* Title Section */}
      <div className="py-8 px-6 text-center space-y-3 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
          {t.title}
        </h1>
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {t.subtitle}
          </p>
          <p className="text-xs md:text-sm font-medium text-gray-500">
            {t.dedicated}
          </p>
        </div>
      </div>

      {/* Registration Instructions Accordion */}
      <div className="px-4 pb-6">
        <button 
          type="button"
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors border border-gray-300 rounded-lg"
        >
          <span className="font-bold text-gray-800 text-base">
            {t.registrationInstructions}
          </span>
          <svg 
            className={`w-5 h-5 text-gray-600 transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showInstructions && (
          <div className="px-6 py-4 bg-gray-50 border border-t-0 border-gray-300 rounded-b-lg text-sm text-gray-600 space-y-2">
            <p>{language === 'ar' ? '• يرجى كتابة الاسم كما هو في الهوية' : '• Please write the name as it appears in the ID'}</p>
            <p>{language === 'ar' ? '• تأكد من صحة رقم الهاتف المسجل' : '• Ensure the mobile number is correct'}</p>
            <p>{language === 'ar' ? '• اختر الفئة المناسبة لأسرتك' : '• Choose the appropriate category for your family'}</p>
          </div>
        )}
      </div>
    </header>
  );
}
