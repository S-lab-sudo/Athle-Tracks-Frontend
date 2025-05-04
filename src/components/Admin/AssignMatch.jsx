import apiClient from "../../client"; // Adjust the import path as necessary
import React, { useEffect, useState } from "react";

const AssignMatch = ({ tournament, onClose }) => {
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [teams, setTeams] = useState([]);
  const [time, setTime] = useState("");
  const [matchDate, setMatchDate] = useState("");

  const handleSelectTeam = (teamId) => {
    if (teamA === teamId) {
      setTeamA(null);
    } else if (teamB === teamId) {
      setTeamB(null);
    } else if (!teamA) {
      setTeamA(teamId);
    } else if (!teamB) {
      setTeamB(teamId);
    } else if (teamA && teamB) {
      setTeamA(teamId);
      setTeamB(null);
    }
  };

  useEffect(() => {
    apiClient
      .post("/team/get-team-names", {
        teamsId: tournament.teams,
      })
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tournament.teams]);

  const handleAssignMatch = () => {
    if (teamA && teamB && matchDate) {
      // Assign match between the selected teams
      console.log(
        `Assign match between team ${teamA} and team ${teamB} on ${matchDate} in tournament ${tournament._id}`
      );

      apiClient.post("/tournaments/create-match-and-save-to-tournament",{
        teamAId:teamA,
        teamBId:teamB,
        tournamentId:tournament._id,
        matchTime:time,
        matchDate:matchDate
      }).then(response=>{
        if(response.status===201){
          alert("Match added succesfully")
        }else{
          console.log(response)
        }
      }).catch(err=>{
        console.log(err)
        alert("Something went wrong")
      })
      // Add your logic to assign the match here
    } else {
      alert("Please select exactly two teams and a match date to assign a match.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Assign Match in {tournament.name}</h2>
      <label className="block text-gray-700 mb-2">Teams registered to this tournament:</label>
      <ul className="max-h-64 overflow-y-auto mb-4">
        {teams.length > 0 &&
          teams.map((team) => (
            <li
              key={team.teamId}
              className={`p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 ${
                teamA === team.teamId || teamB === team.teamId ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectTeam(team.teamId)}
            >
              <div>Team: {team.teamName}</div>
              <div>Coach: {team.coachName}</div>
            </li>
          ))}
      </ul>
      <label className="block text-gray-700 mb-2">Date of the match:</label>
      <input
        type="date"
        value={matchDate}
        onChange={(e) => setMatchDate(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <label className="block text-gray-700 mb-2">Time of the match:</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
        <button
          type="button"
          onClick={handleAssignMatch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign Match
        </button>
      </div>
    </div>
  );
};

export default AssignMatch;