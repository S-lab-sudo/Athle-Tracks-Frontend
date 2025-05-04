import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import apiClient from "../client";

const NavBar = () => {
  const Logo="https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081605/logo2_oacvi0.png"
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch tournaments from the backend
  useEffect(() => {
    apiClient
      .get("/tournaments/")
      .then((response) => {
        setTournaments(response.data.allTournaments);
        setFilteredTournaments(response.data.allTournaments);
      })
      .catch((error) => {
        console.error("Error fetching tournament data:", error);
      });
  }, []);

  // Filter tournaments based on search input
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredTournaments(tournaments);
    } else {
      const filtered = tournaments.filter((tournament) =>
        tournament.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTournaments(filtered);
    }
  }, [searchText, tournaments]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchText("");
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle tournament selection
  const handleTournamentSelect = (tournament) => {
    localStorage.setItem("selectedTournament", tournament.name);
    localStorage.setItem("selectedTournamentId", tournament._id);
    const event = new Event("tournamentChanged");
    window.dispatchEvent(event);
    if (location.pathname !== "/events") {
      navigate("/events");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/95 shadow-lg" : "bg-[#00000050]"
      }`}
    >
      <nav className="container mx-auto py-3 px-4 md:px-6 lg:px-8 flex justify-between items-center w-full backdrop-blur-sm">
        {/* Logo */}
        <Link
          to={"/"}
          className="text-orange-500 text-2xl font-bold flex items-center z-20"
        >
          <img
            src={Logo}
            alt="AthleTrack Logo"
            className="w-auto h-[40px] md:h-[50px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center space-x-8 text-white font-semibold text-md">
          <Link
            to="/"
            className={`tracking-wider transition-colors duration-200 ${
              location.pathname === "/"
                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }`}
          >
            HOME
          </Link>
          <Link
            to="/events"
            className={`tracking-wider transition-colors duration-200 ${
              location.pathname === "/events"
                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }`}
          >
            GAMES
          </Link>
          <Link
            to="/upcoming"
            className={`tracking-wider transition-colors duration-200 ${
              location.pathname === "/upcoming"
                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }`}
          >
            UPCOMING
          </Link>
          <Link
            to="/about"
            className={`tracking-wider transition-colors duration-200 ${
              location.pathname === "/about"
                ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                : "hover:text-orange-500"
            }`}
          >
            ABOUT US
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed inset-0 w-full h-screen bg-gray-900/95 backdrop-blur-sm transition-all duration-300 z-40 ${
            isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-white font-semibold text-lg">
            <Link
              to="/"
              className={`py-2 tracking-wider transition-colors duration-200 ${
                location.pathname === "/"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={toggleNavbar}
            >
              HOME
            </Link>
            <Link
              to="/events"
              className={`py-2 tracking-wider transition-colors duration-200 ${
                location.pathname === "/events"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={toggleNavbar}
            >
              GAMES
            </Link>
            <Link
              to="/upcoming"
              className={`py-2 tracking-wider transition-colors duration-200 ${
                location.pathname === "/upcoming"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={toggleNavbar}
            >
              UPCOMING
            </Link>
            <Link
              to="/about"
              className={`py-2 tracking-wider transition-colors duration-200 ${
                location.pathname === "/about"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "hover:text-orange-500"
              }`}
              onClick={toggleNavbar}
            >
              ABOUT US
            </Link>
          </div>
          <button 
            onClick={toggleNavbar}
            className="absolute top-6 right-6 mobile-menu-button"
          >
            <IoMdClose
              className="text-white hover:text-orange-500 transition-colors duration-300"
              size={29}
            />
          </button>
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleNavbar}
            className="mobile-menu-button"
          >
            {isMenuOpen ? (
              <IoMdClose
                className="text-white hover:text-orange-500 transition-colors duration-300"
                size={29}
              />
            ) : (
              <GiHamburgerMenu
                className="text-white hover:text-orange-500 transition-colors duration-300"
                size={29}
              />
            )}
          </button>
        </div>

        {/* Search Input (Desktop Only) */}
        <div className="relative hidden lg:block" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search tournaments"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`bg-gray-800/80 border ${
              searchFocused ? "border-orange-500" : "border-gray-600"
            } text-white px-4 py-2 pr-10 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 w-[200px] lg:w-[250px]`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          {searchText.trim() !== "" && (
            <div className="absolute top-full left-0 w-full bg-gray-800 text-white rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto z-10">
              {filteredTournaments.length > 0 ? (
                filteredTournaments.map((tournament) => (
                  <div
                    key={tournament._id}
                    onClick={() => handleTournamentSelect(tournament)}
                    className="block px-4 py-2 hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    {tournament.name}
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-400">No tournaments found</p>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;