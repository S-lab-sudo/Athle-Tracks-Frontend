import React, { useEffect, useState } from 'react';
import apiClient from '../../client';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(()=>{
    apiClient.get('/team/teams').then(response=>{
      setTeams(response.data)
    }).catch(err=>{
      console.log(err)
    })

  },[])

  const handleEdit = (teamId) => {
    console.log(`Edit team with id: ${teamId}`);
    // Add your edit logic here
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <table className="w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border-b border-gray-300">Team Name</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Origin</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Coach Name</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Coach Contact</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-left">{team.team_details.name}</td>
              <td className="border px-4 py-2 text-left">{team.team_details.origin}</td>
              <td className="border px-4 py-2 text-left">{team.coach.name}</td>
              <td className="border px-4 py-2 text-left">{team.coach.phone_number}</td>
              <td className="border px-4 py-2 text-left">
                <button
                  onClick={() => handleEdit(team._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;