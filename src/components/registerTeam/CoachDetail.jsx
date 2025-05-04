import React, { useState } from "react";
import { FaUser, FaPhone, FaImage, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";

const CoachDetail = ({ coachDetails, handleCoachDetailsChange, previewUrls, validateStep, assignCoachToTeam, isLoading, setStep }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!coachDetails.name || coachDetails.name.length < 7) {
      newErrors.name = "Coach name must be at least 6 characters long";
    }

    if (!coachDetails.phone_number || coachDetails.phone_number.length !== 10) {
      newErrors.phone_number = "Valid primary phone number is required";
    }

    if (!coachDetails.contact_number_2 || coachDetails.contact_number_2.length !== 10) {
      newErrors.contact_number_2 = "Valid secondary phone number is required";
    }

    if (!coachDetails.image) {
      newErrors.image = "Coach photo is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      assignCoachToTeam();
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      handleCoachDetailsChange(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <GiWhistle className="text-orange-500 mr-2" />
        <h3 className="text-xl font-bold">Coach Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Coach Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-500" />
            </div>
            <input
              type="text"
              name="name"
              value={coachDetails.name}
              onChange={handleCoachDetailsChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter coach name"
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Primary Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-500" />
            </div>
            <input
              type="text"
              name="phone_number"
              value={coachDetails.phone_number}
              onChange={handlePhoneNumberChange}
              maxLength={10}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.phone_number ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter primary phone number"
              required
            />
            {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Secondary Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-500" />
            </div>
            <input
              type="text"
              name="contact_number_2"
              value={coachDetails.contact_number_2}
              onChange={handlePhoneNumberChange}
              maxLength={10}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.contact_number_2 ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter secondary phone number"
              required
            />
            {errors.contact_number_2 && <p className="text-red-500 text-xs mt-1">{errors.contact_number_2}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Coach Photo <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaImage className="text-gray-500" />
                </div>
                <input
                  type="file"
                  name="image"
                  onChange={handleCoachDetailsChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.image ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                  accept="image/*"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Upload a clear portrait photo. Max size: 2MB
              </p>
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            </div>

            {previewUrls.coachImage && (
              <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                <img
                  src={previewUrls.coachImage || "/placeholder.svg"}
                  alt="Coach Photo Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-6 py-2 rounded-lg transition-colors flex items-center bg-gray-700 hover:bg-gray-600 text-white"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={!validateStep(2) || isLoading}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
            validateStep(2) && !isLoading
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
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
              Saving...
            </>
          ) : (
            <>
              Save & Continue <FaArrowRight className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CoachDetail;