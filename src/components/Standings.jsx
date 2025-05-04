"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import apiClient from "../client"
import { GiBasketballBall } from "react-icons/gi"
import NavBar from "./NavBar"

const Standings = () => {
  const { id } = useParams()
  const [teamsData, setTeamsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [tournamentName, setTournamentName] = useState("")

  useEffect(() => {
    setLoading(true)
    apiClient
      .get(`/tournaments/${id}`)
      .then((response) => {
        const tournamentData = response.data
        setTournamentName(tournamentData.name || "Tournament")
        const teams = tournamentData.teams
        const matches = tournamentData.matches

        const standings = teams.map((team) => {
          const teamId = team._id
          const teamName = team.team_details.name

          let numberOfPlays = 0
          let numberOfWins = 0
          let numberOfLosses = 0
          let totalPoints = 0

          matches.forEach((match) => {
            if (match.player_stats.length > 0) {
              if (match.team_1._id === teamId || match.team_2._id === teamId) {
                numberOfPlays++

                // Check if the team won or lost
                const team1Points = match.player_stats
                  .filter((stat) => stat.team_id === match.team_1._id)
                  .reduce((sum, stat) => sum + stat.points, 0)

                const team2Points = match.player_stats
                  .filter((stat) => stat.team_id === match.team_2._id)
                  .reduce((sum, stat) => sum + stat.points, 0)

                if (match.team_1._id === teamId) {
                  totalPoints += team1Points
                  if (team1Points > team2Points) {
                    numberOfWins++
                  } else {
                    numberOfLosses++
                  }
                } else if (match.team_2._id === teamId) {
                  totalPoints += team2Points
                  if (team2Points > team1Points) {
                    numberOfWins++
                  } else {
                    numberOfLosses++
                  }
                }
              }
            }
          })

          return {
            teamName,
            numberOfPlays,
            numberOfWins,
            numberOfLosses,
            points: numberOfWins * 3,
          }
        })

        // Sort teams by points (highest first)
        const sortedStandings = standings.sort((a, b) => b.points - a.points)
        setTeamsData(sortedStandings)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching tournament data:", error)
        setLoading(false)
      })
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <NavBar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <GiBasketballBall className="text-orange-500 text-3xl mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-white">{tournamentName} Standings</h1>
              <p className="text-gray-400 mt-1">Team rankings and performance statistics</p>
            </div>
          </div>

          {/* Standings Table */}
          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-orange-500/30">
            {loading ? (
              <div className="p-8 text-center">
                <GiBasketballBall className="text-orange-500 text-4xl mx-auto mb-4" />
                <p className="text-gray-300">Loading standings data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900 text-left">
                      <th className="px-6 py-4 text-sm font-semibold text-orange-400">Rank</th>
                      <th className="px-6 py-4 text-sm font-semibold text-orange-400">Team Name</th>
                      <th className="px-6 py-4 text-sm font-semibold text-orange-400 text-center">Played</th>
                      <th className="px-6 py-4 text-sm font-semibold text-orange-400 text-center">Wins</th>
                      <th className="px-6 py-4 text-sm font-semibold text-orange-400 text-center">Losses</th>
                      <th className="px-6 py-4 text-sm font-semibold text-orange-400 text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamsData.map((team, index) => (
                      <tr
                        key={index}
                        className={`border-t border-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700/50"} hover:bg-gray-700 transition-colors`}
                      >
                        <td className="px-6 py-4 font-medium">
                          {index === 0 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-500 text-gray-900 rounded-full font-bold text-sm">
                              1
                            </span>
                          )}
                          {index === 1 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 text-gray-900 rounded-full font-bold text-sm">
                              2
                            </span>
                          )}
                          {index === 2 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-700 text-white rounded-full font-bold text-sm">
                              3
                            </span>
                          )}
                          {index > 2 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-600 text-white rounded-full font-bold text-sm">
                              {index + 1}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-semibold">{team.teamName}</td>
                        <td className="px-6 py-4 text-center">{team.numberOfPlays}</td>
                        <td className="px-6 py-4 text-center text-green-400 font-medium">{team.numberOfWins}</td>
                        <td className="px-6 py-4 text-center text-red-400 font-medium">{team.numberOfLosses}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-bold text-lg text-orange-400">{team.points}</span>
                        </td>
                      </tr>
                    ))}

                    {teamsData.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                          No standings data available for this tournament.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Points System:</h3>
            <p className="text-xs text-gray-400">Win = 3 points | Loss = 0 points</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Standings