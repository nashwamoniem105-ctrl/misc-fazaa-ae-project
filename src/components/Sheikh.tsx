import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({}: SheikhProps) {
  return (
    <section className="bg-white px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-50">
          <img
            src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
            alt="Sheikh Quote"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
