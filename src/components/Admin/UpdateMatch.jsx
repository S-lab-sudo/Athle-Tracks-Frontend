import React, { useEffect, useState } from 'react';
import apiClient from '../../client';

const UpdateMatch = ({ match, onClose }) => {
  const [updatedTeam1Players, setUpdatedTeam1Players] = useState([]);
  const [updatedTeam2Players, setUpdatedTeam2Players] = useState([]);

  useEffect(() => {
    setUpdatedTeam1Players(
      match.team1Players.map((player) => {
        const playerStats = match.playerStats.find(
          (stats) => stats.player_id === player._id && stats.team_id === match.team1Id
        );
        return {
          playerId: player._id,
          name: player.name,
          points: playerStats ? playerStats.points : 0,
          assists: playerStats ? playerStats.assists : 0,
          rebounds: playerStats ? playerStats.rebounds : 0,
          inputPoints: 0,
          inputAssists: 0,
          inputRebounds: 0,
          notplayed: playerStats?.notplayed
            ? playerStats.notplayed === "DNP"
              ? "played"
              : playerStats.notplayed
            : "played",
        };
      })
    );

    setUpdatedTeam2Players(
      match.team2Players.map((player) => {
        const playerStats = match.playerStats.find(
          (stats) => stats.player_id === player._id && stats.team_id === match.team2Id
        );
        return {
          playerId: player._id,
          name: player.name,
          points: playerStats ? playerStats.points : 0,
          assists: playerStats ? playerStats.assists : 0,
          rebounds: playerStats ? playerStats.rebounds : 0,
          inputPoints: 0,
          inputAssists: 0,
          inputRebounds: 0,
          notplayed: playerStats?.notplayed
            ? playerStats.notplayed === "DNP"
              ? "played"
              : playerStats.notplayed
            : "played",
        };
      })
    );
  }, [match]);

  const handleInputChange = (team, playerId, field, value) => {
    const updatePlayer = (players) =>
      players.map((player) =>
        player.playerId === playerId
          ? { ...player, [`input${field}`]: value === '' || value === '-' ? value : parseInt(value, 10) || 0 }
          : player
      );

    if (team === 'team1') {
      setUpdatedTeam1Players(updatePlayer(updatedTeam1Players));
    } else {
      setUpdatedTeam2Players(updatePlayer(updatedTeam2Players));
    }
  };

  const handleUpdateMatch = () => {
    const parsePlayerStats = (players) =>
      players.map((player) => ({
        playerId: player.playerId,
        points: parseInt(player.inputPoints, 10) || 0,
        assists: parseInt(player.inputAssists, 10) || 0,
        rebounds: parseInt(player.inputRebounds, 10) || 0,
        notplayed: player.notplayed,
      }));

    const updatedMatchDetails = {
      matchId: match.matchId,
      team1Players: parsePlayerStats(updatedTeam1Players),
      team2Players: parsePlayerStats(updatedTeam2Players),
    };

    console.log('Updated Match Details:', updatedMatchDetails);

    apiClient
      .post('/match/match/update', updatedMatchDetails)
      .then((response) => {
        console.log('Match updated successfully:', response.data);
        if (response.status === 200) {
          alert('Match updated successfully');
        } else {
          alert('Match not updated successfully');
        }
      })
      .catch((error) => {
        console.error('Error updating match:', error);
      });
  };

  const getColor = (value) => (value >= 0 ? 'text-green-500' : 'text-red-500');

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Update Match</h2>
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold">Tournament: {match.tournamentName}</h3>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8 mb-4">
        <div className="w-full lg:w-1/2">
          <h4 className="text-md font-semibold text-center lg:text-left">Team 1: {match.team1Name}</h4>
          <table className="min-w-full bg-white border border-gray-300 mt-2 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left border-b border-gray-300">Player's Name</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Played or not</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Points</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Assists</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Rebounds</th>
              </tr>
            </thead>
            <tbody>
              {updatedTeam1Players.map((player) => (
                <tr key={player.playerId} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-left">{player.name}</td>
                  <td className="border px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={player.notplayed === "played"}
                      onChange={(e) => {
                        const updatedPlayers = updatedTeam1Players.map((p) =>
                          p.playerId === player.playerId ? { ...p, notplayed: e.target.checked ? "played" : "Not Played" } : p
                        );
                        setUpdatedTeam1Players(updatedPlayers);
                      }}
                      className="mr-2"
                    />
                    {player.notplayed === "played" ? "Played" : "Not Played"}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    <span
                      className={`${getColor(player.points + (parseInt(player.inputPoints, 10) || 0))} mr-2 font-bold text-lg`}
                    >
                      {player.points + (parseInt(player.inputPoints, 10) || 0)}
                    </span>
                    <input
                      type="text"
                      value={player.inputPoints}
                      onChange={(e) =>
                        handleInputChange('team1', player.playerId, 'Points', e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 text-left">
                    <span
                      className={`${getColor(player.assists + (parseInt(player.inputAssists, 10) || 0))} mr-2 font-bold text-lg`}
                    >
                      {player.assists + (parseInt(player.inputAssists, 10) || 0)}
                    </span>
                    <input
                      type="text"
                      value={player.inputAssists}
                      onChange={(e) =>
                        handleInputChange('team1', player.playerId, 'Assists', e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 text-left">
                    <span
                      className={`${getColor(player.rebounds + (parseInt(player.inputRebounds, 10) || 0))} mr-2 font-bold text-lg`}
                    >
                      {player.rebounds + (parseInt(player.inputRebounds, 10) || 0)}
                    </span>
                    <input
                      type="text"
                      value={player.inputRebounds}
                      onChange={(e) =>
                        handleInputChange('team1', player.playerId, 'Rebounds', e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full lg:w-1/2">
          <h4 className="text-md font-semibold text-center lg:text-left">Team 2: {match.team2Name}</h4>
          <table className="min-w-full bg-white border border-gray-300 mt-2 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left border-b border-gray-300">Player's Name</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Played or not</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Points</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Assists</th>
                <th className="py-2 px-4 text-left border-b border-gray-300">Rebounds</th>
              </tr>
            </thead>
            <tbody>
              {updatedTeam2Players.map((player) => (
                <tr key={player.playerId} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-left">{player.name}</td>
                  <td className="border px-4 py-2 text-left">
                    <input
                      type="checkbox"
                      checked={player.notplayed === "played"}
                      onChange={(e) => {
                        const updatedPlayers = updatedTeam2Players.map((p) =>
                          p.playerId === player.playerId ? { ...p, notplayed: e.target.checked ? "played" : "Not Played" } : p
                        );
                        setUpdatedTeam2Players(updatedPlayers);
                      }}
                      className="mr-2"
                    />
                    {player.notplayed === "played" ? "Played" : "Not Played"}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    <span
                      className={`${getColor(player.points + (parseInt(player.inputPoints, 10) || 0))} mr-2 font-bold text-lg`}
                    >
                      {player.points + (parseInt(player.inputPoints, 10) || 0)}
                    </span>
                    <input
                      type="text"
                      value={player.inputPoints}
                      onChange={(e) =>
                        handleInputChange('team2', player.playerId, 'Points', e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 text-left">
                    <span
                      className={`${getColor(player.assists + (parseInt(player.inputAssists, 10) || 0))} mr-2 font-bold text-lg`}
                    >
                      {player.assists + (parseInt(player.inputAssists, 10) || 0)}
                    </span>
                    <input
                      type="text"
                      value={player.inputAssists}
                      onChange={(e) =>
                        handleInputChange('team2', player.playerId, 'Assists', e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border px-4 py-2 text-left">
                    <span
                      className={`${getColor(player.rebounds + (parseInt(player.inputRebounds, 10) || 0))} mr-2 font-bold text-lg`}
                    >
                      {player.rebounds + (parseInt(player.inputRebounds, 10) || 0)}
                    </span>
                    <input
                      type="text"
                      value={player.inputRebounds}
                      onChange={(e) =>
                        handleInputChange('team2', player.playerId, 'Rebounds', e.target.value)
                      }
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Close
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={handleUpdateMatch}
        >
          Update Match
        </button>
      </div>
    </div>
  );
};

export default UpdateMatch;