import React from "react";
import { useState } from "react";
import apiClient from "../../client";

const Admin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post('/admin/login', formData).then((res) => {
      if (res.status === 200) {
        localStorage.setItem('atoken', res.data.token);
        setTimeout(() => {
          localStorage.removeItem('token');
        }, 3600000);
        return (window.location.href = "/admin");
      }
    }).catch((err) => {
      console.log("error : ",err)
      if (err.response) {
        if (err.response.status === 500) {
          alert('Internal Server Error');
        } else if (err.response.status === 401) {
          alert('Invalid Credentials');
        } else {
          console.log(err);
        }
      } else {
        console.log(err);
      }
    }
    );
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              name="password"
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
};

export default Admin;
