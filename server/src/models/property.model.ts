import mongoose from "mongoose";
import { utilityTypes } from "../constants/utilitiesTypes";
import { propertyTypes } from "../constants/propertyTypes";

export interface PropertyDocument extends mongoose.Document {
  _id: string;
  userId: mongoose.Types.ObjectId; // Wir werden dieses field ausfüllen, um den Benutzers name und bild zu bekommen
  images: string[];
  title: string;
  description: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  utilities: utilityTypes;
  type: propertyTypes;
  pets: boolean;
  incomePolicy: string;
  size: number; // In Quadratmetern
  nearestSchool: number;
  nearestBusStop: number;
  nearestRestrauant: number;
  longitude: number;
  latitude: number;
  createdAt: Date;
}

const PropertySchema = new mongoose.Schema<PropertyDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: { type: [String], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    utilities: { type: String, required: true },
    type: { type: String, required: true },
    pets: { type: Boolean, required: true },
    incomePolicy: { type: String, required: true },
    size: { type: Number, required: true },
    nearestSchool: { type: Number, required: true },
    nearestBusStop: { type: Number, required: true },
    nearestRestrauant: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  { timestamps: true }
);

const PropertyModel = mongoose.model<PropertyDocument>(
  "Property",
  PropertySchema
);

export default PropertyModel;
