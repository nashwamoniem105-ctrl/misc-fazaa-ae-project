import type { Language } from '../translations';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];
  return (
    <footer className="bg-secondary py-12 px-6 text-center border-t border-primary/20">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center items-center gap-4">
          <div className="w-12 h-[1px] bg-primary/50" />
          <img src="/favicon.svg" alt="Fazaa Logo" className="w-10 h-10 brightness-0 invert opacity-80" />
          <div className="w-12 h-[1px] bg-primary/50" />
        </div>
        <p className="text-gray-400 text-sm tracking-wide">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
