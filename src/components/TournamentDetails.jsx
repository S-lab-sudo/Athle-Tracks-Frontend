import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../client";
import { LiaMedalSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Basketball="https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081601/basketball_pjr5pq.webp"
const box = {
  backgroundImage: `url(${Basketball})`,
  backgroundSize: "cover",
  width: "100px",
  height: "100px",
  borderRadius: "100%",
};

const TournamentDetails = () => {
  const Court="https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081604/Court_fa3s9k.avif"
  const { id } = useParams();
  const [tournamentData, setTournamentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    apiClient
      .get(`/tournaments/${id}/`)
      .then((response) => {
        console.log(response.data);
        setTournamentData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tournament data:", error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!tournamentData) {
    return (
      <div className="h-full bg-black text-white flex justify-center items-center ">
        {" "}
        No tournament data available
      </div>
    );
  }
  const posterImageFilename = tournamentData.posterImage;
  const posterImagePath = `${posterImageFilename}`;
  return (
    <div className="h-full">
      <div className="absolute w-full h-[100vh]">
        <img
          src={Court || "/placeholder.svg"}
          alt="Landing Page"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="absolute z-30 top-20 flex justify-between items-center w-full px-1 py-10 md:px-16 md:py-12">
        {/* Tournament Details Card */}
        <div className="md:w-[55%] w-[70%]">
          <div className="bg-black bg-opacity-80 rounded-lg shadow-lg p-5 border border-orange-500/30">
            <div className="space-y-5">
              {/* Tournament Name */}
              <div className="border-b border-orange-500/30 pb-3">
                <h1 className="font-bold text-3xl tracking-wider text-white">
                  {tournamentData.name}
                </h1>
                <p className="text-orange-400 mt-1">
                  Organized by:{" "}
                  <span className="font-semibold">
                    {tournamentData.organizer.name}
                  </span>
                </p>
              </div>

              {/* Prize Pool Section */}
              <div className="space-y-3">
                <div className="bg-orange-500/20 p-3 rounded-lg flex justify-between">
                  <h2 className="text-xl font-bold text-white">Prize Pool:</h2>
                  <h2 className="text-xl font-bold text-white">
                    NPR{" "}
                    {Number(tournamentData.prizePool.firstPrize) +
                      Number(tournamentData.prizePool.secondPrize) +
                      Number(tournamentData.prizePool.thirdPrize) +
                      Number(tournamentData.prizePool.mvp)}
                  </h2>
                </div>

                <div className="space-y-2">
                  <ul className="space-y-2">
                    {/* First Prize */}
                    <li className="flex justify-between items-center border-b border-gray-700 pb-1">
                      <span className="text-white text-lg flex items-center gap-1">
                        <LiaMedalSolid className="text-yellow-500" size={20} />
                        1st Position:
                      </span>
                      <span className="font-bold text-yellow-400 text-lg">
                        NPR {tournamentData.prizePool.firstPrize}
                      </span>
                    </li>

                    {/* Second Prize */}
                    <li className="flex justify-between items-center border-b border-gray-700 pb-1">
                      <span className="text-white text-md flex items-center gap-1">
                        <LiaMedalSolid className="text-gray-400" size={18} />
                        2nd Position:
                      </span>
                      <span className="font-bold text-gray-300 text-md">
                        NPR {tournamentData.prizePool.secondPrize}
                      </span>
                    </li>

                    {/* Third Prize */}
                    <li className="flex justify-between items-center border-b border-gray-700 pb-1">
                      <span className="text-white text-md flex items-center gap-1">
                        <LiaMedalSolid className="text-[#D2B48C]" size={16} />
                        3rd Position:
                      </span>
                      <span className="font-bold text-[#D2B48C] text-md">
                        NPR {tournamentData.prizePool.thirdPrize}
                      </span>
                    </li>

                    {/* MVP Prizes */}
                    <li className="flex justify-between items-center border-b border-gray-700 pb-1">
                      <span className="text-white text-md">
                        Tournament MVP:
                      </span>
                      <span className="font-bold text-orange-400 text-md">
                        NPR {tournamentData.prizePool.mvp}
                      </span>
                    </li>

                    <li className="flex justify-between items-center">
                      <span className="text-white text-md">Entry Fee :</span>
                      <span className="font-bold text-orange-300 text-md">
                        NPR {tournamentData.prizePool.entryFee}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tournament Details */}
              <div className="pt-1 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-white text-md flex items-center gap-1">
                      <span className="text-orange-400">📍</span> Location:{" "}
                      {tournamentData.location}
                    </p>
                    <p className="text-white text-md flex items-center gap-1">
                      <span className="text-orange-400">📅</span> Game Starts
                      On:{" "}
                      {new Date(tournamentData.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="h-20 w-20 rounded-full">
                    <img
                      src={`${posterImageFilename}`}
                      alt="Tournament Poster"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <Link to={`/registerteam/${tournamentData._id}`}>
                <button className="w-full hover:cursor-pointer py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-300 text-md mt-1">
                  Register Your Team
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Basketball Animation */}
        <div className="flex justify-center items-center space-y-10 w-[30%] md:w-[45%]">
          <motion.div
            animate={{
              y: [-300, 0, -150, 0, -75, 0, -50, 0, -25, 0, -10, 0], // Bouncing effect
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
            style={{
              ...box,
              boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.5)",
            }}
          />
        </div>
      </div>
      {/* <div className="absolute top-0 w-full z-40">
         <FillerComponent/>
         </div> */}
    </div>
  );
};

export default TournamentDetails;
