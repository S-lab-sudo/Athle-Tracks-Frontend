import { useState } from "react";
import { GiBasketballBall, GiWhistle } from "react-icons/gi";
import { IoStatsChart, IoTrophyOutline } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const MatchDetails = ({
  team1,
  points1,
  team2,
  points2,
  players1,
  players2,
  team1Logo,
  team2Logo,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const team1Won = points1 > points2;
  const team2Won = points2 > points1;

  // Find top performers
  const getTopScorer = (players) => {
    return players.reduce(
      (max, player) => (player.points > max.points ? player : max),
      players[0]
    );
  };

  const getTopAssister = (players) => {
    return players.reduce(
      (max, player) => (player.assists > max.assists ? player : max),
      players[0]
    );
  };

  const getTopRebounder = (players) => {
    return players.reduce(
      (max, player) => (player.rebounds > max.rebounds ? player : max),
      players[0]
    );
  };

  const team1TopScorer = getTopScorer(players1);
  const team2TopScorer = getTopScorer(players2);
  const team1TopAssister = getTopAssister(players1);
  const team2TopAssister = getTopAssister(players2);
  const team1TopRebounder = getTopRebounder(players1);
  const team2TopRebounder = getTopRebounder(players2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="container w-[85vw] mx-auto px-0 py-9">
        {/* Match Header */}
        <div className="bg-gray-800 rounded-lg shadow-xl md:p-6 p-2 mb-8 border border-orange-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <span className="text-sm text-orange-400 mb-2">
                BASKETBALL MATCH DETAILS
              </span>
              <div className="flex items-center">
                <GiWhistle className="text-orange-500 mr-2" />
                <h1 className="text-2xl font-bold">Match Summary</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <IoTrophyOutline className="text-yellow-500 text-xl" />
              <span className="text-sm text-gray-300">Final Result</span>
            </div>
          </div>

          {/* Teams and Score */}
          <div className="mt-8 flex md:flex-row justify-between items-top">
            {/* Team 1 */}
            <div className={`flex flex-col items-center`}>
              <div
                className={`h-24 w-24 border-4 ${
                  team1Won ? "border-green-500" : "border-gray-600"
                } rounded-full flex items-center justify-center bg-gray-700 mb-3 shadow-lg`}
              >
                <span>
                  <img
                    src={`${team1Logo}`}
                    alt={`${team1} logo`}
                    className="h-20 w-20 rounded-full"
                  />
                </span>
              </div>
              <span className="md:text-xl text-base font-bold mb-1">{team1}</span>
              <div
                className={`md:text-4xl text-xl font-bold ${
                  team1Won ? "text-green-400" : "text-white"
                }`}
              >
                {points1}
              </div>
              {team1Won && (
                <div className="mt-2 px-3 py-1 bg-green-900/40 rounded-full text-green-400 text-sm font-semibold">
                  WINNER
                </div>
              )}
            </div>

            {/* VS */}
            <div className="flex flex-col items-center my-6 md:my-0">
              <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center shadow-lg">
                <GiBasketballBall className="text-white text-2xl" />
              </div>
              <div className="mt-3 text-sm text-gray-400">Match Completed</div>
            </div>

            {/* Team 2 */}
            <div className={`flex flex-col items-center`}>
              <div
                className={`h-24 w-24 border-4 ${
                  team2Won ? "border-green-500" : "border-gray-600"
                } rounded-full flex items-center justify-center bg-gray-700 mb-3 shadow-lg`}
              >
                <span>
                  <img
                    src={`${team2Logo}`}
                    alt={`${team2} logo`}
                    className="h-20 w-20 rounded-full"
                  />
                </span>
              </div>
              <span className="md:text-xl text-base font-bold mb-1">{team2}</span>
              <div
                className={`md:text-4xl text-xl font-bold ${
                  team2Won ? "text-green-400" : "text-white"
                }`}
              >
                {points2}
              </div>
              {team2Won && (
                <div className="mt-2 px-3 py-1 bg-green-900/40 rounded-full text-green-400 text-sm font-semibold">
                  WINNER
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-orange-500/30">
          <div className="flex items-center mb-6">
            <FaChartLine className="text-orange-500 mr-2" />
            <h2 className="text-xl font-bold">Top Performers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Scorers */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-orange-400 text-sm mb-3 font-medium">
                TOP SCORERS
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                    {team1TopScorer.jerseyNumber}
                  </div>
                  <div>
                    <Link to={`/player/${team1TopScorer.player_id}`}>
                      <p className="font-semibold">
                        {team1TopScorer.player_name}
                      </p>
                    </Link>

                    <p className="text-xs text-gray-400">{team1}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {team1TopScorer.points}
                </div>
              </div>

              <div className="w-full h-px bg-gray-600 my-3"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                    {team2TopScorer.jerseyNumber}
                  </div>
                  <div>
                    <Link to={`/player/${team2TopScorer.player_id}`}>
                      <p className="font-semibold">
                        {team2TopScorer.player_name}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-400">{team2}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-400">
                  {team2TopScorer.points}
                </div>
              </div>
            </div>

            {/* Top Assisters */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-orange-400 text-sm mb-3 font-medium">
                TOP ASSISTERS
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                    {team1TopAssister.jerseyNumber}
                  </div>
                  <div>
                    <Link to={`/player/${team1TopAssister.player_id}`}>
                    <p className="font-semibold">
                      {team1TopAssister.player_name}
                    </p>
                    </Link>
                    <p className="text-xs text-gray-400">{team1}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {team1TopAssister.assists}
                </div>
              </div>

              <div className="w-full h-px bg-gray-600 my-3"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                    {team2TopAssister.jerseyNumber}
                  </div>
                  <div>
                    <Link to={`/player/${team2TopAssister.player_id}`}>
                    <p className="font-semibold">
                      {team2TopAssister.player_name}
                    </p>
                    </Link>
                    <p className="text-xs text-gray-400">{team2}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {team2TopAssister.assists}
                </div>
              </div>
            </div>

            {/* Top Rebounders */}
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-orange-400 text-sm mb-3 font-medium">
                TOP REBOUNDERS
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                    {team1TopRebounder.jerseyNumber}
                  </div>
                  <div>
                    <Link to={`/player/${team1TopRebounder.player_id}`}>
                    <p className="font-semibold">
                      {team1TopRebounder.player_name}
                    </p>
                    </Link>
                    <p className="text-xs text-gray-400">{team1}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {team1TopRebounder.rebounds}
                </div>
              </div>

              <div className="w-full h-px bg-gray-600 my-3"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                    {team2TopRebounder.jerseyNumber}
                  </div>
                  <div>
                    <Link to={`/player/${team2TopRebounder.player_id}`}>
                    <p className="font-semibold">
                      {team2TopRebounder.player_name}
                    </p>
                    </Link>
                    <p className="text-xs text-gray-400">{team2}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {team2TopRebounder.rebounds}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Stats Tabs */}
        <div className="bg-gray-800 rounded-lg shadow-xl border border-orange-500/30 overflow-hidden">
          <div className="bg-gray-900 p-4 border-b border-gray-700">
            <div className="flex items-center mb-4">
              <IoStatsChart className="text-orange-500 mr-2" />
              <h2 className="text-xl font-bold">Player Statistics</h2>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "all"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                All Players
              </button>
              <button
                onClick={() => setActiveTab("team1")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "team1"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {team1}
              </button>
              <button
                onClick={() => setActiveTab("team2")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "team2"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {team2}
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="overflow-x-auto">
              {/* Team 1 Table */}
              {(activeTab === "all" || activeTab === "team1") && (
                <div className="mb-6">
                  {activeTab === "all" && (
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">
                      {team1} Players
                    </h3>
                  )}
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-900">
                        <th className="p-3 text-left border-b border-gray-700">
                          Name
                        </th>
                        <th className="p-3 text-center border-b border-gray-700">
                          Points
                        </th>
                        <th className="p-3 text-center border-b border-gray-700">
                          Assists
                        </th>
                        <th className="p-3 text-center border-b border-gray-700">
                          Rebounds
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {players1.map((player, index) => (
                        <tr
                          key={index}
                          className={`
                            ${
                              index % 2 === 0 ? "bg-gray-800" : "bg-gray-700/50"
                            } 
                            hover:bg-gray-600 transition-colors
                          `}
                        >
                          <td className="p-3 border-b border-gray-700">
                            <Link
                              to={`/player/${player.player_id}`}
                              className="flex items-center"
                            >
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                                  {player.jerseyNumber}
                                </div>
                                {player.player_name}
                                {player === team1TopScorer && (
                                  <span className="ml-2 px-2 py-0.5 bg-yellow-900/40 text-yellow-400 text-xs rounded-full">
                                    Top Scorer
                                  </span>
                                )}
                                {player === team1TopAssister && (
                                  <span className="ml-2 px-2 py-0.5 bg-blue-900/40 text-blue-400 text-xs rounded-full">
                                    Top Assister
                                  </span>
                                )}
                                {player === team1TopRebounder && (
                                  <span className="ml-2 px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded-full">
                                    Top Rebounder
                                  </span>
                                )}
                              </div>
                            </Link>
                          </td>
                          <td className="p-3 text-center border-b border-gray-700">
                            <span
                              className={
                                player === team1TopScorer
                                  ? "text-yellow-400 font-bold"
                                  : ""
                              }
                            >
                              {player.points}
                            </span>
                          </td>
                          <td className="p-3 text-center border-b border-gray-700">
                            <span
                              className={
                                player === team1TopAssister
                                  ? "text-blue-400 font-bold"
                                  : ""
                              }
                            >
                              {player.assists}
                            </span>
                          </td>
                          <td className="p-3 text-center border-b border-gray-700">
                            <span
                              className={
                                player === team1TopRebounder
                                  ? "text-green-400 font-bold"
                                  : ""
                              }
                            >
                              {player.rebounds}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Team 2 Table */}
              {(activeTab === "all" || activeTab === "team2") && (
                <div>
                  {activeTab === "all" && (
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">
                      {team2} Players
                    </h3>
                  )}
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-900">
                        <th className="p-3 text-left border-b border-gray-700">
                          Name
                        </th>
                        <th className="p-3 text-center border-b border-gray-700">
                          Points
                        </th>
                        <th className="p-3 text-center border-b border-gray-700">
                          Assists
                        </th>
                        <th className="p-3 text-center border-b border-gray-700">
                          Rebounds
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {players2.map((player, index) => (
                        <tr
                          key={index}
                          className={`
                            ${
                              index % 2 === 0 ? "bg-gray-800" : "bg-gray-700/50"
                            } 
                            hover:bg-gray-600 transition-colors
                          `}
                        >
                          <td className="p-3 border-b border-gray-700">
                            <Link
                              to={`/player/${player.player_id}`}
                              className="flex items-center"
                            >
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                                  {player.jerseyNumber}
                                </div>
                                {player.player_name}
                                {player === team2TopScorer && (
                                  <span className="ml-2 px-2 py-0.5 bg-yellow-900/40 text-yellow-400 text-xs rounded-full">
                                    Top Scorer
                                  </span>
                                )}
                                {player === team2TopAssister && (
                                  <span className="ml-2 px-2 py-0.5 bg-blue-900/40 text-blue-400 text-xs rounded-full">
                                    Top Assister
                                  </span>
                                )}
                                {player === team2TopRebounder && (
                                  <span className="ml-2 px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded-full">
                                    Top Rebounder
                                  </span>
                                )}
                              </div>
                            </Link>
                          </td>
                          <td className="p-3 text-center border-b border-gray-700">
                            <span
                              className={
                                player === team2TopScorer
                                  ? "text-yellow-400 font-bold"
                                  : ""
                              }
                            >
                              {player.points}
                            </span>
                          </td>
                          <td className="p-3 text-center border-b border-gray-700">
                            <span
                              className={
                                player === team2TopAssister
                                  ? "text-blue-400 font-bold"
                                  : ""
                              }
                            >
                              {player.assists}
                            </span>
                          </td>
                          <td className="p-3 text-center border-b border-gray-700">
                            <span
                              className={
                                player === team2TopRebounder
                                  ? "text-green-400 font-bold"
                                  : ""
                              }
                            >
                              {player.rebounds}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basketball decoration */}
        <div className="fixed -bottom-20 -left-20 opacity-10 pointer-events-none">
          <GiBasketballBall className="text-orange-500" size={200} />
        </div>
        <div className="fixed -top-20 -right-20 opacity-10 pointer-events-none">
          <GiBasketballBall className="text-orange-500" size={200} />
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
