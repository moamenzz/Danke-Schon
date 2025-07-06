import { useMutation, useQuery } from "@tanstack/react-query";
import { bookmarkProperty, getProperty } from "../lib/apiRoutes";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";
import { IoLocation } from "react-icons/io5";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { MdOutlinePets, MdOutlinePolicy } from "react-icons/md";
import { GiResize } from "react-icons/gi";
import { FaBath, FaBed } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { IoBusSharp } from "react-icons/io5";
import { IoMdRestaurant } from "react-icons/io";
import Map from "../components/Map";
import Button from "../components/Button";

const PropertyPage = () => {
  const { propertyId } = useParams();

  const {
    data: property,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["property"],
    queryFn: () => getProperty(propertyId ? propertyId : ""),
  });

  const { mutate: bookmarkMutation, isPending } = useMutation({
    mutationFn: bookmarkProperty,
  });

  return isLoading ? (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error} />
  ) : (
    <div className="min-h-screen">
      <div className="mx-auto">
        {property && (
          <div className="grid grid-cols-2 gap-6">
            {/* Left side */}
            <div className="flex flex-col space-y-6">
              {/* Images */}
              <div className="flex gap-1">
                {/* Main image */}
                <div className="w-full h-full">
                  <img
                    src={property.images[0]}
                    alt={`${property.title}-image`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Side images */}
                <div className="flex flex-col gap-3">
                  {property.images.slice(1, 4).map((image, index) => (
                    <div className="w-[10rem] h-[10rem]">
                      <img
                        key={index}
                        src={image}
                        alt={`${property.title}-image`}
                        className="w-full h-full object-cover aspect-video rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Description & User-Info */}
              <div className="flex flex-col space-y-10">
                {/* Property details */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col space-y-3">
                    <h1 className="text-2xl text-black">{property.title}</h1>
                    <p className="text-sm flex items-center gap-1 text-[#888]">
                      <IoLocation />
                      <span>{property.address}</span>
                    </p>
                    <p className="text-[20px] font-light px-2 py-1 rounded bg-[rgba(254,205,81,0.438)] w-max">
                      $ {property.price}
                    </p>
                  </div>

                  {/* User Info */}
                  <div className="p-3 bg-[rgba(254,205,81,0.438)]">
                    <div className="flex flex-col space-y-3 items-center">
                      <div className="w-8 h-8">
                        <img
                          src={
                            property?.userId?.avatar ||
                            "/avatar-placeholder.jpeg"
                          }
                          alt={`${property?.userId?.username}-avatar`}
                          className="w-full h-full rounded-full"
                        />
                      </div>

                      <h1 className="text-md text-black">
                        {property?.userId?.username}
                      </h1>

                      <button>Send a message</button>
                    </div>
                  </div>
                </div>

                {/* Property description */}
                <div className="text-[20px] font-light px-2 py-1 rounded">
                  {property.description}
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col space-y-3 bg-gray-200">
              {/* General Info*/}
              <div className="space-y-4">
                <h1 className="text-lg text-black font-semibold px-3 mt-3">
                  General
                </h1>

                <div className="flex flex-col p-3">
                  <div className="flex flex-col space-y-2 bg-white px-1 py-2">
                    {/* Utilities */}
                    <div className="flex gap-2">
                      {/* Icon */}
                      <div className="flex items-center">
                        <HiOutlineWrenchScrewdriver size={30} />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col">
                        <h1 className="text-lg font-semibold">Utilities</h1>
                        <p>{property.utilities}</p>
                      </div>
                    </div>

                    {/* Pet Policy */}
                    <div className="flex bg-white gap-2">
                      {/* Icon */}
                      <div className="flex items-center">
                        <MdOutlinePets size={30} />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col">
                        <h1 className="text-lg font-semibold">Pet Policy</h1>
                        <p>
                          {property.pets
                            ? "Pets are allowed"
                            : "Pets are NOT allowed"}
                        </p>
                      </div>
                    </div>

                    {/* Income Policy */}
                    <div>
                      <div className="flex bg-white gap-2">
                        {/* Icon */}
                        <div className="flex items-center">
                          <MdOutlinePolicy size={30} />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col">
                          <h1 className="text-lg font-semibold">
                            Income Policy
                          </h1>
                          <p>{property.incomePolicy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3">
                <h1 className="text-lg text-black font-semibold px-3 mt-3">
                  Sizes
                </h1>

                <div className="flex justify-between items-center px-3">
                  {/* Size */}
                  <div className="flex items-center gap-1 p-2 bg-white">
                    <div>
                      <GiResize size={20} />
                    </div>

                    <div>{property.size} meter square</div>
                  </div>

                  {/* Bedrooms */}
                  <div className="flex items-center gap-1 p-2 bg-white">
                    <div>
                      <FaBed size={20} />
                    </div>

                    <div>{property.bedrooms} beds</div>
                  </div>
                  {/* Bathrooms */}
                  <div className="flex items-center gap-1 p-2 bg-white">
                    <div>
                      <FaBath size={20} />
                    </div>

                    <div>{property.bathrooms} bathrooms</div>
                  </div>
                </div>
              </div>

              {/* Nearby Places */}
              <div className="space-y-3">
                <h1 className="text-lg text-black font-semibold px-3 mt-3">
                  Nearby Places
                </h1>

                <div className="flex justify-between items-center px-3">
                  {/* School */}
                  <div className="flex items-center gap-2 bg-white px-3 py-1">
                    <div>
                      <FaSchool size={25} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-lg font-semibold">School</h1>
                      <p>{property.nearestSchool}m away</p>
                    </div>
                  </div>

                  {/* Bus stop */}
                  <div className="flex items-center gap-2 bg-white px-3 py-1">
                    <div>
                      <IoBusSharp size={25} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-lg font-semibold">Bus Stop</h1>
                      <p>{property.nearestBusStop}m away</p>
                    </div>
                  </div>

                  {/* Restaurant */}
                  <div className="flex items-center gap-2 bg-white px-3 py-1">
                    <div>
                      <IoMdRestaurant size={25} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-lg font-semibold">Restaurant</h1>
                      <p>{property.nearestRestrauant}m away</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col p-3 space-y-3">
                <h1 className="text-lg text-black font-semibold">Location</h1>

                <div className="space-y-2">
                  <Map type="property" />

                  <div className="flex justify-between items-center">
                    <div className="w-[20rem]">
                      <Button children="Send a Message" />
                    </div>
                    <div className="w-[20rem]">
                      <Button
                        children="Bookmark Place"
                        isLoading={isPending}
                        onClick={() => bookmarkMutation(property._id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
