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
    <div className="px-6 md:px-10 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields - 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1">
            <label>{t.formLabels.fullName}</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              required
              placeholder={t.formPlaceholders.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label>{t.formLabels.mobileNumber}</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              placeholder={t.formPlaceholders.mobileNumber}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label>{t.formLabels.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              placeholder={t.formPlaceholders.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label>{t.formLabels.emirate}</label>
            <select
              name="emirate"
              value={formData.emirate}
              required
              className="bg-[#fafafa]"
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
        <div className="space-y-6 pt-6">
          <h3 className="text-lg font-bold text-center text-[#333]">
            {t.formLabels.membershipCategory}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Gold Card */}
            <div 
              onClick={() => setSelectedCategory('gold')}
              className={`membership-card ${selectedCategory === 'gold' ? 'selected' : ''}`}
            >
              <p className="text-[10px] font-bold text-gray-500 mb-2 h-8 flex items-center justify-center">
                {t.membershipCategories.goldDesc}
              </p>
              <img src="/images/usra-gold.37a39d381c313f5791ad.png" alt="Gold" className="w-32 h-auto mb-3" />
              <div className="flex flex-col items-center w-full gap-2">
                <span className="font-bold text-[#333] text-xs">{t.membershipCategories.gold}</span>
                <button type="button" className={`px-4 py-1 rounded border text-[10px] font-bold transition-all ${selectedCategory === 'gold' ? 'bg-[#002652] text-white border-[#002652]' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>

            {/* Platinum Card */}
            <div 
              onClick={() => setSelectedCategory('platinum')}
              className={`membership-card ${selectedCategory === 'platinum' ? 'selected' : ''}`}
            >
              <p className="text-[10px] font-bold text-gray-500 mb-2 h-8 flex items-center justify-center">
                {t.membershipCategories.platinumDesc}
              </p>
              <img src="/images/usra-platinum.c15483ef5f538768f8ff.png" alt="Platinum" className="w-32 h-auto mb-3" />
              <div className="flex flex-col items-center w-full gap-2">
                <span className="font-bold text-[#333] text-xs">{t.membershipCategories.platinum}</span>
                <button type="button" className={`px-4 py-1 rounded border text-[10px] font-bold transition-all ${selectedCategory === 'platinum' ? 'bg-[#002652] text-white border-[#002652]' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>

            {/* Silver Card - Centered below */}
            <div 
              onClick={() => setSelectedCategory('silver')}
              className={`membership-card col-span-2 mx-auto w-[calc(50%-0.5rem)] ${selectedCategory === 'silver' ? 'selected' : ''}`}
            >
              <p className="text-[10px] font-bold text-gray-500 mb-2 h-8 flex items-center justify-center">
                {t.membershipCategories.silverDesc}
              </p>
              <img src="/images/usra-silver.c90b175261a33b3061a4.png" alt="Silver" className="w-32 h-auto mb-3" />
              <div className="flex flex-col items-center w-full gap-2">
                <span className="font-bold text-[#333] text-xs">{t.membershipCategories.silver}</span>
                <button type="button" className={`px-4 py-1 rounded border text-[10px] font-bold transition-all ${selectedCategory === 'silver' ? 'bg-[#002652] text-white border-[#002652]' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-[#f9f9f9] p-5 rounded-lg border border-gray-100 mt-8">
          <h4 className="font-bold text-[#333] mb-2 text-xs">{t.benefits.title}</h4>
          <p className="text-gray-500 text-[11px] leading-relaxed">
            {t.benefits.content}
          </p>
        </div>

        {/* Acknowledgment and Submit */}
        <div className="space-y-6 pt-4 pb-10">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="acknowledgment"
              checked={formData.acknowledgment}
              required
              className="w-4 h-4 accent-[#002652] cursor-pointer"
              onChange={handleInputChange}
            />
            <span className="text-[11px] text-gray-500 group-hover:text-gray-800 transition-colors font-medium">
              {t.acknowledgment}
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-[#002652] hover:bg-[#001a38] text-white font-bold text-sm rounded-lg shadow-md transition-all active:scale-[0.98]"
          >
            {t.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
