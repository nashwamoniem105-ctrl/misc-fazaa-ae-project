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
    if (!selectedCategory) return alert(language === 'ar' ? 'يرجى اختيار فئة' : 'Select category');
    alert(language === 'ar' ? 'تم تقديم طلبك بنجاح!' : 'Success!');
  };

  return (
    <div className="px-4 md:px-8 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Responsive Grid for Form Fields - 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
          <div>
            <label>{t.formLabels.fullName}</label>
            <input type="text" name="fullName" required placeholder={t.formPlaceholders.fullName} onChange={handleInputChange} />
          </div>
          <div>
            <label>{t.formLabels.mobileNumber}</label>
            <input type="tel" name="mobile" required placeholder="05XXXXXXXX" onChange={handleInputChange} />
          </div>
          <div>
            <label>{t.formLabels.email}</label>
            <input type="email" name="email" required placeholder="example@mail.com" onChange={handleInputChange} />
          </div>
          <div>
            <label>{t.formLabels.emirate}</label>
            <select name="emirate" required onChange={handleInputChange}>
              <option value="">{t.emirates.select}</option>
              {Object.entries(t.emirates).map(([key, value]) => key !== 'select' && <option key={key} value={key}>{value}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-8 space-y-6">
          <h3 className="text-base font-bold text-center text-gray-800">
            {t.formLabels.membershipCategory}
          </h3>
          
          {/* 2+1 Membership Card Layout - Centered and small */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div onClick={() => setSelectedCategory('platinum')} className={`membership-card ${selectedCategory === 'platinum' ? 'selected' : ''}`}>
              <p className="text-[9px] font-bold text-gray-400 mb-2 h-8 flex items-center leading-tight">{t.membershipCategories.platinumDesc}</p>
              <img src="/images/usra-platinum.c15483ef5f538768f8ff.png" alt="Platinum" className="w-32 h-auto mb-3" />
              <div className="flex justify-between items-center w-full mt-auto">
                <span className="font-bold text-gray-700 text-[10px]">{t.membershipCategories.platinum}</span>
                <button type="button" className={`px-3 py-1 rounded border text-[9px] font-bold transition-all ${selectedCategory === 'platinum' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-400 border-gray-200'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>

            <div onClick={() => setSelectedCategory('gold')} className={`membership-card ${selectedCategory === 'gold' ? 'selected' : ''}`}>
              <p className="text-[9px] font-bold text-gray-400 mb-2 h-8 flex items-center leading-tight">{t.membershipCategories.goldDesc}</p>
              <img src="/images/usra-gold.37a39d381c313f5791ad.png" alt="Gold" className="w-32 h-auto mb-3" />
              <div className="flex justify-between items-center w-full mt-auto">
                <span className="font-bold text-gray-700 text-[10px]">{t.membershipCategories.gold}</span>
                <button type="button" className={`px-3 py-1 rounded border text-[9px] font-bold transition-all ${selectedCategory === 'gold' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-400 border-gray-200'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>

            <div onClick={() => setSelectedCategory('silver')} className={`membership-card sm:col-span-2 mx-auto w-full sm:max-w-[calc(50%-0.5rem)] ${selectedCategory === 'silver' ? 'selected' : ''}`}>
              <p className="text-[9px] font-bold text-gray-400 mb-2 h-8 flex items-center leading-tight">{t.membershipCategories.silverDesc}</p>
              <img src="/images/usra-silver.c90b175261a33b3061a4.png" alt="Silver" className="w-32 h-auto mb-3" />
              <div className="flex justify-between items-center w-full mt-auto">
                <span className="font-bold text-gray-700 text-[10px]">{t.membershipCategories.silver}</span>
                <button type="button" className={`px-3 py-1 rounded border text-[9px] font-bold transition-all ${selectedCategory === 'silver' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-400 border-gray-200'}`}>
                  {t.membershipCategories.choose}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-[#f9f9f9] p-4 rounded border border-gray-100 mt-8">
          <h4 className="font-bold text-gray-800 mb-1 text-[11px]">{t.benefits.title}</h4>
          <p className="text-gray-500 text-[10px] leading-relaxed">
            {t.benefits.content}
          </p>
        </div>

        {/* Acknowledgment and Submit */}
        <div className="space-y-4 pt-4 pb-10">
          <label className="flex items-center gap-2 cursor-pointer group mt-0">
            <input
              type="checkbox"
              name="acknowledgment"
              checked={formData.acknowledgment}
              required
              className="w-4 h-4 accent-primary cursor-pointer"
              onChange={handleInputChange}
            />
            <span className="text-[10px] text-gray-500 font-medium">
              {t.acknowledgment}
            </span>
          </label>

          <button type="submit" className="btn-primary">
            {t.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
}
