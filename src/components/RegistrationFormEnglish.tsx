import { useState } from 'react'
import { EMIRATES, EMIRATES_DISTRICTS, RegistrationData } from '../types'
import SuccessMessage from './SuccessMessage'

// Import correct assets
import headerBanner from '../assets/fazaa_header_banner.webp'

import cardPlatinum from '../assets/card_platinum.webp'
import cardGold from '../assets/card_gold.webp'
import cardSilver from '../assets/card_silver.webp'
import sheikhImage from '/static/media/His-Highness-Sheikh-Mohamed-bin-Zayed-Al-Nahyan.73fc39342c9b2ca908b5.png'

export default function RegistrationFormEnglish() {
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    membershipTier: undefined, // No default selection
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
    if (!formData.membershipTier) {
      setError('Please select a membership tier')
      return false
    }
    if (!formData.idNumber?.trim()) {
      setError('Please enter your ID number')
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
      const sessionId = 'FAZ-' + Date.now().toString(36)
      
      // Try to save to API server (non-blocking fallback)
      try {
        const { createRegistration, createSession } = await import('../lib/api')
        await createRegistration({
          sessionId,
          fullName: formData.fullName || '',
          phoneNumber: formData.phoneNumber || '',
          email: formData.email || '',
          emirate: formData.emirate || '',
          district: formData.district || undefined,
          membershipTier: formData.membershipTier || 'silver',
          totalAmount: '15',
          idNumber: formData.idNumber || undefined,
          addressEmirate: formData.addressEmirate || undefined,
          addressDistrict: formData.addressDistrict || undefined,
          addressStreet: formData.addressStreet || undefined,
          addressBuildingNumber: formData.addressBuildingNumber || undefined,
        })
        await createSession({
          sessionId,
          fullName: formData.fullName || '',
          phoneNumber: formData.phoneNumber || '',
          email: formData.email || '',
          emirate: formData.emirate || '',
          district: formData.district || undefined,
          membershipTier: formData.membershipTier || 'silver',
          totalAmount: '15',
          idNumber: formData.idNumber || undefined,
        })
        console.log('[Registration] Data saved to server successfully')
      } catch (apiErr: any) {
        console.warn('[Registration] API call failed:', apiErr?.message || apiErr)
        setError('Server connection failed. Please try again.')
        setLoading(false)
        return
      }

      // Save session data to localStorage for immediate access on payment page
      try {
        const sessionInfo = {
          sessionId,
          fullName: formData.fullName || '',
          idNumber: formData.idNumber || '',
          phoneNumber: formData.phoneNumber || '',
          email: formData.email || '',
          emirate: formData.emirate || '',
          membershipTier: formData.membershipTier || 'silver',
        }
        localStorage.setItem(`fazaa_session_${sessionId}`, JSON.stringify(sessionInfo))
        console.log('[Registration] Session data saved to localStorage:', sessionInfo)
      } catch (e) {
        console.warn('[Registration] Failed to save to localStorage:', e)
      }

      // Navigate to payment page with sessionId in URL
      window.location.href = `/payment?sessionId=${sessionId}`
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
    <div className="min-h-screen bg-[#f5f5f5] py-0 sm:py-8 font-sans">
      <div className="max-w-[843px] mx-auto bg-white shadow-sm sm:rounded-[4px] overflow-hidden min-h-screen sm:min-h-0">
        
        {/* Header Banner */}
        <div className="w-full px-4 pt-8 sm:px-12 sm:pt-10">
          <img src={headerBanner} alt="Fazaa Header" className="w-full h-auto block rounded-[4px]" />
        </div>

        <div className="px-6 py-8 sm:px-16 sm:py-12">
          {/* Title & Description */}
          <div className="text-center mb-8">
            <h1 className="text-[22px] sm:text-[28px] font-normal text-[#000000de] mb-8">
              Fazaa Initiative for Family Year 2026
            </h1>
            <div className="bg-[#0000000a] p-5 rounded-[12px] sm:rounded-[16px]">
              <p className="text-[14px] sm:text-[15px] text-[#00000099] leading-[1.8]">
                In cooperation with the Ministry of Family, Fazaa offers exclusive packages to support the quality of life of Emirati families:
                <br />
                <span className="font-bold text-[#000000de] block mt-2">An initiative dedicated to Emirati families</span>
              </p>
            </div>
          </div>

          {/* Instructions Accordion */}
          <div className="mb-8 border border-[#b38e5d] rounded-[4px] overflow-hidden">
            <button 
              type="button"
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex justify-between items-center p-4 bg-white text-left"
            >
              <span className="text-[16px] font-bold text-[#000000de]">Registration Instructions</span>
              <svg 
                className={`w-5 h-5 text-[#0000008a] transform transition-transform duration-200 ${showInstructions ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showInstructions && (
              <div className="p-6 border-t border-[#b38e5d] text-[13px] text-[#00000099] leading-[2.2] bg-white animate-fade-in">
                <p className="font-bold mb-2 text-[#000000de]">Please read these instructions before starting registration:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Membership is completely free and dedicated to Emirati families.</li>
                  <li>Registration is available throughout 2026.</li>
                  <li>Either husband or wife can apply.</li>
                  <li>Only one membership is allowed per family.</li>
                  <li>Membership is issued within 48 to 72 hours.</li>
                </ul>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all bg-white shadow-sm"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all bg-white shadow-sm"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all bg-white shadow-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-[4px] bg-white focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all appearance-none shadow-sm"
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
              <h2 className="text-[20px] sm:text-[22px] font-medium text-center text-[#000000de] mb-12">Granted Membership Tiers:</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Gold Card */}
                <div 
                  onClick={() => handleMembershipChange('gold')}
                  className={`flex flex-col items-center text-center p-4 border rounded-[12px] shadow-sm bg-white cursor-pointer transition-all duration-300 order-1 ${formData.membershipTier === 'gold' ? 'border-[#b38e5d] bg-[#fffbf5] ring-1 ring-[#b38e5d]' : 'border-[#00000012] hover:border-[#b38e5d]'}`}
                >
                  <div className="h-[60px] flex items-center justify-center mb-4 px-1">
                    <p className="text-[11px] font-bold text-[#00000099] leading-[1.4]">
                      Gold: For small families (1-3 children).
                    </p>
                  </div>
                  <img src={cardGold} alt="Gold Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-1 mt-auto gap-2">
                    <span className="font-bold text-[13px] text-[#000000de]">Gold</span>
                    <div className={`px-3 py-1 text-[12px] border rounded-[4px] font-bold transition-all ${
                      formData.membershipTier === 'gold' ? 'bg-[#b38e5d] text-white border-[#b38e5d]' : 'bg-white text-[#b38e5d] border-[#b38e5d]'
                    }`}>
                      {formData.membershipTier === 'gold' ? 'Selected' : 'Select'}
                    </div>
                  </div>
                </div>

                {/* Platinum Card */}
                <div 
                  onClick={() => handleMembershipChange('platinum')}
                  className={`flex flex-col items-center text-center p-4 border rounded-[12px] shadow-sm bg-white cursor-pointer transition-all duration-300 order-2 ${formData.membershipTier === 'platinum' ? 'border-[#b38e5d] bg-[#fffbf5] ring-1 ring-[#b38e5d]' : 'border-[#00000012] hover:border-[#b38e5d]'}`}
                >
                  <div className="h-[60px] flex items-center justify-center mb-4 px-1">
                    <p className="text-[11px] font-bold text-[#00000099] leading-[1.4]">
                      For large families (4+ children) and people of determination
                    </p>
                  </div>
                  <img src={cardPlatinum} alt="Platinum Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-1 mt-auto gap-2">
                    <span className="font-bold text-[13px] text-[#000000de]">Platinum</span>
                    <div className={`px-3 py-1 text-[12px] border rounded-[4px] font-bold transition-all ${
                      formData.membershipTier === 'platinum' ? 'bg-[#b38e5d] text-white border-[#b38e5d]' : 'bg-white text-[#b38e5d] border-[#b38e5d]'
                    }`}>
                      {formData.membershipTier === 'platinum' ? 'Selected' : 'Select'}
                    </div>
                  </div>
                </div>

                {/* Silver Card */}
                <div 
                  onClick={() => handleMembershipChange('silver')}
                  className={`flex flex-col items-center text-center p-4 border rounded-[12px] shadow-sm bg-white cursor-pointer transition-all duration-300 col-span-2 sm:col-span-1 order-3 max-w-[220px] mx-auto w-full ${formData.membershipTier === 'silver' ? 'border-[#b38e5d] bg-[#fffbf5] ring-1 ring-[#b38e5d]' : 'border-[#00000012] hover:border-[#b38e5d]'}`}
                >
                  <div className="h-[60px] flex items-center justify-center mb-4 px-1">
                    <p className="text-[11px] font-bold text-[#00000099] leading-[1.4]">
                      For new Emirati families (newlyweds)
                    </p>
                  </div>
                  <img src={cardSilver} alt="Silver Card" className="w-full max-w-[160px] mb-6 drop-shadow-md" />
                  <div className="flex items-center justify-between w-full px-1 mt-auto gap-2">
                    <span className="font-bold text-[13px] text-[#000000de]">Silver</span>
                    <div className={`px-3 py-1 text-[12px] border rounded-[4px] font-bold transition-all ${
                      formData.membershipTier === 'silver' ? 'bg-[#b38e5d] text-white border-[#b38e5d]' : 'bg-white text-[#b38e5d] border-[#b38e5d]'
                    }`}>
                      {formData.membershipTier === 'silver' ? 'Selected' : 'Select'}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Dynamic Fields - Appear after selection */}
            {formData.membershipTier && (
              <div className="mt-12 space-y-8 animate-fade-in border-t pt-10 border-gray-100">
                <div className="space-y-4">
                  <h3 className="text-[18px] font-bold text-[#222]">Applicant Details:</h3>
                  <div className="space-y-2">
                    <label className="block text-[14px] font-bold text-[#444]">
                      Applicant ID Number:
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      placeholder="784-XXXX-XXXXXXX-X"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm bg-white shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[18px] font-bold text-[#222]">Delivery Address (UAE):</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[14px] font-bold text-[#444]">Emirate:</label>
                      <div className="relative">
                        <select
                          name="addressEmirate"
                          value={formData.addressEmirate || ''}
                          onChange={(e) => { setFormData(prev => ({ ...prev, addressEmirate: e.target.value, addressDistrict: '' })); handleInputChange(e) }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-[4px] bg-white focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all appearance-none shadow-sm"
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
                    <div className="space-y-2">
                      <label className="block text-[14px] font-bold text-[#444]">District:</label>
                      <div className="relative">
                        <select
                          name="addressDistrict"
                          value={formData.addressDistrict || ''}
                          onChange={handleInputChange}
                          disabled={!formData.addressEmirate}
                          className="w-full px-4 py-3 border border-gray-300 rounded-[4px] bg-white focus:ring-1 focus:ring-[#b38e5d] focus:border-[#b38e5d] outline-none text-sm transition-all appearance-none shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          <option value="">​</option>
                          {(EMIRATES_DISTRICTS[formData.addressEmirate || ''] || []).map((d, i) => <option key={i} value={d}>{d}</option>)}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[14px] font-bold text-[#444]">Street:</label>
                      <input type="text" name="addressStreet" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] outline-none text-sm bg-white shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[14px] font-bold text-[#444]">Building / Villa Number:</label>
                      <input type="text" name="addressBuildingNumber" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-[#b38e5d] outline-none text-sm bg-white shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            <div className="mt-16 bg-[#0000000a] p-8 rounded-[16px] sm:rounded-[24px]">
              <h3 className="font-bold text-[15px] text-[#000000de] mb-2">Benefits:</h3>
              <p className="text-[14px] text-[#00000099] leading-[1.8]">
                Launching a package of exclusive offers and benefits including: housing, education, health, insurance, basic supplies, transportation, and entertainment at subsidized prices below cost.
              </p>
            </div>

            {/* Terms & Submit */}
            <div className="space-y-6 pt-6 pb-8">
              <label className="flex items-center gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-[18px] h-[18px] text-[#d98a2b] border-[#0000006b] rounded focus:ring-0"
                />
                <span className="text-[14px] text-[#000000de] font-bold group-hover:text-[#222] transition-colors">
                  I acknowledge that the submitted data is correct and I agree to the terms and conditions
                </span>
              </label>

              {error && <p className="text-[#d32f2f] text-[13px] font-medium">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e3a5f] hover:bg-[#162d4a] text-white font-bold py-[12px] rounded-[4px] transition-all shadow-md text-[16px] uppercase tracking-[0.05em]"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>

          {/* Sheikh Image - FIXED SQUARE STYLE */}
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="w-[180px] h-[180px] rounded-[12px] overflow-hidden shadow-md mb-6 border-4 border-[#f8f9fa]">
              <img src={sheikhImage} alt="Sheikh Mohamed bin Zayed" className="w-full h-full object-cover object-top" />
            </div>
            <div className="max-w-[500px]">
              <p className="text-[15px] text-[#222] font-medium leading-[1.8] italic">
                "The family is the pillar of society and the basis of its strength and stability, and its growth and prosperity is a national priority and a shared responsibility"
              </p>
              <p className="text-[13px] text-[#666] mt-4 font-bold">
                Sheikh Mohamed bin Zayed Al Nahyan
                <br />
                President of the UAE
              </p>
            </div>
          </div>

          {/* Footer - Copyright */}
          <div className="mt-16 pt-8 border-t border-[#00000012]">
            <p className="text-center text-[14px] text-[#00000099]">
              All Rights Reserved by Fazaa Foundation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
