import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import {
  getAllUsers,
  getUser,
} from "../controllers/xController.js";

const route = express.Router();

route.get("/getuser", verifyUser, getUser);
route.get("/getmembers", verifyUser, getAllUsers);

export default route;