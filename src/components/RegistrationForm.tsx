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
    <div className="px-3 md:px-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields - single column stacked - Smaller spacing */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700">
              {t.formLabels.fullName}
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              required
              className="w-full"
              placeholder={t.formPlaceholders.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700">
              {t.formLabels.mobileNumber}
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              placeholder={t.formPlaceholders.mobileNumber}
              required
              className="w-full"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700">
              {t.formLabels.email}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              className="w-full"
              placeholder={t.formPlaceholders.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-700">
              {t.formLabels.emirate}
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
                key !== 'select' && <option key={key} value={key} className="text-xs">{value}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Membership Categories - Smaller font and spacing */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-gray-800">
            {t.formLabels.membershipCategory}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Gold Card */}
            <div 
              onClick={() => setSelectedCategory('gold')}
              className={`membership-card ${selectedCategory === 'gold' ? 'selected' : ''}`}
            >
              <p className="text-[9px] font-bold mb-1.5 min-h-[24px] flex items-center justify-center text-center text-gray-700 leading-tight">
                {t.membershipCategories.goldDesc}
              </p>
              <img src="/images/usra-gold.37a39d381c313f5791ad.png" alt="Gold" className="w-2/3 h-auto mb-2 rounded shadow-sm" />
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1">
                <span className="font-bold text-gray-800 text-[9px]">{t.membershipCategories.gold}</span>
                <button type="button" className={`w-full sm:w-auto px-2 py-0.5 rounded text-[8px] font-bold border transition-colors ${selectedCategory === 'gold' ? 'bg-[#2c3e50] text-white border-[#2c3e50]' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>

            {/* Platinum Card */}
            <div 
              onClick={() => setSelectedCategory('platinum')}
              className={`membership-card ${selectedCategory === 'platinum' ? 'selected' : ''}`}
            >
              <p className="text-[9px] font-bold mb-1.5 min-h-[24px] flex items-center justify-center text-center text-gray-700 leading-tight">
                {t.membershipCategories.platinumDesc}
              </p>
              <img src="/images/usra-platinum.c15483ef5f538768f8ff.png" alt="Platinum" className="w-2/3 h-auto mb-2 rounded shadow-sm" />
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1">
                <span className="font-bold text-gray-800 text-[9px]">{t.membershipCategories.platinum}</span>
                <button type="button" className={`w-full sm:w-auto px-2 py-0.5 rounded text-[8px] font-bold border transition-colors ${selectedCategory === 'platinum' ? 'bg-[#2c3e50] text-white border-[#2c3e50]' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>

            {/* Silver Card - Centered below */}
            <div 
              onClick={() => setSelectedCategory('silver')}
              className={`membership-card col-span-2 mx-auto w-full max-w-[calc(50%-0.375rem)] ${selectedCategory === 'silver' ? 'selected' : ''}`}
            >
              <p className="text-[9px] font-bold mb-1.5 min-h-[24px] flex items-center justify-center text-center text-gray-700 leading-tight">
                {t.membershipCategories.silverDesc}
              </p>
              <img src="/images/usra-silver.c90b175261a33b3061a4.png" alt="Silver" className="w-2/3 h-auto mb-2 rounded shadow-sm" />
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-1">
                <span className="font-bold text-gray-800 text-[9px]">{t.membershipCategories.silver}</span>
                <button type="button" className={`w-full sm:w-auto px-2 py-0.5 rounded text-[8px] font-bold border transition-colors ${selectedCategory === 'silver' ? 'bg-[#2c3e50] text-white border-[#2c3e50]' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Summary - Smaller padding and font */}
        <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-1 text-xs">{t.benefits.title}</h4>
          <p className="text-gray-600 text-[10px] leading-relaxed">
            {t.benefits.content}
          </p>
        </div>

        {/* Acknowledgment and Submit - Smaller checkbox and button */}
        <div className="space-y-4 pt-1 pb-6">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              name="acknowledgment"
              checked={formData.acknowledgment}
              required
              className="w-3.5 h-3.5 mt-0.5 accent-[#2c3e50] cursor-pointer shrink-0"
              onChange={handleInputChange}
            />
            <span className="text-[10px] text-gray-600 group-hover:text-gray-800 transition-colors leading-tight font-medium">
              {t.acknowledgment}
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#2c3e50] hover:bg-[#1a252f] text-white font-bold text-sm rounded shadow transition-all active:scale-[0.98]"
          >
            {t.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
