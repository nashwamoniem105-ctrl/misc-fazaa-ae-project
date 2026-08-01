import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({ language: _language }: SheikhProps) {
  return (
    <section className="w-full bg-white flex justify-center py-16 border-t border-gray-50">
      <div className="w-full max-w-[480px] aspect-square overflow-hidden bg-white shadow-2xl shadow-gray-200/50 rounded-2xl border-8 border-white">
        <img
          src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
          alt="Sheikh Quote"
          className="w-full h-full object-cover block"
        />
      </div>
    </section>
  );
}
