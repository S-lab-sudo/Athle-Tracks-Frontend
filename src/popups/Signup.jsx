"use client"
import ToastProvider from "./ToastProvider"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import NavBar from "../components/NavBar"
import { GiBasketballBall, GiWhistle } from "react-icons/gi"
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa"
import { IoMdAlert } from "react-icons/io"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const navigate = useNavigate()

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "" }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    let text = ""
    if (strength === 1) text = "Weak"
    else if (strength === 2) text = "Fair"
    else if (strength === 3) text = "Good"
    else if (strength === 4) text = "Strong"

    return { strength, text }
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Prepare the data for the API call
    const signupData = {
      name: username,
      email,
      phoneNumber: phone,
      password,
    }

    console.log(signupData)

    axios
      .post("/api/users/signup", signupData)
      .then((res) => {
        console.log(res)
        if (res.status === 201) {
          setIsLoading(false)
          setSignupSuccess(true)
          // Redirect after showing success message
          setTimeout(() => {
            navigate("/login")
          }, 2000)
          toast.success("Account created successfully!")
        }
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.message || "Invalid input data")
          } else if (err.response.status === 500) {
            setError("An internal server error occurred. Please try again later.")
          }
        } else {
          console.error("Signup error:", err)
          setError("An error occurred during signup. Please try again.")
        }
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <NavBar />
      <ToastProvider></ToastProvider>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Branding */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-600/90 to-orange-800/90 p-8 md:p-12 flex flex-col justify-center items-center text-white">
              <div className="mb-8 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <GiBasketballBall className="text-white text-4xl" />
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-center">AthleTrack</h2>

              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-3">Join the Basketball Community</p>
                <p className="text-white/80">
                  Create an account to access live scores, player statistics, and tournament updates.
                </p>
              </div>

              <div className="space-y-6 w-full max-w-xs">
                <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
                  <GiWhistle className="text-orange-300 text-xl" />
                  <span>Track live tournament scores</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
                  <FaCheckCircle className="text-orange-300 text-xl" />
                  <span>Access detailed player statistics</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg">
                  <FaCheckCircle className="text-orange-300 text-xl" />
                  <span>Register for upcoming tournaments</span>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="max-w-md mx-auto">
                {signupSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Account Created Successfully!</h2>
                    <p className="text-gray-400 mb-6">Your account has been created. Redirecting you to login...</p>
                    <div className="animate-pulse">
                      <div className="h-1 w-24 bg-green-500 mx-auto rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
                      <p className="text-gray-400">Create your account to get started</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                      {/* Username Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Username</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            placeholder="Enter your username"
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Email</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-500" />
                          </div>
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            placeholder="Enter your phone number"
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            maxLength="10"
                            minLength={10}
                            required
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-500" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <FaEyeSlash className="text-gray-400 hover:text-gray-300" />
                            ) : (
                              <FaEye className="text-gray-400 hover:text-gray-300" />
                            )}
                          </div>
                        </div>

                        {/* Password Strength Indicator */}
                        {password && (
                          <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex space-x-1">
                                {[...Array(4)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-1 w-6 rounded-full ${
                                      i < passwordStrength.strength
                                        ? i === 0
                                          ? "bg-red-500"
                                          : i === 1
                                            ? "bg-yellow-500"
                                            : i === 2
                                              ? "bg-green-500"
                                              : "bg-green-400"
                                        : "bg-gray-600"
                                    }`}
                                  ></div>
                                ))}
                              </div>
                              <span
                                className={`text-xs ${
                                  passwordStrength.strength === 1
                                    ? "text-red-400"
                                    : passwordStrength.strength === 2
                                      ? "text-yellow-400"
                                      : passwordStrength.strength >= 3
                                        ? "text-green-400"
                                        : "text-gray-400"
                                }`}
                              >
                                {passwordStrength.text}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Confirm Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLock className="text-gray-500" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className={`w-full pl-10 pr-12 py-3 bg-gray-700 border ${
                              confirmPassword && password !== confirmPassword
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-600 focus:ring-orange-500"
                            } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <FaEyeSlash className="text-gray-400 hover:text-gray-300" />
                            ) : (
                              <FaEye className="text-gray-400 hover:text-gray-300" />
                            )}
                          </div>
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                          <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                        )}
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg flex items-start">
                          <IoMdAlert className="text-red-400 mr-2 text-lg flex-shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </div>
                      )}

                      {/* Signup Button */}
                      <button
                        type="submit"
                        className={`w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center ${
                          isLoading ? "opacity-80 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>

                      {/* Login Link */}
                      <div className="text-center">
                        <p className="text-gray-400">
                          Already have an account?{" "}
                          <Link
                            to="/login"
                            className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basketball decoration */}
      <div className="fixed -bottom-20 -left-20 opacity-5 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
      <div className="fixed -top-20 -right-20 opacity-5 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
    </div>
  )
}

export default Signup

