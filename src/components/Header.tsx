import type { Language } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header className="relative bg-white">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
        </button>
      </div>

      {/* Banner Image */}
      <div className="w-full">
        <img
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg"
          alt="Fazaa Family Banner"
          className="w-full h-auto block"
        />
      </div>

      {/* Title Section */}
      <div className="text-center py-8 px-4 border-b border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {language === 'ar' ? 'مبادرة فزعة لعام الأسرة 2026' : 'Fazaa Family Year 2026 Initiative'}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'بالتعاون مع وزارة الأسرة، تقدم فزعة باقات حصرية لدعم جودة حياة الأسرة الإماراتية:' 
            : 'In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of the Emirati family:'}
        </p>
        <p className="text-gray-500 mt-2 font-medium">
          {language === 'ar' ? 'مبادرة مخصّصة للأسر الإماراتية' : 'Initiative dedicated to Emirati families'}
        </p>
      </div>
    </header>
  );
}
