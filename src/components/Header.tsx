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
    <header className="relative bg-white">
      {/* Language Toggle Overlay */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onToggleLanguage}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors text-[10px] font-bold text-[#002652]"
        >
          <span className="w-5 h-5 bg-[#002652] text-white rounded-full flex items-center justify-center">
            {language === 'en' ? 'AR' : 'EN'}
          </span>
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Hero Image - Full Width */}
      <div className="w-full">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt="Fazaa Banner" 
          className="w-full h-auto block"
        />
      </div>

      {/* Title Section - Professional Typography */}
      <div className="py-8 px-6 text-center space-y-4">
        <h1 className="text-xl md:text-2xl font-bold text-[#333] tracking-tight">
          {t.title}
        </h1>
        <div className="max-w-lg mx-auto space-y-2">
          <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
            {t.subtitle}
          </p>
          <div className="inline-block px-4 py-1 bg-gray-50 rounded-full text-[10px] md:text-xs text-gray-500 border border-gray-100">
            {t.dedicated}
          </div>
        </div>
      </div>

      {/* Registration Instructions Accordion */}
      <div className="px-6 pb-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            type="button"
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full px-4 py-3 flex justify-between items-center bg-[#fafafa] hover:bg-white transition-colors"
          >
            <span className="font-bold text-gray-700 text-sm">
              {t.registrationInstructions}
            </span>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showInstructions && (
            <div className="px-4 py-3 bg-white border-t border-gray-200 text-[11px] text-gray-500 space-y-2">
              <p>{language === 'ar' ? '• يرجى كتابة الاسم كما هو في الهوية' : '• Please write the name as it appears in the ID'}</p>
              <p>{language === 'ar' ? '• تأكد من صحة رقم الهاتف المسجل' : '• Ensure the mobile number is correct'}</p>
              <p>{language === 'ar' ? '• اختر الفئة المناسبة لأسرتك' : '• Choose the appropriate category for your family'}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
