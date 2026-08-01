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
      {/* Top Bar with Language Toggle */}
      <div className="flex justify-end p-4">
        <button 
          onClick={onToggleLanguage}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-all text-[11px] font-bold text-primary"
        >
          <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center">
            {language === 'en' ? 'AR' : 'EN'}
          </span>
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Hero Banner */}
      <div className="w-full">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt="Fazaa Banner" 
          className="w-full h-auto block"
        />
      </div>

      {/* Hero Content */}
      <div className="py-10 px-6 text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
          {t.title}
        </h1>
        <div className="max-w-md mx-auto space-y-2">
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
            {t.subtitle}
          </p>
          <p className="text-[11px] text-gray-400">
            {t.dedicated}
          </p>
        </div>
      </div>

      {/* Registration Instructions */}
      <div className="px-6 mb-8">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button 
            type="button"
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full px-5 py-3.5 flex justify-between items-center bg-[#fcfcfc] hover:bg-white transition-colors"
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
            <div className="px-5 py-4 bg-white border-t border-gray-100 text-[12px] text-gray-500 space-y-2 leading-relaxed">
              <p>• {language === 'ar' ? 'يرجى كتابة الاسم كما هو في الهوية' : 'Please write the name as it appears in the ID'}</p>
              <p>• {language === 'ar' ? 'تأكد من صحة رقم الهاتف المسجل' : 'Ensure the mobile number is correct'}</p>
              <p>• {language === 'ar' ? 'اختر الفئة المناسبة لأسرتك' : 'Choose the appropriate category for your family'}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
