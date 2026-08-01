import { useState } from 'react';
import type { Language } from '../translations';
import { translations } from '../translations';

interface RegistrationFormProps {
  language: Language;
}

export default function RegistrationForm({ language }: RegistrationFormProps) {
  const t = translations[language];
  const [showInstructions, setShowInstructions] = useState(false);
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
    <div className="py-2 px-4 md:px-8 bg-white">
      {/* Instructions Accordion */}
      <div className="mb-8 border rounded-lg overflow-hidden shadow-sm">
        <button 
          type="button"
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-bold text-gray-700">
            {language === 'ar' ? 'تعليمات التسجيل' : 'Registration Instructions'}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showInstructions && (
          <div className="px-6 py-4 bg-white text-gray-600 text-sm space-y-2 border-t">
            <p>{language === 'ar' ? '• يرجى كتابة الاسم كما هو في الهوية' : '• Please write the name as it appears in the ID'}</p>
            <p>{language === 'ar' ? '• تأكد من صحة رقم الهاتف المسجل' : '• Ensure the mobile number is correct'}</p>
            <p>{language === 'ar' ? '• اختر الفئة المناسبة لأسرتك' : '• Choose the appropriate category for your family'}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {language === 'ar' ? 'الاسم الكامل: (يرجى كتابة الاسم كما هو في الهوية)' : 'Full Name: (As in ID)'}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              required
              className="w-full"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {language === 'ar' ? 'رقم الهاتف المتحرك: (المسجل في نظام الهوية)' : 'Mobile Number: (Registered in ID system)'}
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
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
          <h3 className="text-xl font-bold text-center text-gray-800">
            {language === 'ar' ? 'فئات العضوية الممنوحة:' : 'Membership Categories:'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Platinum */}
            <div 
              onClick={() => setSelectedCategory('platinum')}
              className={`membership-card ${selectedCategory === 'platinum' ? 'selected' : ''}`}
            >
              <p className="text-xs font-bold mb-3 min-h-[40px] flex items-center justify-center text-center">
                {language === 'ar' ? 'للأسر الكبيرة (4 أطفال فأكثر) والأسر الراعية لأصحاب الهمم' : 'For large families (4+ children) and families of People of Determination'}
              </p>
              <img src="/images/usra-platinum.c15483ef5f538768f8ff.png" alt="Platinum" className="w-full h-auto mb-4 rounded shadow-sm" />
              <div className="flex flex-col items-center w-full">
                <span className="font-bold text-gray-800 mb-2">{t.membershipCategories.platinum}</span>
                <button type="button" className={`w-full py-2 rounded text-sm font-bold transition-colors ${selectedCategory === 'platinum' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {language === 'ar' ? 'اختر' : 'Choose'}
                </button>
              </div>
            </div>

            {/* Gold */}
            <div 
              onClick={() => setSelectedCategory('gold')}
              className={`membership-card ${selectedCategory === 'gold' ? 'selected' : ''}`}
            >
              <p className="text-xs font-bold mb-3 min-h-[40px] flex items-center justify-center text-center">
                {language === 'ar' ? 'الذهبية: للأسر الصغيرة (1-3 أطفال).' : 'Gold: For small families (1-3 children).'}
              </p>
              <img src="/images/usra-gold.37a39d381c313f5791ad.png" alt="Gold" className="w-full h-auto mb-4 rounded shadow-sm" />
              <div className="flex flex-col items-center w-full">
                <span className="font-bold text-gray-800 mb-2">{t.membershipCategories.gold}</span>
                <button type="button" className={`w-full py-2 rounded text-sm font-bold transition-colors ${selectedCategory === 'gold' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {language === 'ar' ? 'اختر' : 'Choose'}
                </button>
              </div>
            </div>

            {/* Silver */}
            <div 
              onClick={() => setSelectedCategory('silver')}
              className={`membership-card ${selectedCategory === 'silver' ? 'selected' : ''}`}
            >
              <p className="text-xs font-bold mb-3 min-h-[40px] flex items-center justify-center text-center">
                {language === 'ar' ? 'للأسرة الاماراتية الجديدة حديثي الزواج' : 'For new Emirati families (Newlyweds)'}
              </p>
              <img src="/images/usra-silver.c90b175261a33b3061a4.png" alt="Silver" className="w-full h-auto mb-4 rounded shadow-sm" />
              <div className="flex flex-col items-center w-full">
                <span className="font-bold text-gray-800 mb-2">{t.membershipCategories.silver}</span>
                <button type="button" className={`w-full py-2 rounded text-sm font-bold transition-colors ${selectedCategory === 'silver' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {language === 'ar' ? 'اختر' : 'Choose'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-inner">
          <h4 className="font-bold text-gray-800 mb-2">{language === 'ar' ? 'المزايا:' : 'Benefits:'}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {language === 'ar' 
              ? 'إطلاق حزمة عروض ومزايا حصرية تشمل: السكن، التعليم، الصحة، التأمين، المستلزمات الأساسية، النقل، والترفيه بأسعار مدعومة وبأقل من التكلفة.'
              : 'Launching a package of exclusive offers and benefits including: housing, education, health, insurance, basic supplies, transport, and entertainment at subsidized prices and below cost.'}
          </p>
        </div>

        {/* Acknowledgment and Submit */}
        <div className="space-y-6 pt-4 pb-8">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="acknowledgment"
              checked={formData.acknowledgment}
              required
              className="w-5 h-5 mt-0.5 accent-primary cursor-pointer shrink-0"
              onChange={handleInputChange}
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors leading-tight">
              {t.acknowledgment}
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-4 bg-gray-800 hover:bg-black text-white font-bold text-lg rounded-md shadow-lg transition-all active:scale-[0.98]"
          >
            {t.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
