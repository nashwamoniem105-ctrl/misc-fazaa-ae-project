import type { Language } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header className="relative w-full overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-8 right-8 z-50">
        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-4 bg-white/95 backdrop-blur-md hover:bg-white text-primary px-5 py-2.5 rounded-full shadow-2xl transition-all border border-primary/30 group active:scale-95"
        >
          <span className="font-bold text-base tracking-wide">
            {language === 'ar' ? 'English' : 'العربية'}
          </span>
          <div className="w-12 h-6 bg-gray-100 rounded-full relative border border-gray-200">
            <div
              className={`w-4.5 h-4.5 bg-primary rounded-full absolute top-0.5 transition-all duration-300 shadow-sm ${
                language === 'ar' ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Header Image */}
      <div className="relative h-[350px] md:h-[550px] w-full">
        <img
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg"
          alt="Fazaa Family"
          className="w-full h-full object-cover object-[center_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    </header>
  );
}
