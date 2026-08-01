import { Language, translations } from '../translations';

interface FeaturesProps {
  language: Language;
}

export default function Features({ language }: FeaturesProps) {
  const t = translations[language];
  const featureKeys = ['housing', 'education', 'health', 'insurance', 'essentials', 'transport', 'entertainment'] as const;

  return (
    <section className="px-6 py-12 md:px-8 md:py-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-12">
        {t.featuresTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featureKeys.map((key) => {
          const feature = t.features[key];
          return (
            <div
              key={key}
              className="bg-gradient-to-br from-primary/5 to-secondary-light/5 border-2 border-gray-200 rounded-lg p-8 text-center hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
