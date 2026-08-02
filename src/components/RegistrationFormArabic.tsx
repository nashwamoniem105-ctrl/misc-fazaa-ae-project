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
    <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 font-['Alexandria',sans-serif]">
      <div className="max-w-[800px] mx-auto bg-white shadow-sm overflow-hidden">
        
        {/* Header Banner */}
        <div className="w-full">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto" />
        </div>

        <div className="p-6 sm:p-12">
          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-[#222] mb-8">
              مبادرة فزعة لعام الأسرة 2026
            </h1>
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
              <p className="text-[16px] text-[#444] leading-relaxed">
                بالتعاون مع وزارة الأسرة، تقدم فزعة باقات حصرية لدعم جودة حياة الأسرة الإماراتية:
                <br />
                <span className="font-bold text-[#222] block mt-2">مبادرة مخصّصة للأسر الإماراتية</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
            <button 
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-right"
            >
              <span className="font-bold text-[#222] text-lg">تعليمات التسجيل</span>
              <svg 
                className={`w-5 h-5 transform transition-transform duration-300 ${showInstructions ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showInstructions && (
              <div className="p-6 border-t border-gray-100 text-[14px] text-[#666] leading-[2] bg-white animate-fade-in">
                <p className="font-bold mb-3 text-[#222]">يرجى قراءة هذه التعليمات قبل البدء بالتسجيل:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>العضوية مجانية بالكامل ومخصّصة للعائلات الإماراتية، ولا تترتب عليها أي رسوم.</li>
                  <li>التسجيل في المبادرة متاح طوال عام 2026، وفي حال مواجهتكم لصعوبة أثناء التقديم على المبادرة يُرجى المحاولة لاحقًا وإعادة التسجيل.</li>
                  <li>يمكن للزوج أو الزوجة التقدّم بطلب التسجيل، وتُصدر العضوية باسم مقدّم الطلب.</li>
                  <li>يُسمح بإصدار عضوية واحدة فقط لكل أسرة.</li>
                  <li>في حال وجود عضوية فزعة سارية، تُصدر عضوية العائلة كعضوية مستقلة، وسيكون لديكم عضويتان صالحتان في الوقت نفسه.</li>
                  <li>يتم إصدار العضوية خلال مدة تتراوح بين 48 و72 ساعة.</li>
                  <li>يمكن التقديم عبر جهاز الهاتف المتحرك أو أجهزة الكمبيوتر، مع إمكانية إرفاق المستندات من خلال أجهزة الكمبيوتر.</li>
                  <li>في حال واجهتم صعوبة في تصوير بطاقة الهوية، يُرجى إعادة المحاولة مع تحسين الإضاءة.</li>
                  <li>في حال عدم استلام رمز التحقق (OTP) على البريد الإلكتروني، يرجى مراجعة مجلدي Spam أو Junk.</li>
                  <li>في حال كان البريد الإلكتروني مستخدمًا مسبقًا في فزعة، يُرجى استخدام بريد إلكتروني آخر عند التقديم.</li>
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#444]">
                  الاسم الكامل: (يرجى كتابة الاسم كما هو في الهوية)
                </label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#444]">
                  رقم الهاتف المتحرك: (المسجل في نظام الهوية)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="05XXXXXXXX"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#444]">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#444]">
                  الإمارة
                </label>
                <div className="relative">
                  <select
                    name="emirate"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all appearance-none"
                  >
                    <option value="">اختر الإمارة</option>
                    {EMIRATES.map(e => <option key={e.code} value={e.code}>{e.name}</option>)}
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-center text-[#222] mb-10">فئات العضوية الممنوحة:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Silver - Left in RTL */}
                <div 
                  onClick={() => handleMembershipChange('silver')}
                  className={`flex flex-col items-center text-center p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.membershipTier === 'silver' ? 'border-[#d98a2b] bg-[#fffbf5] shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <p className="text-[12px] font-bold text-[#444] leading-tight px-2">
                      للأسرة الاماراتية الجديدة حديثي الزواج
                    </p>
                  </div>
                  <img src={cardSilver} alt="Silver Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-2 mt-auto">
                    <span className="font-bold text-[14px] text-[#222]">فضي</span>
                    <div className={`px-4 py-1 text-[12px] border rounded transition-all font-bold ${
                      formData.membershipTier === 'silver' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-200'
                    }`}>
                      اختر
                    </div>
                  </div>
                </div>

                {/* Gold - Center */}
                <div 
                  onClick={() => handleMembershipChange('gold')}
                  className={`flex flex-col items-center text-center p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.membershipTier === 'gold' ? 'border-[#d98a2b] bg-[#fffbf5] shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <p className="text-[12px] font-bold text-[#444] leading-tight px-2">
                      الذهبية: للأسر الصغيرة (1-3 أطفال).
                    </p>
                  </div>
                  <img src={cardGold} alt="Gold Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-2 mt-auto">
                    <span className="font-bold text-[14px] text-[#222]">ذهبي</span>
                    <div className={`px-4 py-1 text-[12px] border rounded transition-all font-bold ${
                      formData.membershipTier === 'gold' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-200'
                    }`}>
                      اختر
                    </div>
                  </div>
                </div>

                {/* Platinum - Right in RTL (Black Card) */}
                <div 
                  onClick={() => handleMembershipChange('platinum')}
                  className={`flex flex-col items-center text-center p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.membershipTier === 'platinum' ? 'border-[#d98a2b] bg-[#fffbf5] shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <p className="text-[12px] font-bold text-[#444] leading-tight px-2">
                      للأسر الكبيرة (4 أطفال فأكثر) والأسر الراعية لأصحاب الهمم
                    </p>
                  </div>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-2 mt-auto">
                    <span className="font-bold text-[14px] text-[#222]">بلاتينيوم</span>
                    <div className={`px-4 py-1 text-[12px] border rounded transition-all font-bold ${
                      formData.membershipTier === 'platinum' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-200'
                    }`}>
                      اختر
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-[16px] text-[#222] mb-3">المزايا:</h3>
              <p className="text-[14px] text-[#666] leading-relaxed">
                إطلاق حزمة عروض ومزايا حصرية تشمل: السكن، التعليم، الصحة، التأمين، المستلزمات الأساسية، النقل، والترفيه بأسعار مدعومة وبأقل من التكلفة.
              </p>
            </div>

            {/* Terms & Submit */}
            <div className="space-y-6 pt-6">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 text-[#d98a2b] border-gray-300 rounded-md focus:ring-[#d98a2b]"
                />
                <span className="text-[14px] text-[#444] font-bold group-hover:text-[#222] transition-colors">
                  أقر بأن البيانات المقدمة صحيحة وأوافق على الشروط والأحكام
                </span>
              </label>

              {error && <p className="text-red-600 text-[14px] font-bold animate-pulse">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold py-4 rounded-xl transition-all shadow-md active:transform active:scale-[0.99] disabled:opacity-50 text-lg"
              >
                {loading ? 'جاري التقديم...' : 'تقديم الطلب'}
              </button>
            </div>
          </form>

          {/* Footer Banner */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <img src={footerBanner} alt="Sheikh Quote" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
