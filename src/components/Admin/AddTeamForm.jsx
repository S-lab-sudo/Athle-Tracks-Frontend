import React, { useState } from "react";
import apiClient from "../client"; // Adjust the import path as necessary

const AddTeamForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [teamId, setTeamId] = useState("");

  const [isStepSaved, setIsStepSaved] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [teamDetails, setTeamDetails] = useState({
    name: "",
    logo: null,
    origin: "",
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

  const handleTeamDetailsChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setTeamDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0],
      }));
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

  const handlePlayerChange = (index, e) => {
    const { name, value, files } = e.target;
    const newPlayers = [...players];
    if (files) {
      newPlayers[index][name] = files[0];
    } else {
      newPlayers[index][name] = value;
    }
    setPlayers(newPlayers);
  };

  const handleCreateTeam = () => {
    const token = localStorage.getItem("atoken");
    const formData = new FormData();
    formData.append("name", teamDetails.name);
    formData.append("origin", teamDetails.origin);
    formData.append("logo", teamDetails.logo); // Ensure this is a File object

    apiClient
      .post("/team/create-team-step-1", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTeamId(response.data._id);
        setIsStepSaved((prev) => ({ ...prev, [step]: true }));
        setStep((prev) => prev + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const assignCoachToTeam = () => {
    const token = localStorage.getItem("atoken");
    const formData = new FormData();
    formData.append("coachname", coachDetails.name);
    formData.append("coachphoneNumber", coachDetails.phone_number);
    formData.append("contact_number_2", coachDetails.contact_number_2);
    formData.append("coachImage", coachDetails.image);
    formData.append("teamId", teamId);

    apiClient
      .post(`/team/add-coach-details`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsStepSaved((prev) => ({ ...prev, [step]: true }));
        setStep((prev) => prev + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addPlayersToTeam = () => {
    const token = localStorage.getItem("atoken");
    const formData = new FormData();
    formData.append("teamId", teamId);
    formData.append("players", JSON.stringify(players)); // Send players as a JSON string
  
    players.forEach((player, index) => {
      formData.append(`playerImages[${index}]`, player.image);
      formData.append(`playerDocuments[${index}]`, player.document);
    });
  
    apiClient
      .post(`/team/add-player-details`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend
    console.log({ teamDetails, coachDetails, players });
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Team</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => !isStepSaved[1] && setStep(1)}
          className={`px-4 py-2 rounded ${
            step === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          } ${isStepSaved[1] ? "cursor-not-allowed" : ""}`}
          disabled={isStepSaved[1]}
        >
          Team Details
        </button>
        <button
          onClick={() => !isStepSaved[2] && setStep(2)}
          className={`px-4 py-2 rounded ${
            step === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          } ${isStepSaved[2] ? "cursor-not-allowed" : ""}`}
          disabled={isStepSaved[2]}
        >
          Coach Details
        </button>
        <button
          onClick={() => !isStepSaved[3] && setStep(3)}
          className={`px-4 py-2 rounded ${
            step === 3 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          } ${isStepSaved[3] ? "cursor-not-allowed" : ""}`}
          disabled={isStepSaved[3]}
        >
          Player Details
        </button>
      </div>

      {step === 1 && (
        <div>
          <h3 className="text-lg font-bold mb-2">Team Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Team Name</label>
            <input
              type="text"
              name="name"
              value={teamDetails.name}
              onChange={handleTeamDetailsChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleTeamDetailsChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Origin</label>
            <input
              type="text"
              name="origin"
              value={teamDetails.origin}
              onChange={handleTeamDetailsChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            onClick={handleCreateTeam}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Team Details
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg font-bold mb-2">Coach Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Coach Name</label>
            <input
              type="text"
              name="name"
              value={coachDetails.name}
              onChange={handleCoachDetailsChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={coachDetails.phone_number}
              onChange={handleCoachDetailsChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Number 2</label>
            <input
              type="text"
              name="contact_number_2"
              value={coachDetails.contact_number_2}
              onChange={handleCoachDetailsChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleCoachDetailsChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            onClick={assignCoachToTeam}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Coach Details
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg font-bold mb-2">Player Details</h3>
          {players.map((player, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700">Player Name</label>
              <input
                type="text"
                name="name"
                value={player.name}
                onChange={(e) => handlePlayerChange(index, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contact"
                value={player.contact}
                onChange={(e) => handlePlayerChange(index, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-gray-700">Height</label>
              <input
                type="text"
                name="height"
                value={player.height}
                onChange={(e) => handlePlayerChange(index, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-gray-700">Weight</label>
              <input
                type="text"
                name="weight"
                value={player.weight}
                onChange={(e) => handlePlayerChange(index, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-gray-700">Age</label>
              <input
                type="text"
                name="age"
                value={player.age}
                onChange={(e) => handlePlayerChange(index, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => handlePlayerChange(index, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-gray-700">Document</label>
              <input
                type="file"
                name="document"
                onChange={(e) => handlePlayerChange(index, e)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              onClick={handleAddPlayer}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Player
            </button>
            <button
              onClick={addPlayersToTeam}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Player Details
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Close
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Team
        </button>
      </div>
    </div>
  );
};

export default AddTeamForm;
