import PropertyModel from "../models/property.model";
import { propetySchema } from "../schemas/property.schema";
import { bookmarkProperty, createProperty } from "../services/property.service";
import catchErrors from "../utils/catchError";

export const getProperties = catchErrors(async (req, res) => {
  console.log("Received query params:", req.query);

  const {
    type,
    address,
    priceMin,
    priceMax,
    spaceMin,
    spaceMax,
    bedrooms,
    bathrooms,
    pets,
  } = req.query;

  const filter: any = {};

  if (type && type !== "any") {
    filter.type = type.toString().toLowerCase();
  }

  if (address && address !== "any") {
    filter.address = { $regex: address.toString(), $options: "i" };
  }

  if (priceMin || priceMax) {
    filter.price = {};
    if (priceMin && priceMin !== "0") {
      filter.price.$gte = Number(priceMin);
    }
    if (priceMax && priceMax !== "0") {
      filter.price.$lte = Number(priceMax);
    }
  }

  if (spaceMin || spaceMax) {
    filter.size = {};
    if (spaceMin && spaceMin !== "0") {
      filter.size.$gte = Number(spaceMin);
    }
    if (spaceMax && spaceMax !== "0") {
      filter.size.$lte = Number(spaceMax);
    }
  }

  if (bedrooms && bedrooms !== "any") {
    filter.bedrooms = Number(bedrooms);
  }

  if (bathrooms && bathrooms !== "any") {
    filter.bathrooms = Number(bathrooms);
  }

  if (pets && pets !== "any") {
    filter.pets = pets === "true";
  }

  console.log("Applied filters:", filter); // Debug filter object

  const properties = await PropertyModel.find(filter)
    .populate("userId")
    .sort({ createdAt: -1 });

  console.log("Found properties:", properties.length); // Debug results

  res.status(200).json(properties);
});

export const getProperty = catchErrors(async (req, res) => {
  const propertyId = req.params.propertyId;

  const property = await PropertyModel.findById(propertyId).populate("userId");

  res.status(200).json(property);
});

export const handleCreateProperty = catchErrors(async (req, res) => {
  const data = propetySchema.parse(req.body);
  const userId = req.userId;

  // Call Service
  const { property } = await createProperty(data, userId);

  // Return Response
  res.status(200).json(property);
});

export const handleBookmarkProperty = catchErrors(async (req, res) => {
  const userId = req.userId;
  const propertyId = req.body.propertyId;

  const response = await bookmarkProperty(userId, propertyId);

  res.status(200).json(response.message);
});
