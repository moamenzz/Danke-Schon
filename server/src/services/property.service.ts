import mongoose from "mongoose";
import UserModel from "../models/user.model";
import appAssert from "../utils/AppAssert";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import cloudinary from "../config/cloudinary";
import cloudinaryOptions from "../utils/cloudinaryOptions";
import PropertyModel from "../models/property.model";
import BookmarkModel from "../models/bookmark.model";

interface PropertyParams {
  title: string;
  images: string[];
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  utilities: string;
  pets: boolean;
  incomePolicy: string;
  size: number;
  nearestSchool: number;
  nearestBusStop: number;
  nearestRestrauant: number;
  longtitude: number;
  latitude: number;
}

export const createProperty = async (
  data: PropertyParams,
  userId: mongoose.Types.ObjectId
) => {
  // Search for user in DB
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  try {
    // Upload images to cloudinary
    const uploadPromises = data.images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image, {
        cloudinaryOptions,
      });
      return result.secure_url;
    });

    const uploadImages = await Promise.all(uploadPromises);
    // Create Property in DB
    const property = await PropertyModel.create({
      ...data,
      images: uploadImages,
      userId,
    });

    // Return Property
    return { property };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const bookmarkProperty = async (
  userId: mongoose.Types.ObjectId,
  propertyId: mongoose.Types.ObjectId
) => {
  // Search for user in DB
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  // Search for property in DB
  const property = await PropertyModel.findById(propertyId);
  appAssert(property, NOT_FOUND, "Property not found");

  // Bookmark Property
  const existingBookmark = await BookmarkModel.findOne({ userId, propertyId });

  if (existingBookmark) {
    await BookmarkModel.deleteOne({ userId, propertyId });
    return { message: "Property Unbookmarked Successfully" };
  } else {
    await BookmarkModel.create({ userId, propertyId });
    return { message: "Property Bookmarked Successfully" };
  }
};
