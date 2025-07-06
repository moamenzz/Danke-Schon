import express from "express";
import {
  getProperties,
  getProperty,
  handleBookmarkProperty,
  handleCreateProperty,
} from "../controllers/property.controller";

const propertyRouter = express.Router();

propertyRouter.get("/", getProperties);
propertyRouter.get("/:propertyId", getProperty);
propertyRouter.post("/create-property", handleCreateProperty);
propertyRouter.put("/bookmark", handleBookmarkProperty);

export default propertyRouter;
