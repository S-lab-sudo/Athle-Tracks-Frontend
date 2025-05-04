"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import apiClient from "../client"
import { GiBasketballBall, GiBasketballJersey } from "react-icons/gi"
import { FaUser } from "react-icons/fa"
import NavBar from "./NavBar"

const ViewPlayers = () => {
  const { id } = useParams()
  const [matchData, setMatchData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiClient
      .get(`/match/matches/${id}`)
      .then((response) => {
        setMatchData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching match data:", error)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <GiBasketballBall className="text-orange-500 text-5xl mx-auto" />
          <p className="text-white mt-4 text-xl">Loading match players...</p>
        </div>
      </div>
    )
  }

  if (!matchData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md">
          <GiBasketballBall className="text-orange-500 text-5xl mx-auto mb-4" />
          <h2 className="text-white text-2xl font-bold mb-2">Match Not Found</h2>
          <p className="text-gray-400 mb-6">The match data you're looking for could not be found.</p>
          <Link
            to="/events"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors inline-block"
          >
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const { team_1, team_2 } = matchData

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <NavBar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <GiBasketballBall className="text-orange-500 text-3xl mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-white">Match Players</h1>
              <p className="text-gray-400 mt-1">
                {team_1.team_details.name} vs {team_2.team_details.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team 1 */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-orange-500/30">
              <div className="bg-gradient-to-r from-orange-700 to-orange-600 px-6 py-4">
                <div className="flex items-center">
                  <GiBasketballJersey className="text-white text-xl mr-2" />
                  <h2 className="text-xl font-bold text-white">{team_1.team_details.name}</h2>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900 text-left">
                      <th className="px-6 py-3 text-sm font-semibold text-orange-400">Player Name</th>
                      <th className="px-6 py-3 text-sm font-semibold text-orange-400 text-center">Jersey Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team_1.players && team_1.players.length > 0 ? (
                      team_1.players.map((player) => (
                        <tr
                          key={player._id}
                          className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-6 py-3">
                            <Link
                              to={`/player/${player._id}`}
                              className="flex items-center text-white hover:text-orange-400 transition-colors"
                            >
                              <FaUser className="mr-2 text-gray-400" />
                              <span className="font-medium">{player.name}</span>
                            </Link>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full font-medium">
                              {player.jerseyNumber || "-"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-6 py-4 text-center text-gray-400">
                          No players available for this team.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team 2 */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-orange-500/30">
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
                <div className="flex items-center">
                  <GiBasketballJersey className="text-white text-xl mr-2" />
                  <h2 className="text-xl font-bold text-white">{team_2.team_details.name}</h2>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900 text-left">
                      <th className="px-6 py-3 text-sm font-semibold text-orange-400">Player Name</th>
                      <th className="px-6 py-3 text-sm font-semibold text-orange-400 text-center">Jersey Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team_2.players && team_2.players.length > 0 ? (
                      team_2.players.map((player) => (
                        <tr
                          key={player._id}
                          className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-6 py-3">
                            <Link
                              to={`/player/${player._id}`}
                              className="flex items-center text-white hover:text-orange-400 transition-colors"
                            >
                              <FaUser className="mr-2 text-gray-400" />
                              <span className="font-medium">{player.name}</span>
                            </Link>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full font-medium">
                              {player.jerseyNumber || "-"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-6 py-4 text-center text-gray-400">
                          No players available for this team.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPlayers