"use client"
import { motion } from "framer-motion"
import { GiBasketballBall, GiTrophyCup } from "react-icons/gi"
import { IoMegaphoneOutline, IoArrowForward } from "react-icons/io5"
import { Link } from "react-router-dom" // Assuming you're using React Router for navigation

const FillerComponent = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-10">
        <GiBasketballBall className="text-orange-500" size={200} />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-orange-500/30"
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center">
                <IoMegaphoneOutline className="mr-4 text-orange-500" size={40} />
                <span>Got a tournament coming up?</span>
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-300">
                Showcase your event to a wider audience! Whether it's in the planning stages or already set, our
                platform is the perfect place to advertise your basketball tournament.
              </p>
              <div className="mt-8 flex space-x-4 items-center text-gray-300">
                <GiTrophyCup className="text-orange-500" size={24} />
                <span>Increase visibility</span>
                <span className="text-orange-500">•</span>
                <span>Attract more teams</span>
                <span className="text-orange-500">•</span>
                <span>Boost engagement</span>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register" // Adjust this path to match your route for the registration form
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                >
                  Advertise Your Tournament
                  <IoArrowForward className="ml-2" />
                </Link>
              </motion.div>
              <p className="mt-3 text-sm text-gray-400 text-center lg:text-left">
                It's quick, easy, and gets your event noticed!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FillerComponent

