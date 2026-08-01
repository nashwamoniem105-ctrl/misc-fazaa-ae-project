import type { Language } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header className="relative w-full overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-primary px-4 py-2 rounded-full shadow-lg transition-all border border-primary/20"
        >
          <span className="font-bold text-sm tracking-wide">
            {language === 'ar' ? 'English' : 'العربية'}
          </span>
          <div className="w-10 h-5 bg-gray-200 rounded-full relative">
            <div
              className={`w-4 h-4 bg-primary rounded-full absolute top-0.5 transition-all duration-300 ${
                language === 'ar' ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Header Image */}
      <div className="relative h-[300px] md:h-[450px] w-full">
        <img
          src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg"
          alt="Fazaa Family"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </header>
  );
}
