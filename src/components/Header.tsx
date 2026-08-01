import { useState } from 'react';
import type { Language } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <header className="relative">
      {/* Language Toggle Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onToggleLanguage}
          className="bg-[#2c3e50] hover:bg-[#1a252f] text-white px-4 py-1.5 rounded text-xs font-bold transition-colors border border-[#2c3e50]"
        >
          {language === 'ar' ? 'EN' : 'عربي'}
        </button>
      </div>

      {/* Hero Image - AL USRA + FAZAA banner */}
      <div className="w-full overflow-hidden">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt={language === 'ar' ? 'شعار الأسرة وفزعة' : 'AL USRA and FAZAA Banner'} 
          className="w-full h-auto block"
        />
      </div>

      {/* Title Section */}
      <div className="py-8 px-6 text-center space-y-3 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
          {language === 'ar' ? 'مبادرة فزعة لعام الأسرة 2026' : 'Fazaa Family Year Initiative 2026'}
        </h1>
        <div className="max-w-2xl mx-auto space-y-2">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {language === 'ar' 
              ? 'بالتعاون مع وزارة الأسرة، تقدم فزعة باقات حصرية لدعم جودة حياة الأسرة الإماراتية:' 
              : 'In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of Emirati families:'}
          </p>
          <p className="text-xs md:text-sm font-medium text-gray-500">
            {language === 'ar' ? 'مبادرة مخصصة للأسر الإماراتية' : 'An initiative dedicated to Emirati families'}
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
            {language === 'ar' ? 'تعليمات التسجيل' : 'Registration Instructions'}
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
