import { useState } from 'react'
import { EMIRATES, RegistrationData } from '../types'
import SuccessMessage from './SuccessMessage'

// Import assets from static/media to match target site exactly
const headerBanner = '/static/media/Wide-pic-web-ready.fa601e597d6b23470711.jpg'
const footerBanner = '/static/media/Sheikh-Quote.57d90acf46b7581ce8c9.jpg'
const cardPlatinum = '/static/media/usra-platinum.c15483ef5f538768f8ff.png'
const cardGold = '/static/media/usra-gold.37a39d381c313f5791ad.png'
const cardSilver = '/static/media/usra-silver.c90b175261a33b3061a4.png'

export default function RegistrationFormArabic() {
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    membershipTier: 'gold',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

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
      setSubmitted(true)
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
    <div className="min-h-screen bg-[#e9e9e9] sm:py-8 font-['Alexandria',sans-serif]">
      <div className="max-w-[843px] mx-auto bg-white shadow-sm sm:rounded-[4px] overflow-hidden">
        
        {/* Header Banner */}
        <div className="w-full">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto block" />
        </div>

        <div className="px-4 py-8 sm:px-16 sm:py-12">
          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-[20px] sm:text-[24px] font-normal text-[#000000de] mb-8 tracking-[0.0075em]">
              مبادرة فزعة لعام الأسرة 2026
            </h1>
            <div className="bg-[#0000000a] p-4 sm:p-6 rounded-[8px]">
              <p className="text-[14px] sm:text-[15px] text-[#00000099] leading-[1.6]">
                بالتعاون مع وزارة الأسرة، تقدم فزعة باقات حصرية لدعم جودة حياة الأسرة الإماراتية:
                <br />
                <span className="font-bold text-[#000000de] block mt-1">مبادرة مخصّصة للأسر الإماراتية</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-8 border-b border-[#0000001f]">
            <button 
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex justify-between items-center py-4 bg-white text-right"
            >
              <span className="text-[16px] font-medium text-[#000000de]">تعليمات التسجيل</span>
              <svg 
                className={`w-5 h-5 text-[#0000008a] transform transition-transform duration-200 ${showInstructions ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showInstructions && (
              <div className="pb-4 text-[14px] text-[#00000099] leading-[2] bg-white animate-fade-in">
                <p className="font-bold mb-2 text-[#000000de]">يرجى قراءة هذه التعليمات قبل البدء بالتسجيل:</p>
                <ul className="list-disc pr-5 space-y-1">
                  <li>العضوية مجانية بالكامل ومخصّصة للعائلات الإماراتية، ولا تترتب عليها أي رسوم.</li>
                  <li>التسجيل في المبادرة متاح طوال عام 2026.</li>
                  <li>يمكن للزوج أو الزوجة التقدّم بطلب التسجيل.</li>
                  <li>يُسمح بإصدار عضوية واحدة فقط لكل أسرة.</li>
                  <li>يتم إصدار العضوية خلال مدة تتراوح بين 48 و72 ساعة.</li>
                  <li>يمكن التقديم عبر جهاز الهاتف المتحرك أو أجهزة الكمبيوتر.</li>
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              <div className="space-y-1">
                <label className="block text-[12px] text-[#00000099]">
                  الاسم الكامل: (يرجى كتابة الاسم كما هو في الهوية)
                </label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-b border-[#0000006b] focus:border-[#d98a2b] outline-none text-[16px] transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[12px] text-[#00000099]">
                  رقم الهاتف المتحرك: (المسجل في نظام الهوية)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="05XXXXXXXX"
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-b border-[#0000006b] focus:border-[#d98a2b] outline-none text-[16px] transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[12px] text-[#00000099]">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-b border-[#0000006b] focus:border-[#d98a2b] outline-none text-[16px] transition-colors"
                />
              </div>
              <div className="space-y-1 relative">
                <label className="block text-[12px] text-[#00000099]">
                  الإمارة
                </label>
                <select
                  name="emirate"
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-b border-[#0000006b] bg-white focus:border-[#d98a2b] outline-none text-[16px] appearance-none"
                >
                  <option value="">​</option>
                  {EMIRATES.map(e => <option key={e.code} value={e.code}>{e.name}</option>)}
                </select>
                <div className="absolute left-0 bottom-3 pointer-events-none">
                  <svg className="w-4 h-4 text-[#0000008a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="mt-12">
              <h2 className="text-[18px] sm:text-[20px] font-medium text-center text-[#000000de] mb-10">فئات العضوية الممنوحة:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4">
                
                {/* Platinum - Black Card */}
                <div className="flex flex-col items-center text-center group">
                  <div className="h-[60px] flex items-center justify-center mb-4 px-2">
                    <p className="text-[12px] font-bold text-[#00000099] leading-[1.4]">
                      للأسر الكبيرة (4 أطفال فأكثر) والأسر الراعية لأصحاب الهمم
                    </p>
                  </div>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-[200px] sm:w-full max-w-[200px] mb-4 shadow-sm rounded-[8px]" />
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[14px] font-medium text-[#000000de]">بلاتينيوم</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('platinum')}
                      className={`px-4 py-1 text-[13px] border rounded-[4px] font-medium transition-all ${
                        formData.membershipTier === 'platinum' ? 'bg-[#000000de] text-white border-[#000000de]' : 'bg-white text-[#0000008a] border-[#0000003b] hover:border-[#000000de]'
                      }`}
                    >
                      اختر
                    </button>
                  </div>
                </div>

                {/* Gold - Center */}
                <div className="flex flex-col items-center text-center group">
                  <div className="h-[60px] flex items-center justify-center mb-4 px-2">
                    <p className="text-[12px] font-bold text-[#00000099] leading-[1.4]">
                      الذهبية: للأسر الصغيرة (1-3 أطفال).
                    </p>
                  </div>
                  <img src={cardGold} alt="Gold Card" className="w-[200px] sm:w-full max-w-[200px] mb-4 shadow-sm rounded-[8px]" />
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[14px] font-medium text-[#000000de]">ذهبي</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('gold')}
                      className={`px-4 py-1 text-[13px] border rounded-[4px] font-medium transition-all ${
                        formData.membershipTier === 'gold' ? 'bg-[#000000de] text-white border-[#000000de]' : 'bg-white text-[#0000008a] border-[#0000003b] hover:border-[#000000de]'
                      }`}
                    >
                      اختر
                    </button>
                  </div>
                </div>

                {/* Silver */}
                <div className="flex flex-col items-center text-center group">
                  <div className="h-[60px] flex items-center justify-center mb-4 px-2">
                    <p className="text-[12px] font-bold text-[#00000099] leading-[1.4]">
                      للأسرة الاماراتية الجديدة حديثي الزواج
                    </p>
                  </div>
                  <img src={cardSilver} alt="Silver Card" className="w-[200px] sm:w-full max-w-[200px] mb-4 shadow-sm rounded-[8px]" />
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[14px] font-medium text-[#000000de]">فضي</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('silver')}
                      className={`px-4 py-1 text-[13px] border rounded-[4px] font-medium transition-all ${
                        formData.membershipTier === 'silver' ? 'bg-[#000000de] text-white border-[#000000de]' : 'bg-white text-[#0000008a] border-[#0000003b] hover:border-[#000000de]'
                      }`}
                    >
                      اختر
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 pt-6">
              <h3 className="font-bold text-[14px] text-[#000000de] mb-2">المزايا:</h3>
              <p className="text-[13px] text-[#00000099] leading-[1.6]">
                إطلاق حزمة عروض ومزايا حصرية تشمل: السكن، التعليم، الصحة، التأمين، المستلزمات الأساسية، النقل، والترفيه بأسعار مدعومة وبأقل من التكلفة.
              </p>
            </div>

            {/* Terms & Submit */}
            <div className="space-y-6 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-[18px] h-[18px] text-[#d98a2b] border-[#0000006b] rounded focus:ring-0"
                />
                <span className="text-[14px] text-[#000000de] font-medium">
                  أقر بأن البيانات المقدمة صحيحة وأوافق على الشروط والأحكام
                </span>
              </label>

              {error && <p className="text-[#d32f2f] text-[12px] font-medium">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-medium py-[10px] rounded-[4px] transition-all shadow-md active:shadow-sm disabled:opacity-50 text-[15px] uppercase tracking-[0.02857em]"
              >
                {loading ? 'جاري التقديم...' : 'تقديم الطلب'}
              </button>
            </div>
          </form>

          {/* Footer Banner */}
          <div className="mt-12 pt-8">
            <img src={footerBanner} alt="Sheikh Quote" className="w-full h-auto block" />
          </div>
        </div>
      </div>
    </div>
  )
}
