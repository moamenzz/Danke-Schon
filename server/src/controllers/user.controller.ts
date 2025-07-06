import { NOT_FOUND } from "../constants/HttpStatusCode";
import BookmarkModel from "../models/bookmark.model";
import PropertyModel from "../models/property.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getUser = catchErrors(async (req, res) => {
  const userId = req.userId;
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  res.status(200).json(user.omitPassword());
});

export const getBookmarks = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const bookmarks = await BookmarkModel.find({ userId })
    .populate({
      path: "propertyId",
      model: "Property",
      populate: {
        path: "userId",
        model: "User",
      },
    })
    .populate("userId");

  // Transform the data to match the frontend interface
  const transformedBookmarks = bookmarks.map((bookmark) => ({
    _id: bookmark._id,
    property: bookmark.propertyId,
    user: bookmark.userId,
    createdAt: bookmark.createdAt,
  }));

  res.status(200).json(transformedBookmarks);
});

export const getUserProperties = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const properties = await PropertyModel.find({ userId }).populate("userId");

  res.status(200).json(properties);
});
