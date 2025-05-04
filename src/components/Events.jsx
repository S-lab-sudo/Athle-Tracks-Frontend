import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { GiBasketballBall } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";
import apiClient from "../client";
import { Link } from "react-router-dom";

const Events = () => {
  const [selectedTournament, setSelectedTournament] = useState("");
  const [selectedTournamentData, setselectedTournamentData] = useState("")
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allTournaments, setAllTournaments] = useState([]);
  const [groupedTournaments, setGroupedTournaments] = useState({});
  const [matches, setMatches] = useState([]);
  const [groupedMatches, setGroupedMatches] = useState({});
  const [visibleRange, setVisibleRange] = useState([0, 3]); // Tracks the visible range of dates

  // Fetch tournaments and matches
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await apiClient.get("/tournaments/");
        const tournaments = response.data.allTournaments;

        tournaments.sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );

        const grouped = tournaments.reduce((acc, tournament) => {
          const monthYear = dayjs(tournament.startDate).format("MMMM YYYY");
          if (!acc[monthYear]) {
            acc[monthYear] = [];
          }
          acc[monthYear].push(tournament);
          return acc;
        }, {});

        setAllTournaments(tournaments);
        setGroupedTournaments(grouped);

        const savedTournamentId = localStorage.getItem("selectedTournamentId");
        const savedDate = localStorage.getItem("selectedDate");

        if (savedTournamentId) {
          const restoredTournament = tournaments.find(
            (tournament) => tournament._id === savedTournamentId
          );
          if (restoredTournament) {
            setSelectedTournament(restoredTournament._id);
          } else if (tournaments.length > 0) {
            setSelectedTournament(tournaments[0]._id);
          }
        } else if (tournaments.length > 0) {
          setSelectedTournament(tournaments[0]._id);
        }

        if (savedDate) {
          setSelectedDate(savedDate);
        }
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch matches for the selected tournament
  useEffect(() => {
    const fetchMatches = async () => {
      if (!selectedTournament) return;

      setIsLoading(true);

      try {
        const selectedTournamentData = allTournaments.find(
          (tournament) => tournament._id === selectedTournament
        );
        setselectedTournamentData(selectedTournamentData)
        console.log(selectedTournamentData)

        if (
          selectedTournamentData &&
          selectedTournamentData.matches.length > 0
        ) {
          setMatches(selectedTournamentData.matches);

          const matchPromises = selectedTournamentData.matches.map((matchId) =>
            apiClient.get(`/match/matches/${matchId}`)
          );

          const responses = await Promise.all(matchPromises);
          const matchData = responses.map((res) => res.data);
          const enrichedMatchData = matchData.map((match) => {
            let team1Score = 0;
            let team2Score = 0;

            match.player_stats.forEach((playerStat) => {
              if (playerStat.team_id === match.team_1._id) {
                team1Score += playerStat.points;
              } else if (playerStat.team_id === match.team_2._id) {
                team2Score += playerStat.points;
              }
            });

            return {
              ...match,
              team1Score,
              team2Score,
            };
          });

          const grouped = enrichedMatchData.reduce((acc, match) => {
            const matchDate = dayjs(match.date).format("DD MMM YYYY");
            if (!acc[matchDate]) {
              acc[matchDate] = [];
            }
            acc[matchDate].push(match);
            return acc;
          }, {});

          const sortedGrouped = Object.keys(grouped)
            .sort((a, b) => new Date(a) - new Date(b))
            .reduce((acc, key) => {
              acc[key] = grouped[key];
              return acc;
            }, {});

          setGroupedMatches(sortedGrouped);
        } else {
          setMatches([]);
          setGroupedMatches({});
        }
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [selectedTournament]);
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  // Listen for tournament changes from NavBar
  useEffect(() => {
    const handleTournamentChange = () => {
      const newTournamentId = localStorage.getItem("selectedTournamentId");
      setSelectedTournament(newTournamentId);
    };

    window.addEventListener("tournamentChanged", handleTournamentChange);

    return () => {
      window.removeEventListener("tournamentChanged", handleTournamentChange);
    };
  }, []);

  // Save selected tournament and date to localStorage whenever they change
  useEffect(() => {
    if (selectedTournament) {
      localStorage.setItem("selectedTournamentId", selectedTournament);
    }
    if (selectedDate) {
      localStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedTournament, selectedDate]);

  const handleMatchSelect = (event) => {
    setSelectedTournament(event.target.value);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleLeftClick = () => {
    setVisibleRange(([start, end]) => [
      Math.max(0, start - 1),
      Math.max(3, end - 1),
    ]);
  };

  const handleRightClick = () => {
    setVisibleRange(([start, end]) => [
      Math.min(Object.keys(groupedMatches).length - 3, start + 1),
      Math.min(Object.keys(groupedMatches).length, end + 1),
    ]);
  };

  const visibleDates = Object.keys(groupedMatches).slice(
    visibleRange[0],
    visibleRange[1]
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8 border border-orange-500/30">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="w-full md:w-1/3">
                <label
                  htmlFor="tournament-select"
                  className="flex items-center mb-3 text-lg font-medium text-orange-300"
                >
                  Select Tournament:
                </label>
                <div className="relative">
                  <select
                    onChange={handleMatchSelect}
                    id="tournament-select"
                    value={selectedTournament}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
                  >
                    {Object.keys(groupedTournaments).map((monthYear) => (
                      <optgroup key={monthYear} label={monthYear}>
                        {groupedTournaments[monthYear].map((tournament) => (
                          <option key={tournament._id} value={tournament._id}>
                            {tournament.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <label className="flex items-center mb-3 text-lg font-medium text-orange-300">
                  <IoCalendarOutline className="mr-2 text-xl" />
                  Select Match Date:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLeftClick}
                    disabled={visibleRange[0] === 0}
                    className={`p-2 rounded-full ${
                      visibleRange[0] === 0
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    <FaChevronLeft />
                  </button>
                  <div className="grid grid-cols-3 gap-3 flex-grow">
                    {visibleDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => handleDateSelect(date)}
                        className={`md:px-4 px-3 md:py-3 py-2 md:text-base text-sm rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                          selectedDate === date
                            ? "bg-orange-600 text-white font-bold shadow-lg"
                            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleRightClick}
                    disabled={
                      visibleRange[1] >= Object.keys(groupedMatches).length
                    }
                    className={`p-2 rounded-full ${
                      visibleRange[1] >= Object.keys(groupedMatches).length
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
            {selectedTournamentData.league==="true"&&
              <div className="mt-4 text-sm text-gray-400">
              <Link to={`/standings/${selectedTournamentData._id}`}  className="text-base font-medium px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-300" > View Standings   </Link>
            </div>
            }
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent to-orange-500"></div>
                <h2 className="px-4 text-2xl font-bold text-orange-400">
                  Match Results
                </h2>
                <div className="h-0.5 flex-grow bg-gradient-to-l from-transparent to-orange-500"></div>
              </div>

              {selectedDate && groupedMatches[selectedDate] ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
                  {groupedMatches[selectedDate].map((match, index) => (
                    <div
                      key={index}
                      className="transform transition-all duration-300 hover:scale-105"
                    >
                      <MatchCard
                        time={match.time}
                        location={match.tournament_id.location}
                        playerStats={match.player_stats}
                        team1={match.team_1.team_details.name}
                        team2={match.team_2.team_details.name}
                        team1Logo={match.team_1.team_details.logo}
                        team2Logo={match.team_2.team_details.logo}
                        score1={match.team1Score}
                        score2={match.team2Score}
                        matchId={match._id}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                  <GiBasketballBall className="mx-auto text-5xl text-gray-600 mb-4" />
                  <p className="text-xl text-gray-400">
                    No matches found for the selected date and tournament.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="fixed -bottom-20 -left-20 opacity-10 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
      <div className="fixed -top-20 -right-20 opacity-10 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
    </div>
  );
};

export default Events;
