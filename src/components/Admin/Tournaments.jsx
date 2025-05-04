import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import AddTournament from "./AddTournament";
import UpdateTournament from "./UpdateTournament";
import AssignMatch from './AssignMatch'
import apiClient from "../../client";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    // Fetch tournaments from the backend
    const fetchTournaments = async () => {
      try {
        const response = await apiClient.get(
          "/tournaments/admin-tournaments"
        );
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  const handleEdit = (tournament) => {
    setSelectedTournament(tournament);
    setModalType("edit");
    setIsModalOpen(true);
  };
  const handleAddTournament = (newTournament) => {
    setTournaments([...tournaments, newTournament]);
  };

  const handleAssignMatch = (tournament) => {
    setSelectedTournament(tournament);
    setModalType("assignMatch");
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto mt-5 p-4 h-[100vh] w-[100vw]">
      <h2 className="text-xl font-bold mb-4">Tournaments</h2>
      <button
        onClick={() => {setIsModalOpen(true); setModalType("create")}}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Create Tournament
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left border-b border-gray-300">
              Tournament Name
            </th>
            <th className="py-2 px-4 text-left border-b border-gray-300">
              Organizer Name
            </th>
            <th className="py-2 px-4 text-left border-b border-gray-300">
              Organizer Phone Number
            </th>
            <th className="py-2 px-4 text-left border-b border-gray-300">
              Edit Tournament
            </th>
            <th className="py-2 px-4 text-left border-b border-gray-300">
              Add Match
            </th>
          </tr>
        </thead>
        <tbody>
          {tournaments.length > 0 &&
            tournaments.map((tournament) => (
              <tr key={tournament._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-left">
                  {tournament.name}
                </td>
                <td className="border px-4 py-2 text-left">
                  {tournament.organizer.name}
                </td>
                <td className="border px-4 py-2 text-left">
                  {tournament.organizer.phoneNumber}
                </td>
                <td className="border px-4 py-2 text-left">
                  <button
                    onClick={() => handleEdit(tournament)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2 text-left">
                  <button
                    onClick={() => handleAssignMatch(tournament)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Add Match
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {/* {console.log(modalType==="edit")} */}
          {modalType === "edit" && selectedTournament ? (
            <UpdateTournament
              tournament={selectedTournament}
              onClose={() => setIsModalOpen(false)}
            />
          ) : modalType === "create" ? (
            <AddTournament
              onClose={() => setIsModalOpen(false)}
              onAddTournament={handleAddTournament}
            />
          ) : modalType === "assignMatch" && selectedTournament ? (
            <AssignMatch
              tournament={selectedTournament}
              onClose={() => setIsModalOpen(false)}
            />
          ) : null}
        </Modal>
      )}
    </div>
  );
};

export default Tournaments;
