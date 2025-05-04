import { Link } from "react-router-dom";
import { GiBasketballBall } from "react-icons/gi";

const MatchCard = ({
  time,
  location,
  playerStats,
  team1,
  team1Logo,
  team2,
  team2Logo,
  score1,
  score2,
  matchId,
}) => {
  const team1Won = score1 > score2;
  const team2Won = score2 > score1;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Basketball Match</h3>
          <div className="flex items-center">
            <GiBasketballBall className="text-orange-500 mr-2" />
            <span className="text-sm text-gray-300">{ playerStats.length>0? "Final Score"  : time} </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-around items-center">
          {/* Team 1 */}
          <div
            className={`flex flex-col items-center ${
              team1Won ? "text-green-400" : "text-white"
            }`}
          >
            <div className="h-20 w-20 border-2 border-gray-600 rounded-full flex items-center justify-center bg-gray-700 mb-2">
              <span className="text-lg font-bold">
                {team1Logo ? (
                  <img
                    src={`${team1Logo}`}
                    alt={`${team1} logo`}
                    className="h-16 w-16 rounded-full"
                  />
                ) : (
                  <GiBasketballBall className="text-white" />
                )}
              </span>
            </div>
            <span
              className={`md:text-xl font-bold text-base ${
                team1Won ? "text-green-400" : "text-white"
              }`}
            >
              {team1Won && (
                <span className="text-xs bg-green-900 px-2 py-1 rounded mr-1">
                  WIN
                </span>
              )}
              {team1}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-4">
          {playerStats.length > 0 && (
              <span
                className={`md:text-3xl text-xl font-bold ${
                  team1Won ? "text-green-400" : "text-white"
                }`}
              >
                {score1}
              </span>
            )}
            <div className="flex flex-col items-center mx-2">
              <span className="text-gray-400 text-lg">-</span>
              <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center my-2">
                <GiBasketballBall className="text-white" />
              </div>
              <span className="text-xs text-gray-400">VS</span>
            </div>
            {playerStats.length > 0 && (
              <span
                className={`md:text-3xl text-xl font-bold ${
                  team2Won ? "text-green-400" : "text-white"
                }`}
              >
                {score2}
              </span>
            )}
          </div>

          {/* Team 2 */}
          <div
            className={`flex flex-col items-center ${
              team2Won ? "text-green-400" : "text-white"
            }`}
          >
            <div className="h-20 w-20 border-2 border-gray-600 rounded-full flex items-center justify-center bg-gray-700 mb-2">
              <span className="text-lg font-bold">
                {team2Logo ? (
                  <img
                    src={`${team2Logo}`}
                    alt={`${team2} logo`}
                    className="h-16 w-16 rounded-full"
                  />
                ) : (
                  <GiBasketballBall className="text-white" />
                )}
              </span>
            </div>
            <span
              className={`md:text-xl font-bold text-base ${
                team2Won ? "text-green-400" : "text-white"
              }`}
            >
              {team2}
              {team2Won && (
                <span className="text-xs bg-green-900 px-2 py-1 rounded ml-1">
                  WIN
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 px-4 py-3 flex justify-between items-center">
        <span className="text-sm text-gray-400">
        {
            playerStats.length>0?
            <div>
              Point Difference : 
              {Math.abs(score1 - score2)}
            </div>
            :`Location : ${location}`
          } 
        </span>
        {playerStats.length > 0 ? (
          <Link
            to={`/MatchDetails/${matchId}`}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-300"
          >
            View Details
          </Link>
        ):(
          <Link
            to={`/ViewPlayers/${matchId}`}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-300"
          >
            View Players
          </Link>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
