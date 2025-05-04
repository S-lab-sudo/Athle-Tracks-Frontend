"use client";
import { useState, useEffect } from "react";
import { aboutusData } from "./dummydata";
import { GiBasketballBall } from "react-icons/gi";


const AboutUs = () => {
  const AdeshShahi ="https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081614/AdeshShahi_ptuurg.jpg"
  const Adarsha = "https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081611/Adarsha_qlqhm9.jpg"
  const Santosh ="https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081607/Santosh_lcbelb.jpg"
  const Bikesh = "https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081607/Bikesh_eqnw9n.jpg"
  const Logo ="https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081605/logo_dlugxj.png"

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const teamMembers = [
    {
      name: "Adesh Shahi",
      role: "Founder/Developer",
      image: AdeshShahi,
    },
    {
      name: "Santosh Jugjali",
      role: "Co-Founder/Developer",
      image: Santosh,
    },
    {
      name: "Adarsha Shahi",
      role: "Co-Founder",
      image: Adarsha,
    },
    {
      name: "Bikesh Shrestha",
      role: "Co-Founder/Designer",
      image: Bikesh,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-12">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Logo and About Section */}
        <div className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="relative mb-8 transform transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full opacity-50 animate-pulse"></div>
              <img src={Logo || "/placeholder.svg"} alt="Our Logo" className="relative h-48 w-48 object-contain" />
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-orange-500/30 max-w-4xl">
            <div className="space-y-6 text-justify md:text-justify">
            <p className="text-orange-300 md:text-xl text-md leading-relaxed">{aboutusData.firstParagraph}</p>
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                <p className="text-gray-300 md:text-xl text-md leading-relaxed">{aboutusData.secondParagraph}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* <div className="flex items-center mb-12">
            <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent to-orange-500"></div>
            <h2 className="px-6 text-3xl font-bold text-orange-400 flex items-center">
              <GiWhistle className="mr-3" />
              Our Team
            </h2>
            <div className="h-0.5 flex-grow bg-gradient-to-l from-transparent to-orange-500"></div>
          </div> */}

          {/* Founder Card */}
          {/* <div className="flex justify-center mb-16">
            <div className="bg-gray-800/70 rounded-xl shadow-xl border border-orange-500/30 p-6 max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/20 hover:shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 rounded-xl blur-sm opacity-20"></div>
                  <img
                    src={teamMembers[0].image || "/placeholder.svg"}
                    alt={teamMembers[0].name}
                    className="relative w-48 h-48 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">{teamMembers[0].name}</h3>
                  <p className="text-gray-300 text-lg mb-4">{teamMembers[0].role}</p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <button className="p-2 bg-gray-700 rounded-full hover:bg-orange-600 transition-colors">
                      <FaLinkedin className="text-white text-lg" />
                    </button>
                    <button className="p-2 bg-gray-700 rounded-full hover:bg-orange-600 transition-colors">
                      <FaTwitter className="text-white text-lg" />
                    </button>
                    <button className="p-2 bg-gray-700 rounded-full hover:bg-orange-600 transition-colors">
                      <FaEnvelope className="text-white text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Team Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.slice(1).map((member, index) => (
              <div
                key={index}
                className="bg-gray-800/70 rounded-xl shadow-xl border border-orange-500/30 p-6 flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/20 hover:shadow-lg"
                style={{ animationDelay: ${(index + 1) * 150}ms }}
              >
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-orange-500 rounded-xl blur-sm opacity-20"></div>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="relative w-40 h-40 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-orange-400 mb-1">{member.name}</h3>
                <p className="text-gray-300 mb-4">{member.role}</p>
                <div className="flex gap-3 mt-auto">
                  <button className="p-2 bg-gray-700 rounded-full hover:bg-orange-600 transition-colors">
                    <FaLinkedin className="text-white" />
                  </button>
                  <button className="p-2 bg-gray-700 rounded-full hover:bg-orange-600 transition-colors">
                    <FaTwitter className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div> */}
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
  );
};

export default AboutUs;