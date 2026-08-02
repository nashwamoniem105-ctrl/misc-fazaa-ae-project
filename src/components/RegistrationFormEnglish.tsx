import { useState } from 'react'
import { EMIRATES, RegistrationData } from '../types'
import SuccessMessage from './SuccessMessage'

// Import assets
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
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Data submitted:', formData)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-sm overflow-hidden">
        
        {/* Header Banner */}
        <div className="w-full">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto" />
        </div>

        <div className="p-6 sm:p-10">
          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Fazaa Initiative for Family Year 2026
            </h1>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed">
                In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of Emirati families:
                <br />
                <span className="font-semibold">An initiative dedicated to Emirati families</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-8 border border-gray-200 rounded">
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800">Registration Instructions</span>
              <svg 
                className={`w-5 h-5 transform transition-transform ${showInstructions ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showInstructions && (
              <div className="p-4 border-t border-gray-200 text-sm text-gray-600 leading-loose">
                Please ensure that the entered data is correct and matches your Emirates ID to ensure fast processing of the application.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name: (Please write name as in ID)
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
                  Mobile Number: (Registered in ID system)
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
                  Email Address
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
                  Emirate
                </label>
                <select
                  name="emirate"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 outline-none"
                >
                  <option value="">Select Emirate</option>
                  <option value="AZ">Abu Dhabi</option>
                  <option value="DU">Dubai</option>
                  <option value="SH">Sharjah</option>
                  <option value="AJ">Ajman</option>
                  <option value="UM">Umm Al Quwain</option>
                  <option value="RK">Ras Al Khaimah</option>
                  <option value="FU">Fujairah</option>
                </select>
              </div>
            </div>

            {/* Membership Tiers */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-center text-gray-800 mb-8">Granted Membership Tiers:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Platinum */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-700 mb-3 h-10 flex items-center">
                    For large families (4 children or more) and families caring for people of determination
                  </p>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-full max-w-[200px] mb-4 shadow-md rounded-lg" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Platinum</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('platinum')}
                      className={`px-4 py-1 text-xs border rounded transition-colors ${
                        formData.membershipTier === 'platinum' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {/* Gold */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-700 mb-3 h-10 flex items-center">
                    Gold: For small families (1-3 children).
                  </p>
                  <img src={cardGold} alt="Gold Card" className="w-full max-w-[200px] mb-4 shadow-md rounded-lg" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Gold</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('gold')}
                      className={`px-4 py-1 text-xs border rounded transition-colors ${
                        formData.membershipTier === 'gold' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {/* Silver */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-bold text-gray-700 mb-3 h-10 flex items-center">
                    For new Emirati families (newlyweds)
                  </p>
                  <img src={cardSilver} alt="Silver Card" className="w-full max-w-[200px] mb-4 shadow-md rounded-lg" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Silver</span>
                    <button
                      type="button"
                      onClick={() => handleMembershipChange('silver')}
                      className={`px-4 py-1 text-xs border rounded transition-colors ${
                        formData.membershipTier === 'silver' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-600 border-gray-300'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-10 bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Benefits:</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Launching a package of exclusive offers and benefits including: housing, education, health, insurance, basic supplies, transportation, and entertainment at subsidized prices below cost.
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
                  I acknowledge that the submitted data is correct and I agree to the terms and conditions
                </span>
              </label>

              {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold py-3 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
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
