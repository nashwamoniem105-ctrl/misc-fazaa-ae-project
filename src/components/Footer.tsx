import type { Language } from '../translations';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  
  return (
    <footer className="bg-gray-50 py-6 px-6 text-center border-t border-gray-100">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 opacity-50">
          <img src="/favicon.svg" alt="Fazaa Logo" className="w-6 h-6 grayscale" />
          <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Fazaa</span>
        </div>
        <p className="text-gray-400 text-[10px] font-medium">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
