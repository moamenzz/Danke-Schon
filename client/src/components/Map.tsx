import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getProperties } from "../lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import ErrorThrower from "./ErrorThrower";
import { useSearchParams } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { FC } from "react";

// Fix für die Leaflet Marker-Icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapsProps {
  type: "properties" | "property";
}

const Map: FC<MapsProps> = ({ type }) => {
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

  // Berechne den Mittelpunkt basierend auf allen Immobilien
  const center =
    properties.length > 0
      ? ([
          properties.reduce((sum, p) => sum + p.latitude, 0) /
            properties.length,
          properties.reduce((sum, p) => sum + p.longitude, 0) /
            properties.length,
        ] as [number, number])
      : ([52.52, 13.4] as [number, number]); // Berlin als Fallback

  return isPending ? (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error} />
  ) : (
    <div
      className={`property-map ${
        type === "properties" ? " h-[calc(100vh-64px)]" : "h-[15rem]"
      } `}
    >
      {" "}
      {/* Angepasste Höhe */}
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {properties.map((property) => {
          // Prüfe, ob gültige Koordinaten vorhanden sind
          if (!property.latitude || !property.longitude) return null;

          return (
            <Marker
              key={property._id}
              position={[property.latitude, property.longitude]}
            >
              <Popup>
                <div className="flex gap-3">
                  <div className="w-[10rem] h-[10rem]">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{property.title}</h3>
                    <p className="text-sm flex items-center gap-1">
                      <IoLocation />
                      {property.address}
                    </p>
                    <p className="text-sm font-semibold">
                      {property.price.toLocaleString("de-DE")} €
                    </p>
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
                      onClick={() =>
                        (window.location.href = `/property/${property._id}`)
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
