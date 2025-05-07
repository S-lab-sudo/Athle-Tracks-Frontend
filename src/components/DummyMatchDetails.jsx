import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchDetails from "./MatchDetails";
import GraphicalStats from "./GraphicalStats";
import apiClient from "../client";

const DummyMatchDetails = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await apiClient.get(`/match/matches/${matchId}/`);
        const { data } = response;

        const transformedData = {
          team1: data.team_1.team_details.name,
          team1Logo: data.team_1.team_details.logo,
          team1Score: data.team1Score,
          team2: data.team_2.team_details.name,
          team2Logo: data.team_2.team_details.logo,
          team2Score: data.team2Score,
          mvp: data.mvp?.name || "N/A",
          playerStats: data.player_stats.map(stat => ({
            ...stat,
            player_image: stat.player_id.image,
            jerseyNumber: stat.player_id.jerseyNumber,
            player_name: stat.player_id.name,
            team_id: stat.team_id
          }))
        };

        setMatchData(transformedData);
      } catch (error) {
        console.error("Error fetching match details:", error);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (!matchData) return <div className="...">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div>
        <MatchDetails
          team1={matchData.team1}
          team1Logo={matchData.team1Logo}
          points1={matchData.team1Score}
          team2={matchData.team2}
          team2Logo={matchData.team2Logo}
          points2={matchData.team2Score}
          mvpFromDatabase={matchData.mvp}
          players1={matchData.playerStats.filter(
            player => player.team_id === matchData.team1
          )}
          players2={matchData.playerStats.filter(
            player => player.team_id === matchData.team2
          )}
        />
        <GraphicalStats
          team1Logo={matchData.team1Logo}
          team2Logo={matchData.team2Logo}
          {...matchData}
        />
      </div>
    </div>
  );
};

export default DummyMatchDetails;