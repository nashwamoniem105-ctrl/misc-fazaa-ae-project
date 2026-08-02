export interface RegistrationData {
  fullName: string
  phoneNumber: string
  email: string
  emirate: string
  membershipTier: 'platinum' | 'gold' | 'silver'
  idNumber: string
  addressEmirate: string
  addressCity: string
  addressDistrict: string
  addressStreet: string
  addressBuildingNumber: string
  addressApartmentNumber?: string
}

export interface RegistrationResponse {
  success: boolean
  message: string
  data?: RegistrationData
}

export const EMIRATES = [
  { code: 'AZ', name: 'أبو ظبي', nameEn: 'Abu Dhabi' },
  { code: 'DU', name: 'دبي', nameEn: 'Dubai' },
  { code: 'SH', name: 'الشارقة', nameEn: 'Sharjah' },
  { code: 'AJ', name: 'عجمان', nameEn: 'Ajman' },
  { code: 'UM', name: 'أم القيوين', nameEn: 'Umm Al Quwain' },
  { code: 'RK', name: 'رأس الخيمة', nameEn: 'Ras Al Khaimah' },
  { code: 'FU', name: 'الفجيرة', nameEn: 'Fujairah' },
]

export const MEMBERSHIP_TIERS = {
  platinum: {
    ar: 'بلاتينيوم - للأسر الكبيرة (4 أطفال فأكثر)',
    en: 'Platinum - For Large Families (4+ Children)',
    description_ar: 'للأسر الكبيرة والأسر الراعية لأصحاب الهمم',
    description_en: 'For large families and families supporting people of determination',
  },
  gold: {
    ar: 'ذهبي - للأسر الصغيرة (1-3 أطفال)',
    en: 'Gold - For Small Families (1-3 Children)',
    description_ar: 'للأسر الصغيرة',
    description_en: 'For small families',
  },
  silver: {
    ar: 'فضي - لحديثي الزواج',
    en: 'Silver - For Newlyweds',
    description_ar: 'للأسرة الإماراتية الجديدة حديثي الزواج',
    description_en: 'For newly married couples',
  },
}

export const EMIRATES_DISTRICTS: Record<string, string[]> = {
  AZ: ['أبو ظبي', 'الوثبة', 'المويجعي', 'الرويس', 'الدفرة', 'الغيثي', 'خليفة', 'مدينة زايد'],
  DU: ['دبي', 'بر دبي', 'ديرة', 'الخور', 'الرقة', 'الشندغة', 'البستان', 'الجافلية'],
  SH: ['الشارقة', 'خالد', 'الرولة', 'الحصن', 'الطوار', 'الرمرام', 'الروضة', 'الريفة'],
  AJ: ['عجمان', 'الزاهراء', 'الرويس', 'الجزيرة الحمراء', 'الشارقة', 'الخليج', 'المصفح'],
  UM: ['أم القيوين', 'الزاهراء', 'الخليج', 'الرويس', 'الرمرام'],
  RK: ['رأس الخيمة', 'خالد', 'الرمرام', 'الرويس', 'الخليج', 'الجزيرة الحمراء'],
  FU: ['الفجيرة', 'الخليج', 'الرويس', 'الرمرام', 'الخور'],
}
