import { Language } from '../translations';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header className="relative">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={onToggleLanguage}
          className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full transition-all"
        >
          <span className="font-semibold text-sm">
            {language === 'ar' ? 'EN' : 'AR'}
          </span>
          <div className="w-12 h-6 bg-white bg-opacity-30 rounded-full relative">
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                language === 'ar' ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Header Image */}
      <img
        src="/images/Wide-pic-web-ready.fa601e597d6b23470711.jpg"
        alt="Fazaa Family"
        className="w-full h-auto block max-h-80 object-cover"
      />
    </header>
  );
}
