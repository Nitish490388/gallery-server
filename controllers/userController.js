import { success, error } from "../utils/responseWrapper.js"
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";



const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send(error(401, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send(error(402), "User already exist, can go for signin");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ _id: user._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      });

    res.cookie("token", token, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 3),
    });

    return res.send(success(201, user));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err.message));
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.send(error(401, "User is not registerd need to go for signup"));
    }

    const matched = await bcrypt.compare(password, existingUser.password);
    if (!matched) {
      return res.send(error(400, "Password is not matched"));
    }

    const token = jwt.sign(
      { _id: existingUser._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' }
    );

    res.cookie("token", token, {
      // path: "/",
      // sameSite: "lax",
      // httpOnly: true,
      expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 3),
    });

    res.send(success(201, existingUser));
  } catch (err) {
    console.log(err);
    res.send(error(500, err.message));
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    req.session = null;
    return res.send(success(201, "User logged out successfully"))
  } catch (err) {
    console.log(err);
    console.log(err);
    return res.send(error(500, "Error in logging out"));
  }
}



export {
  signin,
  signup,
  logout,

}