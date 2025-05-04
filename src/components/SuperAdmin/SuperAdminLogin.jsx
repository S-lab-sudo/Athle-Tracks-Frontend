import React, { useState } from "react";
import apiClient from "../../client";
import { useNavigate } from "react-router-dom";

function SuperAdminLogin() {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient
      .post("/superadmin/login", formData)
      .then((res) => {
        if (res.status === 200) {
          // Store the token in localStorage
          localStorage.setItem("stoken", res.data.token);
          // Set a timeout to remove the token after 1 hour
          setTimeout(() => {
            localStorage.removeItem("token");
          }, 3600000); // 1 hour in milliseconds
          navigate("/superadminakakakakak");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 500) {
            alert("Internal Server Error");
          } else if (err.response.status === 401) {
            alert("Invalid Credentials");
          } else {
            console.log(err);
          }
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Super Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              Please Enter Your Details
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="id"
              value={formData.email}
              onChange={handleChange}
              placeholder="id"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SuperAdminLogin;
