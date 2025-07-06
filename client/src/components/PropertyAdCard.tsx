import { FC } from "react";
import { FaRegHeart } from "react-icons/fa";

interface PropertyAdCardProps {
  image: string;
  price: number;
  location: string;
  isSale?: boolean;
  avatar?: string;
}

const PropertyAdCard: FC<PropertyAdCardProps> = ({
  image,
  price,
  location,
  isSale,
  avatar,
}) => {
  return (
    <div className="relative w-64 bg-white rounded-xl overflow-hidden shadow-lg">
      {/* Property Image */}
      <div className="relative h-40">
        <img
          src={image}
          alt={location}
          className="w-full h-full object-cover"
        />

        {/* Sale/Rent badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white text-xs font-medium py-1 px-2 rounded-full">
            {isSale ? "for sale" : "for rent"}
          </span>
        </div>

        {/* Heart icon */}
        <div className="absolute top-3 left-3">
          <button className="text-white hover:text-red-500 transition-colors">
            <FaRegHeart size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-lg">${price.toLocaleString()}</p>
        </div>

        {/* Location */}

        {/* Owner info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-3">
            <img
              src={avatar}
              alt="Owner"
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            <p className="text-sm text-gray-600">{location}</p>
          </div>
          {/* For Sale */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAdCard;
