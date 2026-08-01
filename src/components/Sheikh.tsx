import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({ language }: SheikhProps) {
  return (
    <section className="mt-12 border-t border-gray-100 pt-12">
      <div className="w-full">
        <img
          src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
          alt={language === 'ar' ? 'اقتباس' : 'Quote'}
          className="w-full h-auto block rounded-lg"
        />
      </div>
    </section>
  );
}
