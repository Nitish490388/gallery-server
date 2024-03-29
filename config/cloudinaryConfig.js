import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});

const res = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//console.log(res);
