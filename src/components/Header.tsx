import type { Language } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header className="relative">
      {/* Language Toggle Overlay */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onToggleLanguage}
          className="bg-[#2c3e50] hover:bg-[#1a252f] text-white px-4 py-1 rounded text-xs font-bold transition-colors border border-[#2c3e50]"
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
      <div className="py-8 px-4 text-center space-y-4 bg-white">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
          {language === 'ar' ? 'مبادرة فزعة لعام الأسرة 2026' : 'Fazaa Family Year Initiative 2026'}
        </h1>
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {language === 'ar' 
              ? 'بالتعاون مع وزارة الأسرة، تقدم فزعة باقات حصرية لدعم جودة حياة الأسرة الإماراتية:' 
              : 'In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of Emirati families:'}
          </p>
          <p className="text-sm md:text-base font-medium text-gray-500">
            {language === 'ar' ? 'مبادرة مخصصة للأسر الإماراتية' : 'An initiative dedicated to Emirati families'}
          </p>
        </div>
      </div>

      {/* Registration Instructions Accordion */}
      <div className="px-4 pb-4">
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <button 
            type="button"
            onClick={() => {}}
            className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-800 text-lg">
              {language === 'ar' ? 'تعليمات التسجيل' : 'Registration Instructions'}
            </span>
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
