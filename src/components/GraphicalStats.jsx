import { useState, useEffect } from "react";
import { IoStatsChart, IoBasketballOutline } from "react-icons/io5";
import { FaChartBar, FaChartLine } from "react-icons/fa";
import { GiBasketballBall, GiBasketballJersey } from "react-icons/gi";

const GraphicalStats = ({
  team1Logo,
  team2Logo,
  team1,
  team2,
  team1Score,
  team2Score,
  playerStats,
}) => {
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Calculate statistics
  const totalPoints = team1Score + team2Score;

  const team1Players = playerStats.filter((player) => player.team_id === team1);
  const team2Players = playerStats.filter((player) => player.team_id === team2);

  const totalRebounds1 = team1Players.reduce(
    (acc, player) => acc + player.rebounds,
    0
  );
  const totalRebounds2 = team2Players.reduce(
    (acc, player) => acc + player.rebounds,
    0
  );
  const totalRebounds = totalRebounds1 + totalRebounds2;

  const totalAssists1 = team1Players.reduce(
    (acc, player) => acc + player.assists,
    0
  );
  const totalAssists2 = team2Players.reduce(
    (acc, player) => acc + player.assists,
    0
  );
  const totalAssists = totalAssists1 + totalAssists2;

  // Calculate field goal percentages
  const totalFGAttempts1 = team1Players.reduce(
    (acc, player) => acc + (player.fg_attempts || 20),
    0
  );
  const totalFGMade1 = team1Players.reduce(
    (acc, player) => acc + (player.fg_made || 8),
    0
  );
  const totalFGAttempts2 = team2Players.reduce(
    (acc, player) => acc + (player.fg_attempts || 18),
    0
  );
  const totalFGMade2 = team2Players.reduce(
    (acc, player) => acc + (player.fg_made || 7),
    0
  );

  const fgPercentage1 = (totalFGMade1 / totalFGAttempts1) * 100;
  const fgPercentage2 = (totalFGMade2 / totalFGAttempts2) * 100;

  // Calculate percentages for visualization
  const team1PointsPercentage = (team1Score / totalPoints) * 100;
  const team2PointsPercentage = (team2Score / totalPoints) * 100;

  const team1ReboundsPercentage = (totalRebounds1 / totalRebounds) * 100;
  const team2ReboundsPercentage = (totalRebounds2 / totalRebounds) * 100;

  const team1AssistsPercentage = (totalAssists1 / totalAssists) * 100;
  const team2AssistsPercentage = (totalAssists2 / totalAssists) * 100;

  // Stats categories
  const statsCategories = [
    {
      name: "Points",
      team1Value: team1Score,
      team2Value: team2Score,
      team1Percentage: team1PointsPercentage,
      team2Percentage: team2PointsPercentage,
      icon: <IoBasketballOutline />,
      color1: "from-orange-600 to-orange-400",
      color2: "from-blue-600 to-blue-400",
    },
    {
      name: "Rebounds",
      team1Value: totalRebounds1,
      team2Value: totalRebounds2,
      team1Percentage: team1ReboundsPercentage,
      team2Percentage: team2ReboundsPercentage,
      icon: <FaChartBar />,
      color1: "from-green-600 to-green-400",
      color2: "from-teal-600 to-teal-400",
    },
    {
      name: "Assists",
      team1Value: totalAssists1,
      team2Value: totalAssists2,
      team1Percentage: team1AssistsPercentage,
      team2Percentage: team2AssistsPercentage,
      icon: <FaChartLine />,
      color1: "from-purple-600 to-purple-400",
      color2: "from-pink-600 to-pink-400",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-orange-500/30 w-full max-w-4xl mx-auto my-8">
      <div className="flex items-center mb-6">
        <GiBasketballBall className="text-orange-500 mr-2 text-xl" />
        <h2 className="text-xl font-bold text-white">
          Match Statistics Comparison
        </h2>
      </div>

      {/* Team Headers */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center shadow-lg mr-3">
            <img className="rounded-full"
              src={`${team1Logo}`}
              alt={"Team 1 Logo"}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{team1}</h3>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <h3 className="text-lg font-bold text-white text-right">{team2}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg ml-3">
          <img className="rounded-full"
                src={`${team2Logo}`}
                alt={"Team 1 Logo"}
              />
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="space-y-8">
        {statsCategories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-300">
                  {category.name}
                </span>
              </div>
              <div className="flex space-x-8">
                <span className="text-sm font-bold text-white">
                  {category.team1Value}
                </span>
                <span className="text-sm font-bold text-white">
                  {category.team2Value}
                </span>
              </div>
            </div>

            <div className="relative h-8 bg-gray-700 rounded-lg overflow-hidden">
              {/* Team 1 Bar */}
              <div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.color1} rounded-l-lg transition-all duration-1000 ease-out`}
                style={{
                  width: animateChart ? `${category.team1Percentage}%` : "0%",
                  opacity: 0.9,
                }}
              >
                <div className="absolute top-0 right-2 h-full flex items-center">
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    {category.team1Percentage > 15 &&
                      `${Math.round(category.team1Percentage)}%`}
                  </span>
                </div>
              </div>

              {/* Team 2 Bar */}
              <div
                className={`absolute top-0 right-0 h-full bg-gradient-to-l ${category.color2} rounded-r-lg transition-all duration-1000 ease-out`}
                style={{
                  width: animateChart ? `${category.team2Percentage}%` : "0%",
                  opacity: 0.9,
                }}
              >
                <div className="absolute top-0 left-2 h-full flex items-center">
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    {category.team2Percentage > 15 &&
                      `${Math.round(category.team2Percentage)}%`}
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-orange-400 mb-3">
            TEAM PERFORMANCE
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Points in Paint</span>
              <div className="flex space-x-4">
                <span className="text-sm font-bold text-white">
                  {Math.round(team1Score * 0.42)}
                </span>
                <span className="text-sm font-bold text-white">
                  {Math.round(team2Score * 0.38)}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Fast Break Points</span>
              <div className="flex space-x-4">
                <span className="text-sm font-bold text-white">
                  {Math.round(team1Score * 0.15)}
                </span>
                <span className="text-sm font-bold text-white">
                  {Math.round(team2Score * 0.18)}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">
                Second Chance Points
              </span>
              <div className="flex space-x-4">
                <span className="text-sm font-bold text-white">
                  {Math.round(team1Score * 0.12)}
                </span>
                <span className="text-sm font-bold text-white">
                  {Math.round(team2Score * 0.09)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-orange-400 mb-3">
            SHOOTING EFFICIENCY
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">3PT Made-Attempts</span>
              <div className="flex space-x-4">
                <span className="text-sm font-bold text-white">
                  {Math.round(team1Score * 0.09)}-
                  {Math.round(team1Score * 0.24)}
                </span>
                <span className="text-sm font-bold text-white">
                  {Math.round(team2Score * 0.11)}-
                  {Math.round(team2Score * 0.27)}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Free Throws</span>
              <div className="flex space-x-4">
                <span className="text-sm font-bold text-white">
                  {Math.round(team1Score * 0.18)}-
                  {Math.round(team1Score * 0.22)}
                </span>
                <span className="text-sm font-bold text-white">
                  {Math.round(team2Score * 0.16)}-
                  {Math.round(team2Score * 0.21)}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Turnovers</span>
              <div className="flex space-x-4">
                <span className="text-sm font-bold text-white">
                  {Math.round(team1Score * 0.08)}
                </span>
                <span className="text-sm font-bold text-white">
                  {Math.round(team2Score * 0.09)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex flex-wrap justify-center gap-4">
          {statsCategories.map((category, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color1} mr-1`}
              ></div>
              <span className="text-xs text-gray-400 mr-2">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Default props for development and testing
// GraphicalStats.defaultProps = {
//   team1: "Team A",
//   team2: "Team B",
//   team1Score: 85,
//   team2Score: 78,
//   playerStats: [
//     // Team 1 players
//     {
//       player_id: 1,
//       team_id: "Team A",
//       player_name: "John Smith",
//       points: 22,
//       assists: 5,
//       rebounds: 3,
//       fg_made: 8,
//       fg_attempts: 15,
//     },
//     {
//       player_id: 2,
//       team_id: "Team A",
//       player_name: "Michael Johnson",
//       points: 18,
//       assists: 7,
//       rebounds: 2,
//       fg_made: 7,
//       fg_attempts: 14,
//     },
//     {
//       player_id: 3,
//       team_id: "Team A",
//       player_name: "David Williams",
//       points: 15,
//       assists: 3,
//       rebounds: 8,
//       fg_made: 6,
//       fg_attempts: 12,
//     },
//     {
//       player_id: 4,
//       team_id: "Team A",
//       player_name: "Robert Brown",
//       points: 12,
//       assists: 2,
//       rebounds: 5,
//       fg_made: 5,
//       fg_attempts: 11,
//     },
//     {
//       player_id: 5,
//       team_id: "Team A",
//       player_name: "James Davis",
//       points: 10,
//       assists: 4,
//       rebounds: 4,
//       fg_made: 4,
//       fg_attempts: 9,
//     },
//     {
//       player_id: 6,
//       team_id: "Team A",
//       player_name: "Daniel Miller",
//       points: 8,
//       assists: 1,
//       rebounds: 6,
//       fg_made: 3,
//       fg_attempts: 8,
//     },

//     // Team 2 players
//     {
//       player_id: 7,
//       team_id: "Team B",
//       player_name: "William Wilson",
//       points: 24,
//       assists: 3,
//       rebounds: 4,
//       fg_made: 9,
//       fg_attempts: 17,
//     },
//     {
//       player_id: 8,
//       team_id: "Team B",
//       player_name: "Thomas Moore",
//       points: 16,
//       assists: 8,
//       rebounds: 2,
//       fg_made: 6,
//       fg_attempts: 13,
//     },
//     {
//       player_id: 9,
//       team_id: "Team B",
//       player_name: "Christopher Taylor",
//       points: 14,
//       assists: 4,
//       rebounds: 7,
//       fg_made: 5,
//       fg_attempts: 11,
//     },
//     {
//       player_id: 10,
//       team_id: "Team B",
//       player_name: "Joseph Anderson",
//       points: 10,
//       assists: 2,
//       rebounds: 9,
//       fg_made: 4,
//       fg_attempts: 10,
//     },
//     {
//       player_id: 11,
//       team_id: "Team B",
//       player_name: "Charles Jackson",
//       points: 8,
//       assists: 5,
//       rebounds: 3,
//       fg_made: 3,
//       fg_attempts: 8,
//     },
//     {
//       player_id: 12,
//       team_id: "Team B",
//       player_name: "Matthew White",
//       points: 6,
//       assists: 2,
//       rebounds: 5,
//       fg_made: 2,
//       fg_attempts: 7,
//     },
//   ],
// };

export default GraphicalStats;
