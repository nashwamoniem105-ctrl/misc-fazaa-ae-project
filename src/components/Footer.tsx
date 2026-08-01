import type { Language } from '../translations';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  
  return (
    <footer className="bg-white py-4 px-6 text-center border-t border-gray-100">
      <div className="flex flex-col items-center gap-2">
        <img src="/favicon.svg" alt="Fazaa Logo" className="w-8 h-8 opacity-40" />
        <p className="text-gray-400 text-xs">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
