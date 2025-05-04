import React, { useEffect, useState } from "react";
import "../../App.css";
import apiClient from "../../client";
import { useNavigate } from "react-router-dom";

function Modal({ children, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl mt-2"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

function SuperAdmin() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState("admin");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminFormData, setAdminFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const superadminToken = localStorage.getItem("stoken");

  useEffect(() => {
    apiClient
      .get("/superadmin/check-token", {
        headers: { Authorization: `Bearer ${superadminToken}` },
      })
      .then((res) => {
        if (res.status !== 200) {
          navigate("/superadmin8080808080");
        } else {
          setAdmins(res.data);
        }
      })
      .catch((err) => {
        alert("An error Occured");
        console.log(err);
      });
  }, [superadminToken, navigate]);

  useEffect(() => {
    apiClient
      .get("/superadmin/get-admins", {
        headers: {
          Authorization: `Bearer ${superadminToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setAdmins(res.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 500) {
            alert("Internal Server Error");
          } else {
            console.log(err);
          }
        } else {
          console.log(err);
        }
      });
  }, [superadminToken]);

  const tournamentData = [
    {
      name: "Tournament 1",
      organizer: "Organizer 1",
      location: "Location 1",
      prizePool: "1000",
    },
    {
      name: "Tournament 2",
      organizer: "Organizer 2",
      location: "Location 2",
      prizePool: "2000",
    },
  ];

  const userData = [
    { name: "User 1", phone: "123-456-7890", subscription: "Active" },
    { name: "User 2", phone: "987-654-3210", subscription: "Inactive" },
  ];

  const handleAdminFormChange = (e) => {
    const { name, value } = e.target;
    setAdminFormData({
      ...adminFormData,
      [name]: value,
    });
  };

  const handleAdminFormSubmit = (e) => {
    e.preventDefault();
    const url = isEditMode
      ? `/superadmin/update-admin/${adminFormData._id}`
      : "/superadmin/create-admin";
    const method = isEditMode ? 'put' : 'post';
  
    apiClient({
      method: method,
      url: url,
      data: adminFormData,
      headers: {
        Authorization: `Bearer ${superadminToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Admin Updated Successfully");
          setAdmins((prevAdmins) => {
            if (Array.isArray(prevAdmins)) {
              return prevAdmins.map((admin) =>
                admin._id === adminFormData._id ? res.data : admin
              );
            } else {
              return [res.data];
            }
          });
        } else if (res.status === 201) {
          alert("Admin Created Successfully");
          setAdmins((prevAdmins) => {
            if (Array.isArray(prevAdmins)) {
              return [...prevAdmins, res.data];
            } else {
              return [res.data];
            }
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 500) {
            alert("Internal Server Error");
          } else {
            console.log(err);
          }
        } else {
          console.log(err);
        }
      });
    setIsModalOpen(false);
    setAdminFormData({
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
    });
  };

  const handleEditAdmin = (admin) => {
    setAdminFormData(admin);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setShowContent("admin")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Admin History
        </button>
        <button
          onClick={() => setShowContent("tournament")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tournament
        </button>
        <button
          onClick={() => setShowContent("users")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Users
        </button>
      </div>

      {showContent === "admin" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Admin Lists</h2>
          <input
            type="text"
            placeholder="Search Admin"
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Create Admin
          </button>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Phone Number</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 &&
                admins.map((admin, index) => {
                  return (
                    <tr key={index}>
                      <td className="border px-4 py-2">{admin.username}</td>
                      <td className="border px-4 py-2">{admin.phoneNumber}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleEditAdmin(admin)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                          Edit Admin
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {showContent === "tournament" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Tournament Lists</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Tournament Name</th>
                <th className="py-2">Organizer Name</th>
                <th className="py-2">Location</th>
                <th className="py-2">Prize Pool</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tournamentData.map((tournament, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{tournament.name}</td>
                  <td className="border px-4 py-2">{tournament.organizer}</td>
                  <td className="border px-4 py-2">{tournament.location}</td>
                  <td className="border px-4 py-2">{tournament.prizePool}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                      Edit Tournament
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showContent === "users" && (
        <div>
          <h2 className="text-xl font-bold mb-4">User Lists</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">User Name</th>
                <th className="py-2">Phone Number</th>
                <th className="py-2">Subscription Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">{user.subscription}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                      Edit User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form className="w-[24vw]" onSubmit={handleAdminFormSubmit}>
            <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Admin" : "Create Admin"}</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={adminFormData.username}
                onChange={handleAdminFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={adminFormData.password}
                onChange={handleAdminFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={adminFormData.email}
                onChange={handleAdminFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={adminFormData.phoneNumber}
                onChange={handleAdminFormChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isEditMode ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default SuperAdmin;