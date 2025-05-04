import apiClient from "../../client";
import React, { useEffect, useState } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    apiClient
      .get("/player/getAllPlayers")
      .then((response) => {
        if (response.status === 404) {
          alert("No Players Found");
        } else {
          setPlayers(response.data);
          // console.log(response.data);
        }
      })
      .catch((error) => {
        alert("An Error Occurred");
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4">
      {players.length === 0 ? (
        <div>No Players</div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Mobile Number
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <img
                    src={`${player.image}`}
                    alt={player.name}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {player.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {player.mobileNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Players;
