import express from "express";
import {
  signin,
  signup,
  logout
} from "../controllers/userController.js";
const router = express.Router();

router.post("/login", signin);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;