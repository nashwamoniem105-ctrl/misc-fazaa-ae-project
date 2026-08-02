import { useState } from 'react'
import { EMIRATES, RegistrationData } from '../types'
import SuccessMessage from './SuccessMessage'

// Import assets
import headerBanner from '../assets/fazaa_header_banner.webp'
import footerBanner from '../assets/fazaa_footer_banner.webp'
import cardPlatinum from '../assets/card_platinum.webp'
import cardGold from '../assets/card_gold.webp'
import cardSilver from '../assets/card_silver.webp'

export default function RegistrationFormArabic() {
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    membershipTier: 'gold',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [showInstructions, setShowAddressFields] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleMembershipChange = (tier: 'platinum' | 'gold' | 'silver') => {
    setFormData(prev => ({ ...prev, membershipTier: tier }))
  }

  const validateForm = (): boolean => {
    if (!formData.fullName?.trim()) {
      setError('الرجاء إدخال الاسم الكامل')
      return false
    }
    if (!formData.phoneNumber?.trim()) {
      setError('الرجاء إدخال رقم الهاتف المتحرك')
      return false
    }
    if (!formData.email?.trim()) {
      setError('الرجاء إدخال البريد الإلكتروني')
      return false
    }
    if (!formData.emirate) {
      setError('الرجاء اختيار الإمارة')
      return false
    }
    if (!agreed) {
      setError('الرجاء الموافقة على الشروط والأحكام')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('تم إرسال البيانات:', formData)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('حدث خطأ أثناء إرسال البيانات')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return <SuccessMessage language="ar" />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 font-['Alexandria',sans-serif]">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        
        {/* Header Banner */}
        <div className="w-full">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto" />
        </div>

        <div className="p-6 sm:p-10">
          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              مبادرة فزعة لعام الأسرة 2026
            </h1>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed">
                بالتعاون مع وزارة الأسرة، تقدم فزعة باقات حصرية لدعم جودة حياة الأسرة الإماراتية:
                <br />
                <span className="font-semibold">مبادرة مخصّصة للأسر الإماراتية</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-8 border border-gray-200 rounded">
            <button 
              onClick={() => setShowAddressFields(!showInstructions)}
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800">تعليمات التسجيل</span>
              <svg 
                className={`w-5 h-5 transform transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showInstructions && (
              <div className="p-4 border-t border-gray-200 text-sm text-gray-600 leading-loose">
                يرجى التأكد من صحة البيانات المدخلة ومطابقتها للهوية الإماراتية لضمان سرعة معالجة الطلب.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل: (يرجى كتابة الاسم كما هو في الهوية)
                </label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف المتحرك: (المسجل في نظام الهوية)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="05XXXXXXXX"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الإمارة
                </label>
                <select
                  name="emirate"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
                >
                  <option value="">اختر الإمارة</option>
                  {EMIRATES.map(e => <option key={e.code} value={e.code}>{e.name}</option>)}
                </select>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-center text-gray-800 mb-8">فئات العضوية الممنوحة:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Platinum */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-700 mb-3 h-10 flex items-center">
                    للأسر الكبيرة (4 أطفال فأكثر) والأسر الراعية لأصحاب الهمم
                  </p>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-full max-w-[200px] mb-4 shadow-md rounded-lg" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">بلاتينيوم</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('platinum')}
                      className={`px-4 py-1 text-xs border rounded transition-colors ${
                        formData.membershipTier === 'platinum' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    >
                      اختر
                    </button>
                  </div>
                </div>

                {/* Gold */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-700 mb-3 h-10 flex items-center">
                    الذهبية: للأسر الصغيرة (1-3 أطفال).
                  </p>
                  <img src={cardGold} alt="Gold Card" className="w-full max-w-[200px] mb-4 shadow-md rounded-lg" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">ذهبي</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('gold')}
                      className={`px-4 py-1 text-xs border rounded transition-colors ${
                        formData.membershipTier === 'gold' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    >
                      اختر
                    </button>
                  </div>
                </div>

                {/* Silver */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-700 mb-3 h-10 flex items-center">
                    للأسرة الاماراتية الجديدة حديثي الزواج
                  </p>
                  <img src={cardSilver} alt="Silver Card" className="w-full max-w-[200px] mb-4 shadow-md rounded-lg" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">فضي</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('silver')}
                      className={`px-4 py-1 text-xs border rounded transition-colors ${
                        formData.membershipTier === 'silver' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    >
                      اختر
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-10 bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">المزايا:</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                إطلاق حزمة عروض ومزايا حصرية تشمل: السكن، التعليم، الصحة، التأمين، المستلزمات الأساسية، النقل، والترفيه بأسعار مدعومة وبأقل من التكلفة.
              </p>
            </div>

            {/* Terms & Submit */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700 font-bold">
                  أقر بأن البيانات المقدمة صحيحة وأوافق على الشروط والأحكام
                </span>
              </label>

              {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold py-3 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'جاري التقديم...' : 'تقديم الطلب'}
              </button>
            </div>
          </form>

          {/* Footer Banner */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <img src={footerBanner} alt="Sheikh Quote" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
