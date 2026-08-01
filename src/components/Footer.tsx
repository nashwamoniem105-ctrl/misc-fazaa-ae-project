import { Language, translations } from '../translations';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="bg-gradient-to-r from-primary to-primary-light text-white text-center py-8 px-6">
      <p className="text-sm">{t.copyright}</p>
    </footer>
  );
}
