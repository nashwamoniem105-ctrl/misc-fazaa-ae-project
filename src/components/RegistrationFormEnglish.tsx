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
    <div className="min-h-screen bg-[#f5f5f5] py-4 px-2 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[800px] mx-auto bg-white shadow-sm overflow-hidden rounded-md border border-gray-200">
        
        {/* Header Banner */}
        <div className="w-full">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto" />
        </div>

        <div className="p-4 sm:p-8">
          {/* Title & Description */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#222] mb-6">
              Fazaa Initiative for Family Year 2026
            </h1>
            <div className="bg-[#f8f9fa] p-4 rounded-lg border border-gray-100">
              <p className="text-[15px] text-[#444] leading-relaxed">
                In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of Emirati families:
                <br />
                <span className="font-bold text-[#222]">An initiative dedicated to Emirati families</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-6 border border-gray-200 rounded-md overflow-hidden">
            <button 
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-bold text-[#222]">Registration Instructions</span>
              <svg 
                className={`w-4 h-4 transform transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showInstructions && (
              <div className="p-4 border-t border-gray-200 text-[13px] text-[#666] leading-[1.8] bg-white">
                <p className="font-bold mb-2">Please read these instructions before starting registration</p>
                <ul className="list-disc pl-5 space-y-2">
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#444] mb-2">
                  Full Name: (Please write name as in ID)
                </label>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#444] mb-2">
                  Mobile Number: (Registered in ID system)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="05XXXXXXXX"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#444] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#444] mb-2">
                  Emirate
                </label>
                <select
                  name="emirate"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-[#d98a2b] focus:border-[#d98a2b] outline-none text-sm transition-all appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                >
                  <option value="">Select Emirate</option>
                  {EMIRATES.map(e => <option key={e.code} value={e.code}>{e.nameEn}</option>)}
                </select>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="mt-8">
              <h2 className="text-[17px] font-bold text-center text-[#222] mb-6">Granted Membership Tiers:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Platinum */}
                <div className={`flex flex-col items-center text-center p-4 border rounded-lg transition-all ${formData.membershipTier === 'platinum' ? 'border-[#d98a2b] bg-[#fffbf5]' : 'border-gray-200 bg-white'}`}>
                  <p className="text-[11px] font-bold text-[#444] mb-3 h-12 flex items-center justify-center">
                    For large families (4 children or more) and families caring for people of determination
                  </p>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-full max-w-[160px] mb-4" />
                  <div className="flex flex-col items-center gap-2 w-full">
                    <span className="font-bold text-[13px] text-[#222]">Platinum</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('platinum')}
                      className={`w-full py-1.5 text-[12px] border rounded transition-colors font-bold ${
                        formData.membershipTier === 'platinum' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-300 hover:border-[#d98a2b]'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {/* Gold */}
                <div className={`flex flex-col items-center text-center p-4 border rounded-lg transition-all ${formData.membershipTier === 'gold' ? 'border-[#d98a2b] bg-[#fffbf5]' : 'border-gray-200 bg-white'}`}>
                  <p className="text-[11px] font-bold text-[#444] mb-3 h-12 flex items-center justify-center">
                    Gold: For small families (1-3 children).
                  </p>
                  <img src={cardGold} alt="Gold Card" className="w-full max-w-[160px] mb-4" />
                  <div className="flex flex-col items-center gap-2 w-full">
                    <span className="font-bold text-[13px] text-[#222]">Gold</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('gold')}
                      className={`w-full py-1.5 text-[12px] border rounded transition-colors font-bold ${
                        formData.membershipTier === 'gold' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-300 hover:border-[#d98a2b]'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {/* Silver */}
                <div className={`flex flex-col items-center text-center p-4 border rounded-lg transition-all ${formData.membershipTier === 'silver' ? 'border-[#d98a2b] bg-[#fffbf5]' : 'border-gray-200 bg-white'}`}>
                  <p className="text-[11px] font-bold text-[#444] mb-3 h-12 flex items-center justify-center">
                    For new Emirati families (newlyweds)
                  </p>
                  <img src={cardSilver} alt="Silver Card" className="w-full max-w-[160px] mb-4" />
                  <div className="flex flex-col items-center gap-2 w-full">
                    <span className="font-bold text-[13px] text-[#222]">Silver</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('silver')}
                      className={`w-full py-1.5 text-[12px] border rounded transition-colors font-bold ${
                        formData.membershipTier === 'silver' ? 'bg-[#d98a2b] text-white border-[#d98a2b]' : 'bg-white text-[#666] border-gray-300 hover:border-[#d98a2b]'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 bg-[#f8f9fa] p-5 rounded-lg border border-gray-100">
              <h3 className="font-bold text-[14px] text-[#222] mb-2">Benefits:</h3>
              <p className="text-[12px] text-[#666] leading-relaxed">
                Launching a package of exclusive offers and benefits including: housing, education, health, insurance, basic supplies, transportation, and entertainment at subsidized prices below cost.
              </p>
            </div>

            {/* Terms & Submit */}
            <div className="space-y-4 pt-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 text-[#d98a2b] border-gray-300 rounded focus:ring-[#d98a2b]"
                />
                <span className="text-[13px] text-[#444] font-bold group-hover:text-[#222] transition-colors">
                  I acknowledge that the submitted data is correct and I agree to the terms and conditions
                </span>
              </label>

              {error && <p className="text-red-600 text-[13px] font-bold animate-pulse">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold py-3.5 rounded-md transition-all shadow-md active:transform active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>

          {/* Footer Banner */}
          <div className="mt-10 pt-6">
            <img src={footerBanner} alt="Sheikh Quote" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
