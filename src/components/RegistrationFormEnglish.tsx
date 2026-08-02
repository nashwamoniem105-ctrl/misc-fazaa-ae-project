import { useState } from 'react'
import { EMIRATES, MEMBERSHIP_TIERS, EMIRATES_DISTRICTS, RegistrationData } from '../types'
import SuccessMessage from './SuccessMessage'

export default function RegistrationFormEnglish() {
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    membershipTier: 'gold',
  })
  const [showAddressFields, setShowAddressFields] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleMembershipChange = (tier: 'platinum' | 'gold' | 'silver') => {
    setFormData(prev => ({ ...prev, membershipTier: tier }))
    setShowAddressFields(true)
  }

  const validateForm = (): boolean => {
    if (!formData.fullName?.trim()) {
      setError('Please enter your full name')
      return false
    }
    if (!formData.phoneNumber?.trim()) {
      setError('Please enter your phone number')
      return false
    }
    if (!formData.email?.trim()) {
      setError('Please enter your email address')
      return false
    }
    if (!formData.emirate) {
      setError('Please select your emirate')
      return false
    }
    if (showAddressFields) {
      if (!formData.idNumber?.trim()) {
        setError('Please enter your ID number')
        return false
      }
      if (!formData.addressEmirate) {
        setError('Please select the emirate for delivery')
        return false
      }
      if (!formData.addressCity?.trim()) {
        setError('Please enter the city/area')
        return false
      }
      if (!formData.addressDistrict?.trim()) {
        setError('Please enter the district')
        return false
      }
      if (!formData.addressStreet?.trim()) {
        setError('Please enter the street name')
        return false
      }
      if (!formData.addressBuildingNumber?.trim()) {
        setError('Please enter the building/villa number')
        return false
      }
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
      // Simulate sending data
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Data submitted:', formData)
      setSubmitted(true)
      setFormData({ membershipTier: 'gold' })
      setShowAddressFields(false)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('An error occurred while submitting the form')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return <SuccessMessage language="en" />
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-dark-900 mb-4">
            Fazaa Initiative
          </h1>
          <p className="text-lg text-dark-600 mb-2">
            Family Year 2026
          </p>
          <p className="text-sm text-dark-500">
            In collaboration with the Ministry of Family
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 animate-slide-in-left">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-gold-600 mb-6 pb-4 border-b-2 border-gold-200">
                Basic Information
              </h2>

              {/* Full Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your full name as shown in your ID"
                  className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleInputChange}
                  placeholder="05XXXXXXXX"
                  className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              {/* Emirate */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-dark-700 mb-2">
                  Emirate *
                </label>
                <select
                  name="emirate"
                  value={formData.emirate || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                >
                  <option value="">Select your emirate</option>
                  {EMIRATES.map(emirate => (
                    <option key={emirate.code} value={emirate.code}>
                      {emirate.nameEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Membership Tier Section */}
            <div>
              <h2 className="text-2xl font-bold text-gold-600 mb-6 pb-4 border-b-2 border-gold-200">
                Membership Tiers
              </h2>
              <p className="text-dark-600 mb-6">Select your membership tier *</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['platinum', 'gold', 'silver'] as const).map(tier => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => handleMembershipChange(tier)}
                    className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      formData.membershipTier === tier
                        ? 'border-gold-500 bg-gold-50 shadow-lg'
                        : 'border-gold-200 bg-white hover:border-gold-400'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-3xl mb-2 ${
                        tier === 'platinum' ? '👑' : tier === 'gold' ? '🏆' : '💎'
                      }`} />
                      <h3 className="font-bold text-dark-900 mb-2">
                        {MEMBERSHIP_TIERS[tier].en.split(' - ')[0]}
                      </h3>
                      <p className="text-xs text-dark-600">
                        {MEMBERSHIP_TIERS[tier].description_en}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Section - Conditional */}
            {showAddressFields && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gold-600 mb-6 pb-4 border-b-2 border-gold-200">
                  ID & Delivery Address
                </h2>

                {/* ID Number */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    ID Number *
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your ID number"
                    className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <h3 className="text-lg font-bold text-dark-800 mb-4 mt-8">Card Delivery Address</h3>

                {/* Address Emirate */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    Emirate *
                  </label>
                  <select
                    name="addressEmirate"
                    value={formData.addressEmirate || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option value="">Select emirate</option>
                    {EMIRATES.map(emirate => (
                      <option key={emirate.code} value={emirate.code}>
                        {emirate.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City/District */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    City/Area *
                  </label>
                  <select
                    name="addressCity"
                    value={formData.addressCity || ''}
                    onChange={handleInputChange}
                    disabled={!formData.addressEmirate}
                    className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-100"
                  >
                    <option value="">Select city</option>
                    {formData.addressEmirate && EMIRATES_DISTRICTS[formData.addressEmirate]?.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    name="addressDistrict"
                    value={formData.addressDistrict || ''}
                    onChange={handleInputChange}
                    placeholder="Enter district name"
                    className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Street */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    Street Name *
                  </label>
                  <input
                    type="text"
                    name="addressStreet"
                    value={formData.addressStreet || ''}
                    onChange={handleInputChange}
                    placeholder="Enter street name"
                    className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Building Number */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    Building/Villa Number *
                  </label>
                  <input
                    type="text"
                    name="addressBuildingNumber"
                    value={formData.addressBuildingNumber || ''}
                    onChange={handleInputChange}
                    placeholder="Enter building or villa number"
                    className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                {/* Apartment Number */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 mb-2">
                    Apartment Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressApartmentNumber"
                    value={formData.addressApartmentNumber || ''}
                    onChange={handleInputChange}
                    placeholder="Enter apartment number (if applicable)"
                    className="w-full px-4 py-3 border-2 border-gold-200 rounded-lg focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>

            {/* Terms */}
            <p className="text-xs text-dark-500 text-center">
              By submitting this form, you agree to our Terms and Conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
