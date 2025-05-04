import apiClient from "../../client";
import React, { useEffect, useState } from "react";
import Matches from "./Matches";
import Players from "./Players";
import Teams from "./Teams";
import Tournaments from "./Tournaments";
import Users from "./Users";

const AdminDashboard = () => {
  const [selectedContent, setSelectedContent] = useState("Tournaments");

  useEffect(() => {
    const token = localStorage.getItem("atoken");
    if (!token) {
      window.location.href = "/adminlogin";
    } else {
      apiClient
        .get("/admin/check-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status !== 200) {
            return (window.location.href = "/adminlogin");
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 500) {
              alert("Internal Server Error");
            } else if (err.response.status === 401) {
              return (window.location.href = "/adminlogin");
            } else {
              console.log(err);
            }
          } else {
            console.log(err);
          }
        });
    }
  }, []);

  return (
    <div className="p-4 w-[100vw]">
      <div className="w-[100vw] flex justify-center space-x-4 mb-6 overflow-x-scroll">
        <button
          onClick={() => setSelectedContent("Tournaments")}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${selectedContent === "Tournaments" ? "bg-blue-700" : ""}`}
        >
          Tournaments
        </button>
        <button
          onClick={() => setSelectedContent("Users")}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${selectedContent === "Users" ? "bg-blue-700" : ""}`}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedContent("Teams")}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${selectedContent === "Teams" ? "bg-blue-700" : ""}`}
        >
          Teams
        </button>
        <button
          onClick={() => setSelectedContent("Matches")}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${selectedContent === "Matches" ? "bg-blue-700" : ""}`}
        >
          Matches
        </button>
        <button
          onClick={() => setSelectedContent("Players")}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${selectedContent === "Players" ? "bg-blue-700" : ""}`}
        >
          Players
        </button>
      </div>
      <div className="content">
        {selectedContent === "Tournaments" && <Tournaments />}
        {selectedContent === "Users" && <Users />} 
        {selectedContent === "Teams" && <Teams />}
        {selectedContent === "Matches" && <Matches />}
        {selectedContent === "Players" && <Players />}
      </div>
    </div>
  );
};

export default AdminDashboard;
