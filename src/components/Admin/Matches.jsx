import apiClient from '../../client'; // Adjust the import path as necessary
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import UpdateMatch from './UpdateMatch';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    apiClient.get('/match/matches')
      .then(response => {
        setMatches(response.data);
        // console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEdit = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h2 className="text-xl font-bold mb-4">Matches</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border-b border-gray-300">Tournament Name</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Team 1 Name</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Team 2 Name</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Date of the Match</th>
            <th className="py-2 px-4 text-left border-b border-gray-300">Edit</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.matchId} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-left">{match.tournamentName}</td>
              <td className="border px-4 py-2 text-left">{match.team1Name}</td>
              <td className="border px-4 py-2 text-left">{match.team2Name}</td>
              <td className="border px-4 py-2 text-left">{new Date(match.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2 text-left">
                <button
                  onClick={() => handleEdit(match)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <UpdateMatch
            match={selectedMatch}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Matches;