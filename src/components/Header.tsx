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
          className="bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold transition-colors backdrop-blur-sm border border-white/20"
        >
          {language === 'ar' ? 'EN' : 'عربي'}
        </button>
      </div>

      {/* Banner Image */}
      <div className="w-full overflow-hidden">
        <img 
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg" 
          alt="Fazaa Banner" 
          className="w-full h-auto block"
        />
      </div>

      {/* Title Section */}
      <div className="py-6 px-4 text-center space-y-3 bg-white">
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
            {language === 'ar' ? 'مبادرة مخصّصة للأسر الإماراتية' : 'An initiative dedicated to Emirati families'}
          </p>
        </div>
      </div>
    </header>
  );
}
