import { GiBasketballBall } from "react-icons/gi";

const Filler = () => {
    const introVideo="https://res.cloudinary.com/dwe0jsgt6/video/upload/v1746081531/AQO7s5FZgi0Ed4LN3Ay7nTSaKFvKV0UGSJ1Hz9ESc5OrShgeIhimbm7awha2DJOOneVGWYttiUMavQQJG96hVYKy_rubzcr.mp4"
  return (
    <div className="bg-gray-900 py-16  rounded-xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-center mb-4">
              <GiBasketballBall className="text-orange-500 text-3xl mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Official Statistics Partner
              </h2>
            </div>

            <p className="text-gray-300 text-lg">
              We are the official partner for providing comprehensive player
              statistics throughout this tournament.
            </p>

            <p className="text-gray-400">
              Our advanced analytics platform captures every point, rebound, and
              assist, giving players and fans access to detailed performance
              metrics.
            </p>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mt-4">
              <h3 className="text-orange-400 font-semibold mb-2">
                What We Offer:
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Player statistics</li>
                <li>• Team performance analytics</li>
                <li>• Historical match data</li>
                <li>• Tournament leaderboards</li>
              </ul>
            </div>
          </div>

          {/* Right side - Video */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div
              className="relative rounded-lg overflow-hidden border border-gray-700 shadow-lg 
                  aspect-[4/3] md:aspect-video lg:aspect-[21/9]"
            >
              <video
                controls
                className="w-full h-full object-contain"
                poster="/placeholder.svg?height=300&width=500"
              >
                <source src={introVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filler;