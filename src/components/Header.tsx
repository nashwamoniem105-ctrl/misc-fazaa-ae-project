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
      {/* Hero Image - Ensuring 100% visibility */}
      <div className="w-full">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt="Fazaa Banner" 
          className="w-full h-auto block object-contain"
        />
        {/* Minimal Language Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={onToggleLanguage}
            className="bg-white/90 backdrop-blur shadow-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary border border-gray-100"
          >
            {language === 'en' ? 'العربية' : 'ENGLISH'}
          </button>
        </div>
      </div>

      <div className="py-10 px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
          {t.title}
        </h1>
        <div className="max-w-md mx-auto space-y-2">
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {t.subtitle}
          </p>
          <p className="text-[11px] text-gray-400">
            {t.dedicated}
          </p>
        </div>
      </div>

      {/* Instructions Accordion */}
      <div className="px-6 mb-6">
        <button 
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-gray-50/50"
        >
          <span>{t.registrationInstructions}</span>
          <svg className={`w-4 h-4 transition-transform ${showInstructions ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showInstructions && (
          <div className="mt-2 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 space-y-2 border border-gray-100">
            <p>• {language === 'ar' ? 'يرجى كتابة الاسم كما هو في الهوية' : 'Please write the name as it appears in the ID'}</p>
            <p>• {language === 'ar' ? 'تأكد من صحة رقم الهاتف المسجل' : 'Ensure the mobile number is correct'}</p>
          </div>
        )}
      </div>
    </header>
  );
}
