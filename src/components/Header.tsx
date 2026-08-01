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
    <header className="bg-white">
      {/* Hero Image - Ensure 100% width and correct aspect ratio */}
      <div className="w-full relative">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt="fazaa header" 
          className="w-full h-auto block"
        />
        {/* Language Toggle Overlay - Clean and minimal */}
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={onToggleLanguage}
            className="bg-white/90 backdrop-blur shadow-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-primary border border-gray-100 flex items-center gap-1"
          >
            <span className="w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[8px]">
              {language === 'en' ? 'AR' : 'EN'}
            </span>
            {language === 'en' ? 'العربية' : 'EN'}
          </button>
        </div>
      </div>

      <div className="py-6 px-4 text-center">
        <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight mb-2">
          {t.title}
        </h1>
        <div className="max-w-md mx-auto space-y-1">
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            {t.subtitle}
          </p>
          <p className="text-[10px] md:text-xs text-gray-400">
            {t.dedicated}
          </p>
        </div>
      </div>

      {/* Instructions Accordion - Matching official site look */}
      <div className="px-4 mb-4">
        <div className="border border-gray-200 rounded overflow-hidden">
          <button 
            type="button"
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full px-4 py-2 flex justify-between items-center bg-[#f9f9f9] hover:bg-white transition-colors text-sm font-bold text-gray-700"
          >
            <span>{t.registrationInstructions}</span>
            <svg className={`w-4 h-4 transition-transform ${showInstructions ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showInstructions && (
            <div className="px-4 py-2 bg-white border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
              <p>• {language === 'ar' ? 'يرجى كتابة الاسم كما هو في الهوية' : 'Please write the name as it appears in the ID'}</p>
              <p>• {language === 'ar' ? 'تأكد من صحة رقم الهاتف المسجل' : 'Ensure the mobile number is correct'}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
