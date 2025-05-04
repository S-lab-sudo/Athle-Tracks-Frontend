import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const Logo =
    "https://res.cloudinary.com/dwe0jsgt6/image/upload/v1746081605/logo_dlugxj.png";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white w-[100vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 justify-center items-center flex flex-col md:inline">
            <Link to="/" className=" w-fit">
              <img
                src={Logo}
                alt="Company Logo"
                height={320}
                width={320}
                className="md:inline hidden"
              />
              <img
                src={Logo}
                alt="Company Logo"
                height={250}
                width={250}
                className="inline md:hidden"
              />
            </Link>
            <p className="mt-4 text-gray-400 w-96">
              Your ultimate destination for basketball tournaments, news, and
              community engagement. Join us in celebrating the spirit of the
              game!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                <Link to={"/upcoming"}>Register Your Team</Link>
              </li>
              <li className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                <Link to={"/events"}>Tournaments</Link>
              </li>
              <li className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                <Link to={"/about"}>About Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>AthleTrack</li>
              <li>Gongabu, Kathmandu</li>
              <li>Phone: +977 9840789858 / 9840789859</li>
              <li>Email: shah.adesh30@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Social Media and Newsletter */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {[
                {
                  Icon: FaFacebookF,
                  link: "https://www.facebook.com/aadesh.shah.1",
                },
                {
                  Icon: FaInstagram,
                  link: "https://www.instagram.com/athletrack.np?igsh=bXlyNTNtYWtkOGgx",
                },
              ].map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  <Icon className="text-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {currentYear} AthleTrack. All rights reserved.</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="relative">
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <path
              fill="rgba(249, 115, 22, 0.1)"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
