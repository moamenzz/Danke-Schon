import HomeNavbar from "../components/HomeNavbar";
import HomeSearchBar from "../components/HomeSearchBar";
import PropertyAdCard from "../components/PropertyAdCard";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HomeNavbar />
      <div className="mx-auto">
        <div className="relative">
          <img
            src="/home-page-cover.png"
            alt="home-page-cover"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />

          {/* Inhalt */}
          <div className="absolute inset-0 flex items-center justify-between px-6 md:px-24 lg:px-36">
            <div className="space-y-6">
              <div className="text-white max-w-2xl space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                  Find your next <br />
                  best <span className="text-[#0957CB]">cozy place</span>
                </h1>
                <p className="text-lg md:text-xl max-w-lg text-gray-200">
                  Find the best places around you at the cheepest and affordable
                  prices.
                </p>
              </div>

              <div>
                <HomeSearchBar />
              </div>
            </div>
            {/* Ad Component */}
            <div className="hidden lg:block">
              <PropertyAdCard
                image="/home-page-cover.png"
                price={34200}
                location="3BHK at Goergia front tower..."
                avatar="/home-page-cover.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
