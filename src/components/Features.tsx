import type { Language } from '../translations';
import { translations } from '../translations';

interface FeaturesProps {
  language: Language;
}

export default function Features({ language }: FeaturesProps) {
  const t = translations[language];
  const featureKeys = ['housing', 'education', 'health', 'insurance', 'essentials', 'transport', 'entertainment'] as const;

  return (
    <section className="px-6 py-16 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          {t.featuresTitle}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureKeys.map((key) => {
            const feature = t.features[key];
            return (
              <div
                key={key}
                className="group p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary/30 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.title.split(' ')[0]}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {feature.title.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
