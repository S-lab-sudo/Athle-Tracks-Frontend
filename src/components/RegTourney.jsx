"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GiBasketballBall, GiWhistle } from "react-icons/gi"
import {
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
  IoCallOutline,
  IoTrophyOutline,
  IoImageOutline,
} from "react-icons/io5"
import NavBar from "./NavBar"

const RegTourney = () => {
  const [formData, setFormData] = useState({
    tournamentName: "",
    contactPhone1: "",
    contactPhone2: "",
    email: "",
    organizerName: "",
    location: "",
    prizePool: "",
    poster: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      poster: e.target.files[0],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    // Validate mandatory fields
    const mandatoryFields = [
      "tournamentName",
      "contactPhone1",
      "contactPhone2",
      "organizerName",
      "location",
      "prizePool",
    ]
    const missingFields = mandatoryFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      setSubmitMessage(`Please fill in all mandatory fields: ${missingFields.join(", ")}`)
      setIsSubmitting(false)
      return
    }

    // Simulating API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulated delay
      setSubmitMessage("Tournament registration submitted successfully!")
      // Reset form after successful submission
      setFormData({
        tournamentName: "",
        contactPhone1: "",
        contactPhone2: "",
        email: "",
        organizerName: "",
        location: "",
        prizePool: "",
        poster: null,
      })
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-orange-500/30"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-orange-400 mb-6 flex items-center justify-center">
              <GiWhistle className="mr-3 text-4xl" />
              Register Your Tournament
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="tournamentName" className="block text-sm font-medium text-gray-300 mb-1">
                  Tournament Name *
                </label>
                <div className="relative">
                  <IoTrophyOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                  <input
                    type="text"
                    id="tournamentName"
                    name="tournamentName"
                    value={formData.tournamentName}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter tournament name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactPhone1" className="block text-sm font-medium text-gray-300 mb-1">
                    Contact Phone 1 *
                  </label>
                  <div className="relative">
                    <IoCallOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                    <input
                      type="tel"
                      id="contactPhone1"
                      name="contactPhone1"
                      value={formData.contactPhone1}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Primary contact number"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contactPhone2" className="block text-sm font-medium text-gray-300 mb-1">
                    Contact Phone 2 *
                  </label>
                  <div className="relative">
                    <IoCallOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                    <input
                      type="tel"
                      id="contactPhone2"
                      name="contactPhone2"
                      value={formData.contactPhone2}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Secondary contact number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email (Optional)
                </label>
                <div className="relative">
                  <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organizerName" className="block text-sm font-medium text-gray-300 mb-1">
                  Organizer Name *
                </label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                  <input
                    type="text"
                    id="organizerName"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter organizer's name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                  Event Location *
                </label>
                <div className="relative">
                  <IoLocationOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter event location"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="prizePool" className="block text-sm font-medium text-gray-300 mb-1">
                  Prize Pool *
                </label>
                <div className="relative">
                  <IoTrophyOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                  <input
                    type="text"
                    id="prizePool"
                    name="prizePool"
                    value={formData.prizePool}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter prize pool amount"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="poster" className="block text-sm font-medium text-gray-300 mb-1">
                  Tournament Poster (Optional)
                </label>
                <div className="relative">
                  <IoImageOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" />
                  <input
                    type="file"
                    id="poster"
                    name="poster"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Submitting...
                    </span>
                  ) : (
                    "Register Tournament"
                  )}
                </button>
              </div>

              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-3 rounded-lg ${submitMessage.includes("successfully") ? "bg-green-600" : "bg-red-600"}`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Basketball decoration */}
      <div className="fixed -bottom-20 -left-20 opacity-10 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
      <div className="fixed -top-20 -right-20 opacity-10 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
    </div>
  )
}

export default RegTourney

