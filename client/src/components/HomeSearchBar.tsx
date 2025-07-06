import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeSearchBar = () => {
  const [type, setType] = useState("Rent");
  const [address, setAddress] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [spaceMin, setSpaceMin] = useState(0);
  const [spaceMax, setSpaceMax] = useState(0);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [pets, setPets] = useState(false);

  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("en-EN")}`;
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceMin(value);
    // Wenn maxPrice kleiner als der neue minPrice ist, setze maxPrice auf minPrice
    if (priceMax < value) {
      setPriceMax(value);
    }
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Stelle sicher, dass maxPrice nicht kleiner als minPrice ist
    setPriceMax(Math.max(value, priceMin));
  };

  const handleSpaceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSpaceMin(value);
    // Wenn maxSpace kleiner als der neue minSpace ist, setze maxSpace auf minSpace
    if (spaceMax < value) {
      setSpaceMax(value);
    }
  };

  const handleSpaceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Stelle sicher, dass maxSpace nicht kleiner als minSpace ist
    setSpaceMax(Math.max(value, spaceMin));
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams();

    if (type) searchParams.set("type", type.toLowerCase());
    if (address) searchParams.set("address", address.toLowerCase());
    if (priceMin) searchParams.set("priceMin", priceMin.toString());
    if (priceMax) searchParams.set("priceMax", priceMax.toString());
    if (spaceMin) searchParams.set("spaceMin", spaceMin.toString());
    if (spaceMax) searchParams.set("spaceMax", spaceMax.toString());
    if (bedrooms) searchParams.set("bedrooms", bedrooms);
    if (bathrooms) searchParams.set("bathrooms", bathrooms);
    if (pets) searchParams.set("pets", pets.toString());

    navigate(`/property?${searchParams}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left side options */}
        <div className="flex items-center space-x-2 border-r rounded-full border-gray-200">
          <div className="flex items-center justify-between w-full cursor-pointer">
            <select
              defaultValue="Pick a color"
              className="select"
              onChange={(e) => setType(e.target.value)}
            >
              <option>Rent</option>
              <option>Buy</option>
            </select>
          </div>
        </div>

        {/* Location input */}
        <div className="lg:col-span-2">
          <input
            type="text"
            placeholder="Enter Address "
            className="w-full px-4 py-2 focus:outline-none text-gray-700"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Pets checkbox */}
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-2">
            <h1>Pets?</h1>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => setPets(e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Price Range: {formatPrice(priceMin)} - {formatPrice(priceMax)}
              </p>
              <div className="flex flex-col gap-4">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceMin}
                  className="range range-xs text-[#0957CB]"
                  onChange={handlePriceMinChange}
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceMax}
                  className="range range-xs text-[#0957CB]"
                  onChange={handlePriceMaxChange}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Space (m²): {spaceMin} - {spaceMax}
              </p>{" "}
              <div className="flex flex-col gap-4">
                <input
                  type="range"
                  min="20"
                  max="500"
                  value={spaceMin}
                  className="range range-xs range-secondary"
                  onChange={handleSpaceMinChange}
                />
                <input
                  type="range"
                  min="20"
                  max="500"
                  value={spaceMax}
                  className="range range-xs range-secondary"
                  onChange={handleSpaceMaxChange}
                />
              </div>
            </div>
          </div>

          {/* Rooms selection */}
          <div className="flex items-center">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 border-r rounded-full border-gray-200">
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <select
                    defaultValue="Pick a color"
                    className="select"
                    onChange={(e) => setBedrooms(e.target.value)}
                  >
                    <option>Bedrooms</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 border-r rounded-full border-gray-200">
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <select
                    defaultValue="Pick a color"
                    className="select"
                    onChange={(e) => setBathrooms(e.target.value)}
                  >
                    <option>Bathrooms</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full w-full cursor-pointer transition-colors duration-200"
          >
            <div className="flex justify-center">
              <FaSearch />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSearchBar;
