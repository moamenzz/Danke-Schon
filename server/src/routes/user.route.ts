import express from "express";
import {
  getBookmarks,
  getUser,
  getUserProperties,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/bookmarks", getBookmarks);
userRouter.get("/properties", getUserProperties);

export default userRouter;
