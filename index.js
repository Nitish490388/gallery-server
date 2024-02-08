import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./dbConnect.js";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import userRouter from "./routes/userRouter.js";
import xRouter from "./routes/xRouter.js";
import imageRouter from "./routes/imageRouter.js";
import morgan from "morgan";
import "./config/cloudinaryConfig.js";

const app = express();

dotenv.config({
  path: "./.env"
});
const PORT = process.env.PORT || 8001;

//CONFIG
app.use(
  cookieSession({
    name: "session",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
    sameSite: "lax",
    httpOnly: true,
  })
);
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_URL, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

// routes
app.use("/auth", userRouter);
app.use("/gallery", imageRouter);
app.use("/user", xRouter);

connectDB();

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
})