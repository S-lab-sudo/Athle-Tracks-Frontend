import React, { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaImage, FaPhone, FaArrowRight } from "react-icons/fa";

const TeamDetail = ({ teamDetails, handleTeamDetailsChange, previewUrls, validateStep, handleCreateTeam, isLoading }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!teamDetails.name || teamDetails.name.length < 3) {
      newErrors.name = "Team name must be at least 3 characters long";
    }

    if (!teamDetails.origin) {
      newErrors.origin = "Origin/Location is required";
    }

    if (!teamDetails.primaryNumber || teamDetails.primaryNumber.length !== 10) {
      newErrors.primaryNumber = "Valid contact number is required";
    }

    if (!teamDetails.logo) {
      newErrors.logo = "Team logo is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleCreateTeam();
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      handleTeamDetailsChange(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <FaUser className="text-orange-500 mr-2" />
        <h3 className="text-xl font-bold">Team Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Team Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-500" />
            </div>
            <input
              type="text"
              name="name"
              minLength={3}
              value={teamDetails.name}
              onChange={handleTeamDetailsChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter team name"
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Origin/Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-500" />
            </div>
            <input
              type="text"
              name="origin"
              value={teamDetails.origin}
              onChange={handleTeamDetailsChange}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.origin ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter team origin"
              required
            />
            {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Team Contact Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-500" />
            </div>
            <input
              type="text"
              name="primaryNumber"
              value={teamDetails.primaryNumber}
              onChange={handlePhoneNumberChange}
              maxLength={10}
              className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.primaryNumber ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter team contact number"
              required
            />
            {errors.primaryNumber && <p className="text-red-500 text-xs mt-1">{errors.primaryNumber}</p>}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-300 text-sm font-medium">
          Team Logo <span className="text-red-500">*</span>
        </label>
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className="text-gray-500" />
              </div>
              <input
                type="file"
                name="logo"
                onChange={handleTeamDetailsChange}
                className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${errors.logo ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200`}
                accept="image/*"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Upload a square image (JPG, PNG) for best results. Max size: 2MB
            </p>
            {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
          </div>

          {previewUrls.teamLogo && (
            <div className="w-24 h-24 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
              <img
                src={previewUrls.teamLogo || "/placeholder.svg"}
                alt="Team Logo Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={handleSubmit}
          disabled={!validateStep(1) || isLoading}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
            validateStep(1) && !isLoading
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

export default TeamDetail;