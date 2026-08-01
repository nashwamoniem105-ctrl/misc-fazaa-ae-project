import { useState } from 'react';
import type { Language } from '../translations';
import { translations } from '../translations';

interface RegistrationFormProps {
  language: Language;
}

interface FormData {
  fullName: string;
  idNumber: string;
  mobileNumber: string;
  email: string;
  emirate: string;
  membershipCategory: string;
  acknowledgment: boolean;
}

interface FormErrors {
  fullName?: boolean;
  idNumber?: boolean;
  mobileNumber?: boolean;
  email?: boolean;
  emirate?: boolean;
  membershipCategory?: boolean;
  acknowledgment?: boolean;
}

export default function RegistrationForm({ language }: RegistrationFormProps) {
  const t = translations[language];
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    idNumber: '',
    mobileNumber: '',
    email: '',
    emirate: '',
    membershipCategory: '',
    acknowledgment: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = true;
    }
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = true;
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = true;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = true;
    }
    if (!formData.emirate) {
      newErrors.emirate = true;
    }
    if (!formData.membershipCategory) {
      newErrors.membershipCategory = true;
    }
    if (!formData.acknowledgment) {
      newErrors.acknowledgment = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form Data:', formData);
      alert(language === 'ar' ? 'تم تقديم طلبك بنجاح!' : 'Your application has been submitted successfully!');
      setFormData({
        fullName: '',
        idNumber: '',
        mobileNumber: '',
        email: '',
        emirate: '',
        membershipCategory: '',
        acknowledgment: false,
      });
      setErrors({});
    } else {
      alert(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
    }
  };

  return (
    <section className="bg-gray-100 px-6 py-12 md:px-8 md:py-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-12">
        {t.formTitle}
      </h2>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t.formLabels.fullName} *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t.formPlaceholders.fullName}
            className={`w-full px-4 py-3 border-2 rounded-lg font-alexandria transition-all focus:outline-none ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t.formLabels.idNumber} *
          </label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder={t.formPlaceholders.idNumber}
            className={`w-full px-4 py-3 border-2 rounded-lg font-alexandria transition-all focus:outline-none ${
              errors.idNumber ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t.formLabels.mobileNumber} *
          </label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder={t.formPlaceholders.mobileNumber}
            className={`w-full px-4 py-3 border-2 rounded-lg font-alexandria transition-all focus:outline-none ${
              errors.mobileNumber ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t.formLabels.email} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.formPlaceholders.email}
            className={`w-full px-4 py-3 border-2 rounded-lg font-alexandria transition-all focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t.formLabels.emirate} *
          </label>
          <select
            name="emirate"
            value={formData.emirate}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg font-alexandria transition-all focus:outline-none ${
              errors.emirate ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          >
            <option value="">{t.emirates.select}</option>
            <option value="abu-dhabi">{t.emirates['abu-dhabi']}</option>
            <option value="dubai">{t.emirates.dubai}</option>
            <option value="sharjah">{t.emirates.sharjah}</option>
            <option value="ajman">{t.emirates.ajman}</option>
            <option value="umm-al-quwain">{t.emirates['umm-al-quwain']}</option>
            <option value="ras-al-khaimah">{t.emirates['ras-al-khaimah']}</option>
            <option value="fujairah">{t.emirates.fujairah}</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            {t.formLabels.membershipCategory} *
          </label>
          <select
            name="membershipCategory"
            value={formData.membershipCategory}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg font-alexandria transition-all focus:outline-none ${
              errors.membershipCategory ? 'border-red-500' : 'border-gray-300 focus:border-primary'
            }`}
          >
            <option value="">{t.membershipCategories.select}</option>
            <option value="silver">{t.membershipCategories.silver}</option>
            <option value="gold">{t.membershipCategories.gold}</option>
            <option value="platinum">{t.membershipCategories.platinum}</option>
          </select>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <input
            type="checkbox"
            id="acknowledgment"
            name="acknowledgment"
            checked={formData.acknowledgment}
            onChange={handleChange}
            className="w-5 h-5 accent-primary cursor-pointer"
          />
          <label htmlFor="acknowledgment" className="text-gray-700 cursor-pointer text-sm">
            {t.acknowledgment}
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white font-bold text-lg rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all active:translate-y-0"
        >
          {t.submitBtn}
        </button>
      </form>
    </section>
  );
}
