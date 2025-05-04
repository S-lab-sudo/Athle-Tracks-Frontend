"use client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GiBasketballBall } from "react-icons/gi"
import NavBar from "./NavBar" // Assuming you have a NavBar component
import apiClient from "../client"

const PlayerDetails = () => {
  const { id } = useParams()
  const [playerData, setPlayerData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch player details using the id
  useEffect(() => {
    apiClient
      .get(`/player/getPlayerById/${id}`)
      .then((response) => {
        let matchHistoryLength = response.data.match_history.filter(
          (match) => match.notplayed === "played"
        ).length;
        
        response.data.averagePoints = response.data.total_points / matchHistoryLength;
        response.data.averageAssists = response.data.total_assists / matchHistoryLength;
        response.data.averageRebounds = response.data.total_rebounds / matchHistoryLength;
        console.log(response.data)
        setPlayerData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching player details:", error)
        setLoading(false)
      })
  }, [id])
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  // Function to get the player's team name from the nested data
  const getPlayerTeamName = () => {
    if (!playerData || !playerData.match_history || playerData.match_history.length === 0) {
      return "Not Available"
    }

    const matchHistory = playerData.match_history[0]
    const playerTeamId = matchHistory.team_id

    // Check if match_id contains team data
    if (matchHistory.match_id && matchHistory.match_id.team_1 && matchHistory.match_id.team_2) {
      // Check which team the player belongs to
      if (matchHistory.match_id.team_1._id === playerTeamId) {
        return matchHistory.match_id.team_1.team_details.name
      } else if (matchHistory.match_id.team_2._id === playerTeamId) {
        return matchHistory.match_id.team_2.team_details.name
      }
    }

    return "Not Available"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <GiBasketballBall className="text-orange-500 text-5xl mx-auto" />
          <p className="text-white mt-4 text-xl">Loading player details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-fit bg-gradient-to-b from-gray-900 to-black text-white">
      <NavBar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Player Details Card */}
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-orange-500/30">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Player Info - Left Side */}
              <div className="flex-1 text-center md:text-left order-2 md:order-1">
                <h1 className="text-3xl font-bold text-white mb-4">{playerData.name}</h1>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-sm">Age</p>
                    <p className="font-semibold text-lg">{playerData.age===0?"NA":playerData.age}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-sm">Height</p>
                    <p className="font-semibold text-lg">{playerData.height===0?"NA":playerData.height} cm</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-sm">Weight</p>
                    <p className="font-semibold text-lg">{playerData.weight===0?"NA":playerData.weight} kg</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Average Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{playerData.averagePoints?.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{playerData.averageAssists?.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">Assists</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{playerData.averageRebounds?.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">Rebounds</div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  <p>Team Name: {getPlayerTeamName()}</p>
                </div>
              </div>

              {/* Player Image - Right Side */}
              <div className="order-1 md:order-2">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
                  <img
                    src={
                      `${playerData.image}` ||
                      "/placeholder.svg?height=200&width=200"
                    }
                    alt={playerData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerDetails
