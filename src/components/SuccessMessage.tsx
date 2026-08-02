import { useEffect, useState } from 'react'

interface SuccessMessageProps {
  language: 'ar' | 'en'
}

export default function SuccessMessage({ language }: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const isArabic = language === 'ar'

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isVisible ? 'animate-fade-in' : ''}`}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Title */}
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            {isArabic ? '✓ تم بنجاح!' : '✓ Success!'}
          </h2>

          {/* Success Message */}
          <p className="text-lg text-dark-600 mb-6">
            {isArabic
              ? 'تم استقبال طلبك بنجاح. سيتم التواصل معك قريباً على البريد الإلكتروني أو رقم الهاتف المسجل.'
              : 'Your application has been successfully received. We will contact you soon at the email address or phone number provided.'}
          </p>

          {/* Details */}
          <div className="bg-gold-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-dark-700">
              {isArabic
                ? '📧 تحقق من بريدك الإلكتروني للحصول على تفاصيل إضافية'
                : '📧 Check your email for additional details'}
            </p>
          </div>

          {/* Footer Message */}
          <p className="text-xs text-dark-500">
            {isArabic
              ? 'شكراً لك على انضمامك لمبادرة فزعة'
              : 'Thank you for joining Fazaa Initiative'}
          </p>
        </div>

        {/* Redirect Info */}
        <p className="text-center text-dark-600 mt-6 text-sm">
          {isArabic
            ? 'ستتم إعادة التوجيه تلقائياً خلال قليل...'
            : 'You will be redirected automatically in a moment...'}
        </p>
      </div>
    </div>
  )
}
