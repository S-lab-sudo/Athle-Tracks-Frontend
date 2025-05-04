import React, { useState, useEffect } from "react";
import multiPartClient from "../../multipartclient";

const UpdateTournament = ({ tournament, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    location: "",
    registeringStartDate: "",
    organizer: {
      name: "",
      phoneNumber: "",
    },
    prizePool: {
      firstPrize: "",
      secondPrize: "",
      thirdPrize: "",
      entryFee: "",
      mvp: "",
    },
    posterImage: null,
    organizerImage: null,
  });

  const [originalData, setOriginalData] = useState({});

  // Helper function to format ISO date to "yyyy-MM-dd"
  const formatDate = (isoDate) => {
    return new Date(isoDate).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (tournament) {
      const formattedData = {
        name: tournament.name,
        startDate: formatDate(tournament.startDate),
        endDate: formatDate(tournament.endDate),
        location: tournament.location,
        registeringStartDate: formatDate(tournament.registeringStartDate),
        organizer: {
          name: tournament.organizer.name,
          phoneNumber: tournament.organizer.phoneNumber,
        },
        prizePool: {
          firstPrize: tournament.prizePool.firstPrize,
          secondPrize: tournament.prizePool.secondPrize,
          thirdPrize: tournament.prizePool.thirdPrize,
          entryFee: tournament.prizePool.entryFee,
          mvp: tournament.prizePool.mvp,
        },
        posterImage: String(tournament.posterImage),
        organizerImage: String(tournament.organizer.image),
      };

      setFormData(formattedData);
      setOriginalData(formattedData); // Store the original data for comparison
    }
  }, [tournament]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      const keys = name.split(".");
      if (keys.length > 1) {
        setFormData((prevData) => ({
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
  
    // Compare formData with originalData and append only updated fields
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "object" && !Array.isArray(formData[key])) {
        // Handle nested objects (e.g., organizer, prizePool)
        Object.keys(formData[key]).forEach((subKey) => {
          if (formData[key][subKey] !== originalData[key][subKey]) {
            updatedData.append(`${key}[${subKey}]`, formData[key][subKey]);
          }
        });
      } else if (formData[key] !== originalData[key]) {
        updatedData.append(key, formData[key]);
      }
    });
  
    const token = localStorage.getItem("atoken");
  
    multiPartClient
      .put(
        `/tournaments/${tournament._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert("Tournament updated successfully");
        onClose();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Update Tournament</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-gray-700">Tournament Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Tournament Name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Location"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Registering Start Date</label>
          <input
            type="date"
            name="registeringStartDate"
            value={formData.registeringStartDate}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Organizer Name</label>
          <input
            type="text"
            name="organizer.name"
            value={formData.organizer.name}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Organizer Name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Organizer Phone Number</label>
          <input
            type="text"
            name="organizer.phoneNumber"
            value={formData.organizer.phoneNumber}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Organizer Phone Number"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">First Prize</label>
          <input
            type="text"
            name="prizePool.firstPrize"
            value={formData.prizePool.firstPrize}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="First Prize"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Second Prize</label>
          <input
            type="text"
            name="prizePool.secondPrize"
            value={formData.prizePool.secondPrize}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Second Prize"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Third Prize</label>
          <input
            type="text"
            name="prizePool.thirdPrize"
            value={formData.prizePool.thirdPrize}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Third Prize"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Man of the Match Prize</label>
          <input
            type="text"
            name="prizePool.entryFee"
            value={formData.prizePool.entryFee}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Entry Fee"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">MVP Prize</label>
          <input
            type="text"
            name="prizePool.mvp"
            value={formData.prizePool.mvp}
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="MVP Prize"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Poster Image</label>
          <input
            type="file"
            name="posterImage"
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {formData.posterImage && (
            <img
              src={
                typeof formData.posterImage === "string"
                  ? `${formData.posterImage}`
                  : URL.createObjectURL(formData.posterImage)
              }
              alt="Poster"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <div>
          <label className="block text-gray-700">Organizer Image</label>
          <input
            type="file"
            name="organizerImage"
            onChange={handleFormChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          {formData.organizerImage && (
            <img
              src={`${formData.organizerImage}`}
              alt="Organizer"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Close
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Tournament
        </button>
      </div>
    </form>
  );
};

export default UpdateTournament;