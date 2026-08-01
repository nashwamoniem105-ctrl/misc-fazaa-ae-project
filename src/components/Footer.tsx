import type { Language } from '../translations';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  
  return (
    <footer className="bg-white py-8 px-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <img src="/favicon.svg" alt="Fazaa Logo" className="w-10 h-10 opacity-30" />
        <p className="text-gray-400 text-xs">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
