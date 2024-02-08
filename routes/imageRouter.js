import express from "express";
import {
  createImages,
  getImages,
  saveUserImage
} from "../controllers/imageControllers.js";

import verifyUser from "../middlewares/verifyUser.js";
verifyUser
const route = express.Router();

route.get("/getImages", verifyUser, getImages);
route.post("/createImages", verifyUser, createImages);
route.post("/saveprofile", verifyUser, saveUserImage);

export default route;