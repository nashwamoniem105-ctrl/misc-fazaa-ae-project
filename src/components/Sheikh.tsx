import type { Language } from '../translations';

interface SheikhProps {
  language: Language;
}

export default function Sheikh({}: SheikhProps) {
  return (
    <section className="text-center px-6 py-12 md:px-8 md:py-16">
      <img
        src="/images/Sheikh-Quote.57d90acf46b7581ce8c9.jpg"
        alt="Sheikh Quote"
        className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
      />
    </section>
  );
}
