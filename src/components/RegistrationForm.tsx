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
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.idNumber.trim()) newErrors.idNumber = true;
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.emirate) newErrors.emirate = true;
    if (!formData.membershipCategory) newErrors.membershipCategory = true;
    if (!formData.acknowledgment) newErrors.acknowledgment = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
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
    }
  };

  return (
    <section className="bg-gray-50 px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-primary px-8 py-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">{t.formTitle}</h2>
          <p className="opacity-90">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                {t.formLabels.fullName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t.formPlaceholders.fullName}
                className={`w-full px-5 py-3 rounded-xl border-2 transition-all outline-none ${
                  errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-primary/50 bg-gray-50'
                }`}
              />
            </div>

            {/* ID Number */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                {t.formLabels.idNumber} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder={t.formPlaceholders.idNumber}
                className={`w-full px-5 py-3 rounded-xl border-2 transition-all outline-none ${
                  errors.idNumber ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-primary/50 bg-gray-50'
                }`}
              />
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                {t.formLabels.mobileNumber} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder={t.formPlaceholders.mobileNumber}
                className={`w-full px-5 py-3 rounded-xl border-2 transition-all outline-none ${
                  errors.mobileNumber ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-primary/50 bg-gray-50'
                }`}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                {t.formLabels.email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.formPlaceholders.email}
                className={`w-full px-5 py-3 rounded-xl border-2 transition-all outline-none ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-primary/50 bg-gray-50'
                }`}
              />
            </div>

            {/* Emirate */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                {t.formLabels.emirate} <span className="text-red-500">*</span>
              </label>
              <select
                name="emirate"
                value={formData.emirate}
                onChange={handleChange}
                className={`w-full px-5 py-3 rounded-xl border-2 transition-all outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%238f6d26%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-[right_1rem_center] bg-no-repeat ${
                  errors.emirate ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-primary/50 bg-gray-50'
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

            {/* Membership */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                {t.formLabels.membershipCategory} <span className="text-red-500">*</span>
              </label>
              <select
                name="membershipCategory"
                value={formData.membershipCategory}
                onChange={handleChange}
                className={`w-full px-5 py-3 rounded-xl border-2 transition-all outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%238f6d26%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-[right_1rem_center] bg-no-repeat ${
                  errors.membershipCategory ? 'border-red-300 bg-red-50' : 'border-gray-100 focus:border-primary/50 bg-gray-50'
                }`}
              >
                <option value="">{t.membershipCategories.select}</option>
                <option value="silver">{t.membershipCategories.silver}</option>
                <option value="gold">{t.membershipCategories.gold}</option>
                <option value="platinum">{t.membershipCategories.platinum}</option>
              </select>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="acknowledgment"
                  checked={formData.acknowledgment}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-md border-2 transition-all ${
                  formData.acknowledgment ? 'bg-primary border-primary' : 'border-gray-300 bg-white'
                }`}>
                  {formData.acknowledgment && (
                    <svg className="w-full h-full text-white p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className={`text-sm transition-colors ${errors.acknowledgment ? 'text-red-500' : 'text-gray-600 group-hover:text-secondary'}`}>
                {t.acknowledgment}
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 transition-all active:scale-95"
            >
              {t.submitBtn}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
