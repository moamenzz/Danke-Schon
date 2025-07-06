import { FC } from "react";
import { Link } from "react-router-dom";
import {
  AuthResponse,
  Bookmark,
  bookmarkProperty,
  Property,
} from "../lib/apiRoutes";
import { FaBath, FaBed } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { IoBookmarkSharp } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import ErrorThrower from "./ErrorThrower";
import queryClient from "../config/queryClient";

interface PropertyParams {
  bookmark: Bookmark;
  userBookmarks: Bookmark[];
}

const BookmarkCard: FC<PropertyParams> = ({ bookmark, userBookmarks }) => {
  const {
    mutate: bookmarkMutation,
    isError,
    error,
  } = useMutation({
    mutationFn: bookmarkProperty,
    onMutate: async (propertyId: string) => {
      // Cancel Mutations
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
      // Get snapshot of old data
      const previousBookmarks = queryClient.getQueryData<Bookmark[]>([
        "bookmarks",
      ]);

      // Optimistic update
      queryClient.setQueryData<Bookmark[]>(["bookmarks"], (old = []) => {
        const exists = old.some(
          (bookmark) => bookmark.property._id === propertyId
        );
        if (exists) {
          return old.filter((bookmark) => bookmark.property._id !== propertyId);
        } else {
          return [
            ...old,
            {
              _id: "temp-id",
              property: { _id: propertyId } as Property,
              user: { _id: "temp-user-id" } as AuthResponse,
              createdAt: new Date(),
            },
          ];
        }
      });

      // Return snapshot
      return { previousBookmarks };
    },
    onSuccess: () => {
      // Invalidate und refetch bookmarks
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (err, newBookmark, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData<Bookmark[]>(
          ["bookmarks"],
          context.previousBookmarks
        );
      }
    },
  });

  return (
    <div className="flex gap-5 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200">
      <Link
        to={`/property/${bookmark._id}`}
        className="flex-2 h-[200px] w-[300px]"
      >
        {bookmark?.property?.images &&
        bookmark?.property?.images?.length > 0 ? (
          <img
            src={bookmark.property.images[0]}
            alt={`${bookmark.property.title}`}
            className="w-full h-full object-cover rounded-[10px]"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-[10px] flex items-center justify-center">
            No Image
          </div>
        )}
      </Link>
      <div className="flex-3 flex flex-col justify-between gap-2.5">
        <h2 className="text-[20px] font-semibold text-[#444] transition-colors duration-400 hover:text-black">
          {bookmark?.property?.title}
        </h2>
        <p className="text-sm flex items-center gap-1 text-[#888]">
          <IoLocation />
          <span>{bookmark?.property?.address}</span>
        </p>
        <p className="text-[20px] font-light px-2 py-1 rounded bg-[rgba(254,205,81,0.438)] w-max">
          $ {bookmark?.property?.price}
        </p>
        <div className="flex justify-between gap-2.5">
          <div className="flex gap-5 text-sm">
            <div className="flex items-center gap-1 bg-[whitesmoke] px-2 py-1 rounded">
              <FaBed />
              <span>{bookmark?.property?.bedrooms} bedroom</span>
            </div>
            <div className="flex items-center gap-1 bg-[whitesmoke] px-2 py-1 rounded">
              <FaBath />
              <span>{bookmark?.property?.bathrooms} bathroom</span>
            </div>
          </div>
          <div className="flex gap-5">
            <button
              className={`border border-[#999] px-2 py-1 rounded cursor-pointer flex items-center justify-center `}
              onClick={() => bookmarkMutation(bookmark.property._id)}
            >
              <div className="text-yellow-500">
                <IoBookmarkSharp size={20} />
              </div>
              {isError && <ErrorThrower isError={isError} error={error} />}
            </button>
            <button className="border border-[#999] px-2 py-1 rounded cursor-pointer flex items-center justify-center hover:bg-gray-300">
              <IoMdChatboxes size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
