import { useState } from 'react';
import type { Language } from '../translations';
import { translations } from '../translations';

interface RegistrationFormProps {
  language: Language;
}

export default function RegistrationForm({ language }: RegistrationFormProps) {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    emirate: '',
    acknowledgment: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert(language === 'ar' ? 'يرجى اختيار فئة العضوية' : 'Please select a membership category');
      return;
    }
    console.log('Form submitted:', { ...formData, selectedCategory });
    alert(language === 'ar' ? 'تم تقديم طلبك بنجاح!' : 'Your application has been submitted successfully!');
  };

  return (
    <div className="px-4 md:px-8 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields - single column stacked */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">
              {language === 'ar' ? 'الاسم الكامل: (يرجى كتابة الاسم كما...' : 'Full Name: (As in ID)'}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              required
              className="w-full"
              placeholder={language === 'ar' ? 'الاسم الكامل: (يرجى كتابة الاسم كما...' : 'Full Name...'}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">
              {language === 'ar' ? 'رقم الهاتف المتحرك: (المسجل في ت...)' : 'Mobile Number: (Registered in ID system)'}
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              placeholder="05XXXXXXXX"
              required
              className="w-full"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              className="w-full"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700">
              {language === 'ar' ? 'الإمارة' : 'Emirate'}
            </label>
            <select
              name="emirate"
              value={formData.emirate}
              required
              className="w-full bg-white"
              onChange={handleInputChange}
            >
              <option value="">{t.emirates.select}</option>
              {Object.entries(t.emirates).map(([key, value]) => (
                key !== 'select' && <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Membership Categories */}
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-bold text-gray-800">
            {language === 'ar' ? 'فئات العضوية الممنوحة:' : 'Membership Categories:'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gold Card */}
            <div 
              onClick={() => setSelectedCategory('gold')}
              className={`membership-card ${selectedCategory === 'gold' ? 'selected' : ''}`}
            >
              <p className="text-sm font-bold mb-3 min-h-[40px] flex items-center justify-center text-center text-gray-700">
                {language === 'ar' ? 'الذهبية: للأسر الصغيرة (1-3 أطفال).' : 'Gold: For small families (1-3 children).'}
              </p>
              <img src="/images/usra-gold.37a39d381c313f5791ad.png" alt="Gold" className="w-full h-auto mb-4 rounded shadow-sm" />
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-gray-800 text-sm">{t.membershipCategories.gold}</span>
                <button type="button" className={`px-5 py-1.5 rounded text-sm font-bold border transition-colors ${selectedCategory === 'gold' ? 'bg-[#2c3e50] text-white border-[#2c3e50]' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                  {language === 'ar' ? 'اختر' : 'Choose'}
                </button>
              </div>
            </div>

            {/* Platinum Card */}
            <div 
              onClick={() => setSelectedCategory('platinum')}
              className={`membership-card ${selectedCategory === 'platinum' ? 'selected' : ''}`}
            >
              <p className="text-sm font-bold mb-3 min-h-[40px] flex items-center justify-center text-center text-gray-700">
                {language === 'ar' ? 'للأسر الكبيرة (4 أطفال فأكثر) والاسر الراعية لأصحاب الهمم' : 'For large families (4+ children) and families of People of Determination'}
              </p>
              <img src="/images/usra-platinum.c15483ef5f538768f8ff.png" alt="Platinum" className="w-full h-auto mb-4 rounded shadow-sm" />
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-gray-800 text-sm">{t.membershipCategories.platinum}</span>
                <button type="button" className={`px-5 py-1.5 rounded text-sm font-bold border transition-colors ${selectedCategory === 'platinum' ? 'bg-[#2c3e50] text-white border-[#2c3e50]' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                  {language === 'ar' ? 'اختر' : 'Choose'}
                </button>
              </div>
            </div>

            {/* Silver Card */}
            <div 
              onClick={() => setSelectedCategory('silver')}
              className={`membership-card ${selectedCategory === 'silver' ? 'selected' : ''}`}
            >
              <p className="text-sm font-bold mb-3 min-h-[40px] flex items-center justify-center text-center text-gray-700">
                {language === 'ar' ? 'للأسرة الاماراتية الجديدة حبيبى الزواج' : 'For new Emirati families (Newlyweds)'}
              </p>
              <img src="/images/usra-silver.c90b175261a33b3061a4.png" alt="Silver" className="w-full h-auto mb-4 rounded shadow-sm" />
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-gray-800 text-sm">{t.membershipCategories.silver}</span>
                <button type="button" className={`px-5 py-1.5 rounded text-sm font-bold border transition-colors ${selectedCategory === 'silver' ? 'bg-[#2c3e50] text-white border-[#2c3e50]' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                  {language === 'ar' ? 'اختر' : 'Choose'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3 text-lg">{language === 'ar' ? 'المزايا:' : 'Benefits:'}</h4>
          <p className="text-gray-600 text-base leading-relaxed">
            {language === 'ar' 
              ? 'إطلاق حزمة عروض ومزايا حصرية تشمل: السكن، التعليم، الصحة، التأمين، المستلزمات الأساسية، النقل، والترفيه بأسعار مدعومة وبأقل من التكلفة.'
              : 'Launching a package of exclusive offers and benefits including: housing, education, health, insurance, basic supplies, transport, and entertainment at subsidized prices and below cost.'}
          </p>
        </div>

        {/* Acknowledgment and Submit */}
        <div className="space-y-6 pt-2 pb-8">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="acknowledgment"
              checked={formData.acknowledgment}
              required
              className="w-5 h-5 mt-0.5 accent-[#2c3e50] cursor-pointer shrink-0"
              onChange={handleInputChange}
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors leading-tight font-medium">
              {t.acknowledgment}
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-4 bg-[#2c3e50] hover:bg-[#1a252f] text-white font-bold text-lg rounded shadow-lg transition-all active:scale-[0.98]"
          >
            {t.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
