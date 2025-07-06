import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [type, setType] = useState("Rent");
  const [address, setAddress] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [spaceMin] = useState(0);
  const [spaceMax] = useState(0);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [pets] = useState(false);

  const navigate = useNavigate();

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
    <div className="flex flex-col gap-2.5">
      <h1 className="font-light text-2xl">
        Search results for <b>{address}</b>
      </h1>

      {/* Top Section */}
      <div className="w-full">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="address" className="text-[10px]">
            Location
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="City"
            onChange={(e) => setAddress(e.target.value)}
            defaultValue={address}
            className="w-full p-2.5 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-wrap justify-between gap-5">
        {/* Type */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="type" className="text-[10px]">
            Type
          </label>
          <select
            name="type"
            id="type"
            onChange={(e) => setType(e.target.value)}
            defaultValue={type}
            className="w-[100px] p-2.5 border border-gray-300 rounded text-sm"
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* Property */}
        {/* <div className="flex flex-col gap-0.5">
          <label htmlFor="property" className="text-[10px]">
            Property
          </label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
            className="w-[100px] p-2.5 border border-gray-300 rounded text-sm"
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div> */}

        {/* Min Price */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="priceMin" className="text-[10px]">
            Min Price
          </label>
          <input
            type="number"
            max={100000}
            id="priceMin"
            name="priceMin"
            placeholder="any"
            onChange={(e) => setPriceMin(Number(e.target.value))}
            defaultValue={priceMin}
            className="w-[100px] p-2.5 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* Max Price */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="priceMax" className="text-[10px]">
            Max Price
          </label>
          <input
            type="number"
            max={100000}
            id="priceMax"
            name="priceMax"
            placeholder="any"
            onChange={(e) => setPriceMax(Number(e.target.value))}
            defaultValue={priceMax}
            className="w-[100px] p-2.5 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* Bedroom */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="bedroom" className="text-[10px]">
            Bedroom
          </label>
          <input
            type="number"
            max={5}
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={(e) => setBedrooms(e.target.value)}
            defaultValue={bedrooms}
            className="w-[100px] p-2.5 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* Bathroms */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="bathrooms" className="text-[10px]">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            max={5}
            name="bathrooms"
            placeholder="any"
            onChange={(e) => setBathrooms(e.target.value)}
            defaultValue={bathrooms}
            className="w-[100px] p-2.5 border border-gray-300 rounded text-sm"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          className="p-2.5 bg-[#0957CB] border-none cursor-pointer flex justify-center text-white items-center w-full rounded"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
