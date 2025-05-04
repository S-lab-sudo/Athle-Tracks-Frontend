import { useNavigate } from "react-router-dom";
// import apiClient from "../../client"
import axios from "axios";
import multiPartClient from "../../multipartclient"
import { useState, useRef } from "react"
import { FaSave } from "react-icons/fa"
import {
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaRulerVertical,
  FaWeight,
  FaImage,
  FaIdCard,
  FaPlus,
  FaArrowLeft,
  FaFileUpload,
  FaCheckCircle,
} from "react-icons/fa"
import { GiBasketballJersey, GiBasketballBall } from "react-icons/gi"
import { IoMdAlert } from "react-icons/io"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PlayerDetail = ({ isStepSaved, setStep, teamId }) => {
  const [addedPlayers, setAddedPlayers] = useState([])
  const [playerName, setPlayerName] = useState("")
  const [playerContact, setPlayerContact] = useState("")
  const [playerAge, setPlayerAge] = useState("")
  const [playerJersey, setPlayerJersey] = useState("")
  const [playerHeight, setPlayerHeight] = useState("")
  const [playerWeight, setPlayerWeight] = useState("")
  const [playerImage, setPlayerImage] = useState(null)
  const [playerImagePreview, setPlayerImagePreview] = useState(null)
  const [document, setDocument] = useState(null)
  const [documentPreview, setDocumentPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const playerImageRef = useRef(null)
  const documentRef = useRef(null)

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files) {
      const file = files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        if (name === "image") {
          setPlayerImagePreview(reader.result)
        } else if (name === "document") {
          setDocumentPreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
      if (name === "image") {
        setPlayerImage(file)
      } else if (name === "document") {
        setDocument(file)
      }
    }
  }

  const validatePlayerForm = () => {
    if (!playerName) {
      setError("Player name is required")
      return false
    }
    if (!playerContact || playerContact.length !== 10) {
      setError("Valid contact number is required")
      return false
    }
    if (!playerAge || playerAge.length > 3) {
      setError("Valid age is required")
      return false
    }
    if (!playerJersey) {
      setError("Jersey number is required")
      return false
    }
    if (!playerHeight || playerHeight.length > 3) {
      setError("Valid height is required")
      return false
    }
    if (!playerWeight || playerWeight.length > 3) {
      setError("Valid weight is required")
      return false
    }
    if (!playerImage) {
      setError("Player photo is required")
      return false
    }
    if (!document) {
      setError("ID document is required")
      return false
    }
    setError("")
    return true
  }

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target
    if (/^\d*$/.test(value) && value.length <= 10) {
      if (name === "contact") setPlayerContact(value)
    }
  }

  const handleAgeHeightWeightChange = (e) => {
    const { name, value } = e.target
    if (/^\d*$/.test(value) && value.length <= 3) {
      if (name === "age") setPlayerAge(value)
      if (name === "height") setPlayerHeight(value)
      if (name === "weight") setPlayerWeight(value)
        if(name === "jersey") setPlayerJersey(value)
    }
  }

  const addSinglePlayerToTeam = () => {
    if (!validatePlayerForm()) return

    setIsSubmitting(true)
    const formData = new FormData()
    formData.append("name", playerName)
    formData.append("mobileNumber", playerContact)
    formData.append("currentTeam", teamId)
    formData.append("height", playerHeight)
    formData.append("weight", playerWeight)
    formData.append("age", playerAge)
    formData.append("jerseyNumber", playerJersey)
    formData.append("image", playerImage)
    formData.append("document", document)
    
    apiClient
      .post("/team/add-single-player-to-team", formData)
      .then((res) => {
        if (res.status === 201) {
          setAddedPlayers([...addedPlayers, res.data])
          setPlayerName("")
          setPlayerContact("")
          setPlayerAge("")
          setPlayerJersey("")
          setPlayerHeight("")
          setPlayerWeight("")
          setPlayerImage(null)
          setPlayerImagePreview(null)
          setDocument(null)
          setDocumentPreview(null)
          playerImageRef.current.value = null
          documentRef.current.value = null
          toast.success("Player added successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response?.data?.message || "Failed to add player. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const navigate = useNavigate();

  const handleClick = () => {
    if (addedPlayers.length >= 4) {
      addTeamToTournament();
      navigate("/upcoming"); 
    }
  };

  const addTeamToTournament = () => {
    multiPartClient
      .post("http://loclahost:8000/api/tournaments/assign-team-to-tournament", {
        tournamentId: window.location.href.split("/").pop(),
        teamId: teamId,
      })
      .then((res) => {
        toast.success("Team added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response?.data?.message || "Failed to add team. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  return (
    <div className="space-y-6 bg-gray-800 rounded-xl shadow-xl p-6 text-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Header with title */}
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-orange-600 flex items-center justify-center mr-3">
            <GiBasketballJersey className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Player Registration</h2>
            <p className="text-gray-400 text-sm">Add players to your team roster</p>
          </div>
        </div>
      </div>

      {/* Added Players List */}
      {addedPlayers.length > 0 && (
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 animate-fadeIn">
          <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center">
            <FaCheckCircle className="mr-2" /> Added Players ({addedPlayers.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {addedPlayers.map((player, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-3 flex items-center border border-gray-600 hover:border-orange-500/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3 overflow-hidden">
                  {player.image ? (
                    <img
                    src={`${player.image}`}
                      alt={player.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{player.name}</p>
                  <p className="text-xs text-gray-400">{player.mobileNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg flex items-start">
          <IoMdAlert className="text-red-400 mr-2 text-lg flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Player Form */}
      <div className="bg-gray-700/50 rounded-lg p-5 border border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <GiBasketballBall className="text-orange-500 mr-2 animate-pulse" />
            <h3 className="text-xl font-bold">New Player Details</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Player Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
              <input
                type="text"
                name="name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter player name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="text-gray-500" />
              </div>
              <input
                type="text"
                name="contact"
                value={playerContact}
                onChange={handlePhoneNumberChange}
                maxLength={10}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter contact number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Age <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-500" />
              </div>
              <input
                type="text"
                name="age"
                value={playerAge}
                onChange={handleAgeHeightWeightChange}
                maxLength={3}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter age"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Jersey Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-500" />
              </div>
              <input
                type="text"
                name="jersey"
                value={playerJersey}
                onChange={handleAgeHeightWeightChange}
                maxLength={3}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter jersery number"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Height <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaRulerVertical className="text-gray-500" />
              </div>
              <input
                type="text"
                name="height"
                value={playerHeight}
                onChange={handleAgeHeightWeightChange}
                maxLength={3}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter height (cm)"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Weight <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaWeight className="text-gray-500" />
              </div>
              <input
                type="text"
                name="weight"
                value={playerWeight}
                onChange={handleAgeHeightWeightChange}
                maxLength={3}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter weight (kg)"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Player Photo <span className="text-red-500">*</span>
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
                    ref={playerImageRef}
                    onChange={handleFileChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    accept="image/*"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Upload a clear portrait photo. Max size: 2MB</p>
              </div>

              {playerImagePreview ? (
                <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                  <img
                    src={playerImagePreview || "/placeholder.svg"}
                    alt="Player Photo Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center">
                  <FaUser className="text-gray-500 text-2xl" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              ID Document <span className="text-red-500">*</span>
            </label>
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaIdCard className="text-gray-500" />
                  </div>
                  <input
                    type="file"
                    name="document"
                    ref={documentRef}
                    onChange={handleFileChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Upload ID card or other identification document</p>
              </div>

              {documentPreview ? (
                <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden border border-gray-600 flex items-center justify-center">
                  <img src={documentPreview} alt="" />
                  <FaFileUpload className="text-orange-400 text-2xl" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center">
                  <FaIdCard className="text-gray-500 text-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
          disabled={isSubmitting}
        >
          <FaArrowLeft className="mr-2" /> Back to Coach Details
        </button>

        <button
          onClick={addSinglePlayerToTeam}
          className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
            isSubmitting
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700 text-white"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding Player...
            </>
          ) : (
            <>
              <FaPlus className="mr-2" /> Add Player to Team
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-900 p-4 flex justify-center">
        <button
          type="submit"
          onClick={handleClick}
          disabled={addedPlayers.length < 4}
          className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
            addedPlayers.length >= 4
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          <FaSave className="mr-2" /> Complete Registration
          {addedPlayers.length < 4 && (
            <span className="ml-2 text-xs bg-gray-700 px-2 py-1 rounded-full">
              Need {4 - addedPlayers.length} more player{addedPlayers.length === 3 ? "" : "s"}
            </span>
          )}
        </button>
      </div>

      {/* Basketball decoration */}
      <div className="fixed -bottom-20 -left-20 opacity-5 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
    </div>
  )
}

export default PlayerDetail

