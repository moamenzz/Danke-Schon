import { z } from "zod";

export const propetySchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1).max(50),
  images: z
    .array(z.string({ required_error: "Images are required" }))
    .min(1)
    .max(4),
  description: z
    .string({ required_error: "Description is required" })
    .min(1)
    .max(2500),
  address: z.string({ required_error: "Address is required" }).min(1).max(40),
  type: z.string({ required_error: "Type is required" }).min(1),
  price: z.number({ required_error: "Price is required" }).min(1).max(100000),
  bedrooms: z.number({ required_error: "Bedrooms are required" }).min(1).max(4),
  bathrooms: z
    .number({ required_error: "Bathrooms are required" })
    .min(1)
    .max(4),
  utilities: z
    .string({ required_error: "Utilities are required" })
    .min(1)
    .max(250),
  pets: z.boolean({ required_error: "Pets field is required" }),
  incomePolicy: z
    .string({ required_error: "Income Policy is required" })
    .min(1)
    .max(250),
  size: z.number({ required_error: "Size is required" }).min(1).max(500),
  nearestSchool: z
    .number({ required_error: "Nearest School is required" })
    .min(1),
  nearestBusStop: z
    .number({ required_error: "Nearest Bus Stop is required" })
    .min(1),
  nearestRestrauant: z
    .number({ required_error: "Nearest Restrauant is required" })
    .min(1),
  longtitude: z
    .number({ required_error: "Longtitude is required" })
    .min(-180)
    .max(180),
  latitude: z
    .number({ required_error: "Latitude is required" })
    .min(-90)
    .max(90),
});
