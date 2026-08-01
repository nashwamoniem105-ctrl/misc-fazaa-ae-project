import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({ language }: SheikhProps) {
  return (
    <section className="w-full bg-white flex justify-center py-10 border-t border-gray-50">
      {/* Perfect Square Image without extra marks */}
      <div className="w-full max-w-[400px] aspect-square overflow-hidden bg-white">
        <img
          src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
          alt="Sheikh Quote"
          className="w-full h-full object-cover block"
        />
      </div>
    </section>
  );
}
