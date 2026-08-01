import type { Language } from '../translations';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  
  return (
    <footer className="bg-white py-6 px-6 text-center border-t border-gray-50">
      <div className="flex flex-col items-center gap-3">
        <img src="/favicon.svg" alt="Fazaa Logo" className="w-6 h-6 opacity-20 grayscale" />
        <p className="text-gray-400 text-[9px] font-medium tracking-wide">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
