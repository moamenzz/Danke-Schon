import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getBookmarks, getUserProperties } from "../lib/apiRoutes";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";
import PropertyCard from "../components/PropertyCard";
import BookmarkCard from "../components/BookmarkCard";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: properties,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: getUserProperties,
  });

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
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
        <div className="grid grid-cols-2 gap-3">
          {/* Left Side */}
          <div className="flex flex-col space-y-10">
            {/* User Information */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                {/* Header & Edit profile */}
                <h1 className="text-2xl">User Information</h1>
                <Button
                  children="Edit Profile"
                  onClick={() =>
                    (
                      document?.getElementById(
                        "edit_profile"
                      ) as HTMLDialogElement
                    )?.showModal()
                  }
                />
                <dialog id="edit_profile" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click the button below to close
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>

              {/* User details */}
              <div className="flex flex-col space-y-3">
                {/* Avatar */}
                <div className="flex items-center gap-3">
                  <h1 className="text-lg">Avatar: </h1>
                  <div className="w-10 h-10">
                    <img
                      src={user?.avatar || "/avatar-placeholder.jpeg"}
                      alt="avatar-placeholder"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="flex items-center gap-3">
                  <h1 className="text-lg">Username: </h1>

                  <div>
                    <h1 className="text-lg">
                      {user?.username || "Unbekanntes Benutzer"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* Property List */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl">Your properties</h1>

                <Button
                  children="Add Property"
                  onClick={() => navigate("/create-property")}
                />
              </div>

              {/* Property cards */}
              <div className="space-y-3">
                {properties?.map((property, index) => (
                  <PropertyCard
                    key={index}
                    property={property}
                    userBookmarks={bookmarks ? bookmarks : []}
                  />
                ))}
              </div>
            </div>

            {/* Bookmarks */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl">Your Bookmarks</h1>
              </div>

              {/* Property cards */}
              <div className="space-y-3">
                {bookmarks?.map((bookmark, index) => (
                  <BookmarkCard
                    bookmark={bookmark}
                    key={index}
                    userBookmarks={bookmarks ? bookmarks : []}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="bg-gray-100">
            <div className="px-3 py-2">
              <h1 className=" text-xl font-semibold">Messages</h1>

              {/* Message heads */}
              <div>
                {}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
