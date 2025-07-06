import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookmarks, getProperties } from "../lib/apiRoutes";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";
import PropertyCard from "../components/PropertyCard";
import Map from "../components/Map";
import SearchBar from "../components/Searchbar";

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();

  const queryString = searchParams.toString();
  const url = queryString ? `/property?${queryString}` : "/property";

  const {
    data: properties = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["properties", url],
    queryFn: () => getProperties(url),
  });

  const { data: userBookmarks = [] } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
  });

  return isPending ? (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error} />
  ) : (
    <div className="min-h-screen">
      <div className="mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Side  */}
          <div className="flex flex-col">
            {/* Search bar */}
            <div className="flex flex-col space-y-2 mt-6">
              <SearchBar />
            </div>
            {/* Properties */}
            {properties.length > 0 ? (
              <div className="flex flex-col space-y-6 mt-16">
                {properties.map((property, index) => (
                  <PropertyCard
                    key={index}
                    property={property}
                    userBookmarks={userBookmarks}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-6 mt-16">
                <p>No Properties Found</p>
              </div>
            )}
          </div>
          {/* Right Side */}
          <div>
            {/* Map */}
            <div>
              <Map type="properties" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
