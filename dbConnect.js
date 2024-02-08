import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
