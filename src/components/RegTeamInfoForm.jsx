import { useState } from "react";
import apiClient from "../client";
import {
  GiBasketballBall,
  GiWhistle,
  GiBasketballJersey,
} from "react-icons/gi";
import { FaTimes, FaCheck, FaSave } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TeamDetail from "./registerTeam/TeamDetail";
import CoachDetail from "./registerTeam/CoachDetail";
import PlayerDetail from "./registerTeam/PlayerDetail";

const RegTeamInfoForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [teamId, setTeamId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isStepSaved, setIsStepSaved] = useState({
    1: false,
    2: false,
    3: false,
  });

  const [teamDetails, setTeamDetails] = useState({
    name: "",
    logo: null,
    origin: "",
    primaryNumber: "",
    total_matches: 0,
    matches_won: 0,
    matches_lost: 0,
    total_points_scored: 0,
    match_history: [],
  });

  const [coachDetails, setCoachDetails] = useState({
    name: "",
    phone_number: "",
    contact_number_2: "",
    image: null,
  });

  const [players, setPlayers] = useState([]);
  const [previewUrls, setPreviewUrls] = useState({
    teamLogo: null,
    coachImage: null,
    playerImages: {},
    playerDocuments: {},
  });

  const navigate = useNavigate();

  const handleFilePreview = (file, type, index = null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "teamLogo") {
        setPreviewUrls((prev) => ({ ...prev, teamLogo: reader.result }));
      } else if (type === "coachImage") {
        setPreviewUrls((prev) => ({ ...prev, coachImage: reader.result }));
      } else if (type === "playerImage") {
        setPreviewUrls((prev) => ({
          ...prev,
          playerImages: { ...prev.playerImages, [index]: reader.result },
        }));
      } else if (type === "playerDocument") {
        setPreviewUrls((prev) => ({
          ...prev,
          playerDocuments: { ...prev.playerDocuments, [index]: reader.result },
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTeamDetailsChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setTeamDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0],
      }));

      if (name === "logo") {
        handleFilePreview(files[0], "teamLogo");
      }
    } else {
      setTeamDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleCoachDetailsChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCoachDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0],
      }));

      if (name === "image") {
        handleFilePreview(files[0], "coachImage");
      }
    } else {
      setCoachDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleAddPlayer = () => {
    setPlayers([
      ...players,
      {
        id: players.length + 1,
        name: "",
        contact: "",
        height: "",
        weight: "",
        age: "",
        image: null,
        document: null,
      },
    ]);
  };

  const handleRemovePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);

    const newPlayerImages = { ...previewUrls.playerImages };
    const newPlayerDocuments = { ...previewUrls.playerDocuments };
    delete newPlayerImages[index];
    delete newPlayerDocuments[index];

    setPreviewUrls((prev) => ({
      ...prev,
      playerImages: newPlayerImages,
      playerDocuments: newPlayerDocuments,
    }));
  };

  const handlePlayerChange = (index, e) => {
    const { name, value, files } = e.target;
    const newPlayers = [...players];

    if (files) {
      newPlayers[index][name] = files[0];

      if (name === "image") {
        handleFilePreview(files[0], "playerImage", index);
      } else if (name === "document") {
        handleFilePreview(files[0], "playerDocument", index);
      }
    } else {
      newPlayers[index][name] = value;
    }

    setPlayers(newPlayers);
  };

  const handleCreateTeam = () => {
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", teamDetails.name);
    formData.append("origin", teamDetails.origin);
    formData.append("teamPrimaryNumber", teamDetails.primaryNumber);
    formData.append("logo", teamDetails.logo);

    apiClient
      .post("/team/create-team-step-1", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setTeamId(response.data._id);
          setIsStepSaved((prev) => ({ ...prev, [step]: true }));
          setSuccess("Team details saved successfully!");

          setTimeout(() => {
            setSuccess("");
            setStep((prev) => prev + 1);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(
          error.response?.data?.message ||
            "Failed to save team details. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const assignCoachToTeam = () => {
    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("atoken");
    const formData = new FormData();
    formData.append("coachname", coachDetails.name);
    formData.append("coachphoneNumber", coachDetails.phone_number);
    formData.append("contact_number_2", coachDetails.contact_number_2);
    formData.append("coachImage", coachDetails.image);
    formData.append("teamId", teamId);

    // an loop that prints every key value pair in the form data
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    apiClient
      .post(`/team/add-coach-details`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsStepSaved((prev) => ({ ...prev, [step]: true }));
        setSuccess("Coach details saved successfully!");

        setTimeout(() => {
          setSuccess("");
          setStep((prev) => prev + 1);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setError(
          error.response?.data?.message ||
            "Failed to save coach details. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ teamDetails, coachDetails, players });
    onClose();
  };

  const validateStep = (stepNumber) => {
    if (stepNumber === 1) {
      return teamDetails.name && teamDetails.origin && teamDetails.logo;
    } else if (stepNumber === 2) {
      return (
        coachDetails.name && coachDetails.phone_number && coachDetails.image
      );
    } else if (stepNumber === 3) {
      return (
        players.length > 0 &&
        players.every(
          (player) =>
            player.name &&
            player.contact &&
            player.height &&
            player.weight &&
            player.age &&
            player.image &&
            player.document
        )
      );
    }
    return false;
  };

  return (
    <div className="bg-gray-800 shadow-2xl overflow-hidden text-white pt-20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <GiBasketballBall className="text-white text-2xl mr-3" />
          <h2 className="text-xl font-bold">Register New Team</h2>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      <div className="bg-orange-100 text-orange-800 p-2 text-center font-semibold">
        Important: Once you proceed to another step, you cannot edit your added
        details.
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step === 1
                  ? "bg-orange-600 text-white"
                  : isStepSaved[1]
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {isStepSaved[1] ? <FaCheck /> : <GiBasketballBall />}
            </div>
            <span
              className={`mt-2 text-sm ${
                step === 1
                  ? "text-orange-400"
                  : isStepSaved[1]
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              Team Details
            </span>
          </div>

          {/* Connector */}
          <div
            className={`h-1 flex-1 mx-2 ${
              isStepSaved[1] ? "bg-green-600" : "bg-gray-700"
            }`}
          ></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step === 2
                  ? "bg-orange-600 text-white"
                  : isStepSaved[2]
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {isStepSaved[2] ? <FaCheck /> : <GiWhistle />}
            </div>
            <span
              className={`mt-2 text-sm ${
                step === 2
                  ? "text-orange-400"
                  : isStepSaved[2]
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              Coach Details
            </span>
          </div>

          {/* Connector */}
          <div
            className={`h-1 flex-1 mx-2 ${
              isStepSaved[2] ? "bg-green-600" : "bg-gray-700"
            }`}
          ></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step === 3
                  ? "bg-orange-600 text-white"
                  : isStepSaved[3]
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}
            >
              {isStepSaved[3] ? <FaCheck /> : <GiBasketballJersey />}
            </div>
            <span
              className={`mt-2 text-sm ${
                step === 3
                  ? "text-orange-400"
                  : isStepSaved[3]
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              Player Details
            </span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        {/* Success Message */}
        {success && (
          <div className="mb-4 bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded-lg flex items-start">
            <FaCheck className="text-green-400 mr-2 text-lg flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg flex items-start">
            <IoMdAlert className="text-red-400 mr-2 text-lg flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Team Details */}
        {step === 1 && (
          <TeamDetail
            teamDetails={teamDetails}
            handleTeamDetailsChange={handleTeamDetailsChange}
            previewUrls={previewUrls}
            validateStep={validateStep}
            handleCreateTeam={handleCreateTeam}
            isLoading={isLoading}
            onClose={onClose}
          />
        )}

        {/* Step 2: Coach Details */}
        {step === 2 && (
          <CoachDetail
            coachDetails={coachDetails}
            handleCoachDetailsChange={handleCoachDetailsChange}
            previewUrls={previewUrls}
            validateStep={validateStep}
            assignCoachToTeam={assignCoachToTeam}
            isLoading={isLoading}
            setStep={setStep}
          />
        )}

        {/* Step 3: Player Details */}
        {step === 3 && (
          <PlayerDetail
            isStepSaved={isStepSaved}
            teamId={teamId}
            players={players}
            handlePlayerChange={handlePlayerChange}
            handleAddPlayer={handleAddPlayer}
            handleRemovePlayer={handleRemovePlayer}
            previewUrls={previewUrls}
            validateStep={validateStep}
            isLoading={isLoading}
            setStep={setStep}
            success={success}
            error={error}
          />
        )}
      </div>

      {/* Footer */}
    </div>
  );
};

export default RegTeamInfoForm;
