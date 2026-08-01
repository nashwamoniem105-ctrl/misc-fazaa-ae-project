import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({ language: _language }: SheikhProps) {
  return (
    <section className="w-full bg-white flex justify-center py-8 border-t border-gray-50">
      {/* Perfect Square Image - No blue marks or extra elements */}
      <div className="w-full max-w-[320px] aspect-square overflow-hidden bg-white shadow-sm rounded-lg border border-gray-100">
        <img
          src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
          alt="fazaa footer banner"
          className="w-full h-full object-cover block"
        />
      </div>
    </section>
  );
}
