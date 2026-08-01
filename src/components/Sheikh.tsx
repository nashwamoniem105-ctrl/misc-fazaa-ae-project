import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({ language }: SheikhProps) {
  return (
    <section className="w-full bg-white flex justify-center pb-10">
      <div className="w-full max-w-[480px] aspect-square overflow-hidden rounded-lg shadow-sm border border-gray-100">
        <img
          src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
          alt={language === 'ar' ? 'اقتباس' : 'Quote'}
          className="w-full h-full object-cover block"
        />
      </div>
    </section>
  );
}
