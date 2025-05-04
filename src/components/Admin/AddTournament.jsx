import React, { useState } from "react";
import apiClient from "../../client"; // Adjust the import path as necessary

const AddTournament = ({ onClose, onAddTournament }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [posterImage, setPosterImage] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [organizerImage, setOrganizerImage] = useState(null);
  const [organizerPhoneNumber, setOrganizerPhoneNumber] = useState("");
  const [firstPrize, setFirstPrize] = useState("");
  const [secondPrize, setSecondPrize] = useState("");
  const [thirdPrize, setThirdPrize] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [mvp, setMvp] = useState("");
  const [location, setLocation] = useState("");
  const [registeringStartDate, setRegisteringStartDate] = useState("");
  const [posterImagePreview, setPosterImagePreview] = useState(null);
  const [organizerImagePreview, setOrganizerImagePreview] = useState(null);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (
        file &&
        file.size <= 25 * 1024 * 1024 &&
        ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (name === "posterImage") {
            setPosterImagePreview(reader.result);
          } else if (name === "organizerImage") {
            setOrganizerImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
        if (name === "posterImage") {
          setPosterImage(file);
        } else if (name === "organizerImage") {
          setOrganizerImage(file);
        }
      } else {
        alert("File must be an image (jpeg, jpg, png) and less than 25MB");
      }
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "startDate":
          setStartDate(value);
          break;
        case "endDate":
          setEndDate(value);
          break;
        case "organizerName":
          setOrganizerName(value);
          break;
        case "organizerPhoneNumber":
          setOrganizerPhoneNumber(value);
          break;
        case "firstPrize":
          setFirstPrize(value);
          break;
        case "secondPrize":
          setSecondPrize(value);
          break;
        case "thirdPrize":
          setThirdPrize(value);
          break;
        case "entryFee":
          setEntryFee(value);
          break;
        case "mvp":
          setMvp(value);
          break;
        case "location":
          setLocation(value);
          break;
        case "registeringStartDate":
          setRegisteringStartDate(value);
          break;
        default:
          break;
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("location", location);
    formData.append("registeringStartDate", registeringStartDate);
    formData.append("posterImage", posterImage);
    formData.append("organizerImage", organizerImage);
    formData.append("organizer[name]", organizerName);
    formData.append("organizer[phoneNumber]", organizerPhoneNumber);
    formData.append("prizePool[firstPrize]", firstPrize);
    formData.append("prizePool[secondPrize]", secondPrize);
    formData.append("prizePool[thirdPrize]", thirdPrize);
    formData.append("prizePool[entryFee]", entryFee);
    formData.append("prizePool[mvp]", mvp);

    const token = localStorage.getItem("atoken");

    // Log the FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    apiClient
      .post(
        "/tournaments/create-tournament",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          alert("Tournament created successfully");
          onAddTournament(res.data); // Add the new tournament to the state in Tournaments.jsx
          setName("");
          setStartDate("");
          setEndDate("");
          setPosterImage(null);
          setOrganizerName("");
          setOrganizerImage(null);
          setOrganizerPhoneNumber("");
          setFirstPrize("");
          setSecondPrize("");
          setThirdPrize("");
          setEntryFee("");
          setMvp("");
          setLocation("");
          setRegisteringStartDate("");
          setPosterImagePreview(null);
          setOrganizerImagePreview(null);
          onClose();
        } else if (res.status === 400) {
          alert("Bad Request");
        } else if (res.status === 401) {
          alert("Not Authorized");
        } else if (res.status === 500) {
          alert("Internal Server Error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <form
      className="w-[40vw] h-[80vh] overflow-y-scroll"
      onSubmit={handleFormSubmit}
    >
      <h2 className="text-xl font-bold mb-4">Create Tournament</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Tournament Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Poster Image</label>
        <input
          type="file"
          name="posterImage"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
        {posterImagePreview && (
          <img
            src={posterImagePreview}
            alt="Poster Preview"
            className="mt-2 h-32 w-32 object-cover"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Organizer Name</label>
        <input
          type="text"
          name="organizerName"
          value={organizerName}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Organizer Image</label>
        <input
          type="file"
          name="organizerImage"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
        {organizerImagePreview && (
          <img
            src={organizerImagePreview}
            alt="Organizer Preview"
            className="mt-2 h-32 w-32 object-cover"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Organizer Phone Number</label>
        <input
          type="text"
          name="organizerPhoneNumber"
          value={organizerPhoneNumber}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">First Prize</label>
        <input
          type="text"
          name="firstPrize"
          value={firstPrize}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Second Prize</label>
        <input
          type="text"
          name="secondPrize"
          value={secondPrize}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Third Prize</label>
        <input
          type="text"
          name="thirdPrize"
          value={thirdPrize}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Man of the Match Prize</label>
        <input
          type="text"
          name="entryFee"
          value={entryFee}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">MVP Prize</label>
        <input
          type="text"
          name="mvp"
          value={mvp}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Registering Start Date</label>
        <input
          type="date"
          name="registeringStartDate"
          value={registeringStartDate}
          onChange={handleFormChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
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
          Create
        </button>
      </div>
    </form>
  );
};

export default AddTournament;