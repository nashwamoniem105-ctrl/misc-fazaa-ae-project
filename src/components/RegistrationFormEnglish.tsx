import { useState } from 'react'
import { EMIRATES, RegistrationData } from '../types'
import SuccessMessage from './SuccessMessage'

// Import assets from static/media to match target site exactly
const headerBanner = '/static/media/Wide-pic-web-ready.fa601e597d6b23470711.jpg'
const footerBanner = '/static/media/Sheikh-Quote.57d90acf46b7581ce8c9.jpg'
const cardPlatinum = '/static/media/usra-platinum.c15483ef5f538768f8ff.png'
const cardGold = '/static/media/usra-gold.37a39d381c313f5791ad.png'
const cardSilver = '/static/media/usra-silver.c90b175261a33b3061a4.png'

export default function RegistrationFormEnglish() {
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
      setError('Please enter your full name')
      return false
    }
    if (!formData.phoneNumber?.trim()) {
      setError('Please enter your mobile number')
      return false
    }
    if (!formData.email?.trim()) {
      setError('Please enter your email address')
      return false
    }
    if (!formData.emirate) {
      setError('Please select an emirate')
      return false
    }
    if (!agreed) {
      setError('Please agree to the terms and conditions')
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
      setError('An error occurred during submission')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return <SuccessMessage language="en" />
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 font-sans">
      <div className="max-w-[800px] mx-auto bg-white shadow-sm overflow-hidden">
        
        {/* Header Banner */}
        <div className="w-full">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto" />
        </div>

        <div className="p-6 sm:p-12">
          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-medium text-[#222] mb-8">
              Fazaa Initiative for Family Year 2026
            </h1>
            <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
              <p className="text-[16px] text-[#444] leading-relaxed">
                In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of Emirati families:
                <br />
                <span className="font-bold text-[#222] block mt-2">An initiative dedicated to Emirati families</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-8 border border-gray-200 rounded-xl overflow-hidden">
            <button 
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-bold text-[#222] text-lg">Registration Instructions</span>
              <svg 
                className={`w-5 h-5 transform transition-transform duration-300 ${showInstructions ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showInstructions && (
              <div className="p-6 border-t border-gray-100 text-[14px] text-[#666] leading-[2] bg-white animate-fade-in">
                <p className="font-bold mb-3 text-[#222]">Please read these instructions before starting registration:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Membership is completely free and dedicated to Emirati families, no fees apply.</li>
                  <li>Registration is available throughout 2026. If you face difficulties, please try again later.</li>
                  <li>Either husband or wife can apply, and membership is issued in the applicant's name.</li>
                  <li>Only one membership is allowed per family.</li>
                  <li>If you have an active Fazaa membership, the family membership will be issued as a separate one.</li>
                  <li>Membership is issued within 48 to 72 hours.</li>
                  <li>Application can be done via mobile or computer.</li>
                  <li>If you face difficulty photographing the ID, please try again with better lighting.</li>
                  <li>If you don't receive the OTP via email, please check Spam or Junk folders.</li>
                  <li>If the email is already used in Fazaa, please use another email.</li>
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#444]">
                  Full Name: (Please write name as in ID)
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
                  Mobile Number: (Registered in ID system)
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
                  Email Address
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
                  Emirate
                </label>
                <div className="relative">
                  <select
                    name="emirate"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all appearance-none"
                  >
                    <option value="">Select Emirate</option>
                    {EMIRATES.map(e => <option key={e.code} value={e.code}>{e.nameEn}</option>)}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-center text-[#222] mb-10">Granted Membership Tiers:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Platinum - Left in LTR (Black Card) */}
                <div 
                  onClick={() => handleMembershipChange('platinum')}
                  className={`flex flex-col items-center text-center p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.membershipTier === 'platinum' ? 'border-[#d98a2b] bg-[#fffbf5] shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <p className="text-[12px] font-bold text-[#444] leading-tight px-2">
                      For large families (4 children or more) and families caring for people of determination
                    </p>
                  </div>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-2 mt-auto">
                    <span className="font-bold text-[14px] text-[#222]">Platinum</span>
                    <div className={`px-4 py-1 text-[12px] border rounded transition-all font-bold ${
                      formData.membershipTier === 'platinum' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-200'
                    }`}>
                      Select
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
                      Gold: For small families (1-3 children).
                    </p>
                  </div>
                  <img src={cardGold} alt="Gold Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-2 mt-auto">
                    <span className="font-bold text-[14px] text-[#222]">Gold</span>
                    <div className={`px-4 py-1 text-[12px] border rounded transition-all font-bold ${
                      formData.membershipTier === 'gold' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-200'
                    }`}>
                      Select
                    </div>
                  </div>
                </div>

                {/* Silver - Right in LTR */}
                <div 
                  onClick={() => handleMembershipChange('silver')}
                  className={`flex flex-col items-center text-center p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.membershipTier === 'silver' ? 'border-[#d98a2b] bg-[#fffbf5] shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <p className="text-[12px] font-bold text-[#444] leading-tight px-2">
                      For new Emirati families (newlyweds)
                    </p>
                  </div>
                  <img src={cardSilver} alt="Silver Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-2 mt-auto">
                    <span className="font-bold text-[14px] text-[#222]">Silver</span>
                    <div className={`px-4 py-1 text-[12px] border rounded transition-all font-bold ${
                      formData.membershipTier === 'silver' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-200'
                    }`}>
                      Select
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-12 bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-[16px] text-[#222] mb-3">Benefits:</h3>
              <p className="text-[14px] text-[#666] leading-relaxed">
                Launching a package of exclusive offers and benefits including: housing, education, health, insurance, basic supplies, transportation, and entertainment at subsidized prices below cost.
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
                  I acknowledge that the submitted data is correct and I agree to the terms and conditions
                </span>
              </label>

              {error && <p className="text-red-600 text-[14px] font-bold animate-pulse">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold py-4 rounded-xl transition-all shadow-md active:transform active:scale-[0.99] disabled:opacity-50 text-lg"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
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
