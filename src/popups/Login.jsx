import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { GiBasketballBall } from "react-icons/gi";
import { FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import ToastProvider from "./ToastProvider";
import { toast } from "react-toastify";

export const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    
    const loginData = {
      phoneNumber: phone,
      password
    };

    axios
      .post("/api/users/login", loginData)
      .then((res) => {
        if (res.status === 200) {
          // Show success message
          setIsLoading(false);
          toast.success("Login successful!")
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          // Simulate a delay before redirecting
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response) {
          if (err.response.status === 400 || err.response.status === 401) {
            setError(true);
            setErrorMessage(err.response.data.message || "Invalid credentials");
          } else {
            setError(true);
            setErrorMessage("An error occurred. Please try again.");
          }
        } else {
          setError(true);
          setErrorMessage("Network error. Please check your connection.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <NavBar />
      <ToastProvider></ToastProvider>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Branding */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-600/90 to-orange-800/90 p-8 md:p-12 flex flex-col justify-center items-center text-white">
              <div className="mb-8 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <GiBasketballBall className="text-white text-4xl" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-center">AthleTrack</h2>
              
              <div className="text-center mb-8">
                <p className="text-xl font-semibold mb-3">
                  Your Gateway to Player Stats
                </p>
                <p className="text-white/80">
                  Sign in to join the ultimate sports community and track live scores, stats, and more in one place.
                </p>
              </div>
              
              <div className="w-full max-w-xs">
                <div className="relative h-1 bg-white/20 rounded-full overflow-hidden mb-8">
                  <div className="absolute top-0 left-0 h-full w-2/3 bg-white rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-2xl">50+</div>
                    <div className="text-white/70">Tournaments</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl">200+</div>
                    <div className="text-white/70">Teams</div>
                  </div>
                  <div>
                    <div className="font-bold text-2xl">1000+</div>
                    <div className="text-white/70">Players</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
                  <p className="text-gray-400">
                    Welcome back! Please enter your details.
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Phone Number Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div 
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400 hover:text-gray-300" />
                        ) : (
                          <FaEye className="text-gray-400 hover:text-gray-300" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm text-orange-400 hover:text-orange-300 transition-colors duration-200">
                      Forgot password?
                    </Link>
                  </div>
                  
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-lg flex items-start">
                      <IoMdAlert className="text-red-400 mr-2 text-lg flex-shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  
                  {/* Login Button */}
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center ${
                      isLoading ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                  
                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="text-gray-400">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Basketball decoration */}
      <div className="fixed -bottom-20 -left-20 opacity-5 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
      <div className="fixed -top-20 -right-20 opacity-5 pointer-events-none">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
    </div>
  );
};
