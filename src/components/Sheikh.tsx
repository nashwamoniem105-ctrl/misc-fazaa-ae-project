import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({ language }: SheikhProps) {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="w-full">
        <img
          src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
          alt={language === 'ar' ? 'اقتباس' : 'Quote'}
          className="w-full h-auto block"
        />
      </div>
    </section>
  );
}
