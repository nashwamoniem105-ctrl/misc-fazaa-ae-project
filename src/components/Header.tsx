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
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <div 
          onClick={onToggleLanguage}
          className="relative w-10 h-5 bg-[#2c3e50] rounded-full cursor-pointer p-0.5 transition-all duration-300"
        >
          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 flex items-center justify-center text-[8px] font-bold text-[#2c3e50] ${language === 'en' ? 'left-0.5' : 'right-0.5'}`}>
            {language === 'en' ? 'EN' : 'AR'}
          </div>
          <span className={`absolute top-1 text-[8px] font-bold text-white transition-all duration-300 ${language === 'en' ? 'right-1.5' : 'left-1.5'}`}>
            {language === 'en' ? 'AR' : 'EN'}
          </span>
        </div>
      </div>

      {/* Hero Image - Ensure full visibility */}
      <div className="w-full flex justify-center bg-white">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt={language === 'ar' ? 'شعار الأسرة وفزعة' : 'AL USRA and FAZAA Banner'} 
          className="max-w-full h-auto block"
          style={{ maxHeight: 'none', objectFit: 'contain' }}
        />
      </div>

      {/* Title Section - Smaller text and padding */}
      <div className="py-4 px-4 text-center space-y-1.5 bg-white">
        <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
          {t.title}
        </h1>
        <div className="max-w-md mx-auto space-y-1">
          <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
            {t.subtitle}
          </p>
          <p className="text-[9px] md:text-[10px] font-medium text-gray-500">
            {t.dedicated}
          </p>
        </div>
      </div>

      {/* Registration Instructions Accordion - Smaller padding and font */}
      <div className="px-3 pb-4">
        <button 
          type="button"
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full px-3 py-2 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors border border-gray-300 rounded-md"
        >
          <span className="font-bold text-gray-800 text-xs">
            {t.registrationInstructions}
          </span>
          <svg 
            className={`w-3 h-3 text-gray-600 transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showInstructions && (
          <div className="px-3 py-2 bg-gray-50 border border-t-0 border-gray-300 rounded-b-md text-[10px] text-gray-600 space-y-1">
            <p>{language === 'ar' ? '• يرجى كتابة الاسم كما هو في الهوية' : '• Please write the name as it appears in the ID'}</p>
            <p>{language === 'ar' ? '• تأكد من صحة رقم الهاتف المسجل' : '• Ensure the mobile number is correct'}</p>
            <p>{language === 'ar' ? '• اختر الفئة المناسبة لأسرتك' : '• Choose the appropriate category for your family'}</p>
          </div>
        )}
      </div>
    </header>
  );
}
