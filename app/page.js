"use client"
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [step, setStep] = useState(1) // 1: email, 2: pin
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [savedEmail, setSavedEmail] = useState('')

  useEffect(() => {
    // Check if email exists in local storage
    const storedEmail = localStorage.getItem('secuMateEmail')
    if (storedEmail) {
      setSavedEmail(storedEmail)
      setEmail(storedEmail)
      setStep(2)
    }
  }, [])

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email')
      return
    }
    setError('')
    // Save email to local storage
    localStorage.setItem('secuMateEmail', email)
    setSavedEmail(email)
    setStep(2)
  }

  const handlePinChange = (index, value) => {
    if (value.length > 1) return // Only allow single digit
    
    const newPin = [...pin]
    newPin[index] = value
    setPin(newPin)
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
    
    // Check if all digits are entered
    if (index === 3 && value) {
      const fullPin = [...newPin.slice(0, 3), value].join('')
      if (fullPin.length === 4) {
        handlePinSubmit(fullPin)
      }
    }
  }

  const handlePinKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePinSubmit = (fullPin) => {
    // Here you would typically validate the PIN
    console.log('PIN submitted:', fullPin)
    console.log('Email:', email)
    alert(`Logged in with ${email} and PIN: ${fullPin}`)
  }

  const handleBackToEmail = () => {
    setStep(1)
    setPin(['', '', '', ''])
    setError('')
  }

  const handleForgotPassword = () => {
    alert('Password reset link will be sent to your email')
  }

  const handleRegister = () => {
    alert('Redirecting to registration page')
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      <div className="flex h-full w-full flex-col lg:flex-row">
        {/* Left Side - Form Section */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md py-8">
              {/* Logo and Welcome */}
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900">SecuMate</h1>
                <p className="text-gray-600 mt-2">Secure Authentication for Your Digital Life</p>
              </div>

              {/* Form Container */}
              <div className="bg-white rounded-xl">
                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Step 1: Email Input */}
                {step === 1 && (
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        autoFocus
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Next
                    </button>
                  </form>
                )}

                {/* Step 2: PIN Input */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center lg:text-left">
                      <p className="text-gray-600 mb-1">Welcome back,</p>
                      <p className="text-lg font-semibold text-gray-800 break-all">{email}</p>
                      <button
                        onClick={handleBackToEmail}
                        className="text-sm text-indigo-600 hover:text-indigo-800 mt-1"
                      >
                        Not you? Change email
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 text-center lg:text-left">
                        Enter 4-digit PIN
                      </label>
                      <div className="flex justify-center lg:justify-start gap-3">
                        {pin.map((digit, index) => (
                          <input
                            key={index}
                            id={`pin-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handlePinChange(index, e.target.value)}
                            onKeyDown={(e) => handlePinKeyDown(index, e)}
                            className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 text-center lg:text-left">
                      Enter your 4-digit PIN to continue
                    </p>
                  </div>
                )}

                {/* Action Buttons - Desktop */}
                <div className="hidden lg:flex mt-8 items-center justify-between">
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Forgot Password?
                  </button>
                  <button
                    onClick={handleRegister}
                    className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                  >
                    Register Now
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-center text-gray-500">
                    Protected by end-to-end encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content Section */}
        <div className="hidden lg:block lg:w-1/2 h-full overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700">
          <div className="h-full overflow-y-auto p-8 xl:p-12">
            <div className="min-h-full flex flex-col justify-center text-white">
              {/* Main Quote */}
              <div className="mb-8 xl:mb-12">
                <h2 className="text-3xl xl:text-4xl font-bold mb-4 xl:mb-6">Secure Your Digital World</h2>
                <p className="text-lg xl:text-xl text-indigo-100 leading-relaxed">
                  "Your security is our top priority. Experience peace of mind with SecuMate's advanced authentication system."
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6 xl:space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 xl:w-8 xl:h-8 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg xl:text-xl font-semibold mb-1 xl:mb-2">Bank-Level Security</h3>
                    <p className="text-sm xl:text-base text-indigo-100">Your data is protected with enterprise-grade encryption</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 xl:w-8 xl:h-8 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg xl:text-xl font-semibold mb-1 xl:mb-2">Multi-Factor Authentication</h3>
                    <p className="text-sm xl:text-base text-indigo-100">Secure your account with multiple layers of protection</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 xl:w-8 xl:h-8 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg xl:text-xl font-semibold mb-1 xl:mb-2">Lightning Fast</h3>
                    <p className="text-sm xl:text-base text-indigo-100">Quick and seamless authentication without compromising security</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 xl:mt-12 pt-6 xl:pt-8 border-t border-indigo-500">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl xl:text-3xl font-bold">10K+</div>
                    <div className="text-xs xl:text-sm text-indigo-200">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl xl:text-3xl font-bold">99.9%</div>
                    <div className="text-xs xl:text-sm text-indigo-200">Uptime</div>
                  </div>
                  <div>
                    <div className="text-2xl xl:text-3xl font-bold">24/7</div>
                    <div className="text-xs xl:text-sm text-indigo-200">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar - Only visible on mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <button
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 font-medium"
            >
              Forgot Password?
            </button>
            <button
              onClick={handleRegister}
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page