import { useState } from 'react'
import { EMIRATES, RegistrationData } from '../types'
import SuccessMessage from './SuccessMessage'

// Import assets correctly
import headerBanner from '../assets/fazaa_header_banner.webp'
import footerBanner from '../assets/fazaa_footer_banner.webp'
import cardPlatinum from '../assets/card_platinum.webp'
import cardGold from '../assets/card_gold.webp'
import cardSilver from '../assets/card_silver.webp'

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
    if (!validateForm()) return
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
    <div className="min-h-screen bg-[#f5f5f5] py-4 px-4 font-sans">
      <div className="max-w-[800px] mx-auto bg-white shadow-md rounded-[4px] overflow-hidden">
        
        {/* Header Banner */}
        <div className="w-full px-4 pt-6">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto block rounded-[4px]" />
        </div>

        <div className="p-6 sm:p-12">
          {/* Title & Description */}
          <div className="text-center mb-10">
            <h1 className="text-[24px] sm:text-[32px] font-medium text-[#222] mb-8">
              Fazaa Initiative for Family Year 2026
            </h1>
            <div className="bg-[#f8f9fa] p-6 rounded-[16px] border border-gray-100 mx-auto max-w-[600px]">
              <p className="text-[15px] sm:text-[16px] text-[#444] leading-[1.8]">
                In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of Emirati families:
                <br />
                <span className="font-bold text-[#222] block mt-2">An initiative dedicated to Emirati families</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-10 border border-[#b38e5d] rounded-[4px] overflow-hidden">
            <button 
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <svg 
                  className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${showInstructions ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <span className="font-bold text-[#222] text-[18px]">Registration Instructions</span>
            </button>
            {showInstructions && (
              <div className="p-6 border-t border-[#b38e5d] text-[14px] text-[#555] leading-[2] bg-white animate-fade-in">
                <p className="font-bold mb-3 text-[#222]">Please read these instructions before starting registration:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Membership is completely free and dedicated to Emirati families.</li>
                  <li>Registration is available throughout 2026.</li>
                  <li>Either husband or wife can apply.</li>
                  <li>Only one membership is allowed per family.</li>
                  <li>Membership is issued within 48 to 72 hours.</li>
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#444]">
                  Full Name: (Please write name as in ID)
                </label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#444]">
                  Mobile Number: (Registered in ID system)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="05XXXXXXXX"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#444]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[14px] font-bold text-[#444]">
                  Emirate
                </label>
                <div className="relative">
                  <select
                    name="emirate"
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-[4px] bg-white focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all shadow-sm appearance-none"
                  >
                    <option value="">​</option>
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
            <div className="mt-16">
              <h2 className="text-[22px] font-bold text-center text-[#222] mb-12">Granted Membership Tiers:</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Gold Card */}
                <div className="flex flex-col items-center text-center p-3 border border-gray-100 rounded-[12px] shadow-sm bg-white">
                  <div className="h-[50px] flex items-center justify-center mb-3">
                    <p className="text-[11px] font-bold text-[#444] leading-tight">
                      Gold: For small families (1-3 children).
                    </p>
                  </div>
                  <img src={cardGold} alt="Gold Card" className="w-full max-w-[150px] mb-4 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-1 mt-auto gap-2">
                    <span className="font-bold text-[13px] text-[#222]">Gold</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('gold')}
                      className={`px-3 py-1 text-[11px] border rounded-[4px] transition-all font-bold ${
                        formData.membershipTier === 'gold' ? 'bg-[#b38e5d] text-white border-[#b38e5d]' : 'bg-white text-[#b38e5d] border-[#b38e5d]'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {/* Platinum Card */}
                <div className="flex flex-col items-center text-center p-3 border border-gray-100 rounded-[12px] shadow-sm bg-white">
                  <div className="h-[50px] flex items-center justify-center mb-3">
                    <p className="text-[11px] font-bold text-[#444] leading-tight">
                      For large families (4+ children) and people of determination
                    </p>
                  </div>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-full max-w-[150px] mb-4 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-1 mt-auto gap-2">
                    <span className="font-bold text-[13px] text-[#222]">Platinum</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('platinum')}
                      className={`px-3 py-1 text-[11px] border rounded-[4px] transition-all font-bold ${
                        formData.membershipTier === 'platinum' ? 'bg-[#b38e5d] text-white border-[#b38e5d]' : 'bg-white text-[#b38e5d] border-[#b38e5d]'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {/* Silver Card */}
                <div className="flex flex-col items-center text-center p-3 border border-gray-100 rounded-[12px] shadow-sm bg-white col-span-2 sm:col-span-1 max-w-[200px] mx-auto w-full">
                  <div className="h-[50px] flex items-center justify-center mb-3">
                    <p className="text-[11px] font-bold text-[#444] leading-tight">
                      For new Emirati families (newlyweds)
                    </p>
                  </div>
                  <img src={cardSilver} alt="Silver Card" className="w-full max-w-[150px] mb-4 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-1 mt-auto gap-2">
                    <span className="font-bold text-[13px] text-[#222]">Silver</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('silver')}
                      className={`px-3 py-1 text-[11px] border rounded-[4px] transition-all font-bold ${
                        formData.membershipTier === 'silver' ? 'bg-[#b38e5d] text-white border-[#b38e5d]' : 'bg-white text-[#b38e5d] border-[#b38e5d]'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-16 bg-[#f8f9fa] p-8 rounded-[24px] border border-gray-50">
              <h3 className="font-bold text-[18px] text-[#222] mb-4">Benefits:</h3>
              <p className="text-[15px] text-[#555] leading-[1.8]">
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
                  className="w-5 h-5 text-[#b38e5d] border-gray-300 rounded focus:ring-[#b38e5d]"
                />
                <span className="text-[15px] text-[#444] font-bold group-hover:text-[#222] transition-colors">
                  I acknowledge that the submitted data is correct and I agree to the terms and conditions
                </span>
              </label>

              {error && <p className="text-red-600 text-[14px] font-bold">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold py-4 rounded-[8px] transition-all shadow-lg text-[18px]"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>

          {/* Footer Banner */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <img src={footerBanner} alt="Sheikh Quote" className="w-full h-auto block rounded-[8px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
