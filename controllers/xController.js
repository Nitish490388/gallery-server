import User from "../models/userModel.js";
import { error, success } from "../utils/responseWrapper.js";


const getUser = async (req, res) => {
  try {
    const _id = req._id;
    const user = await User.findById(_id);
    //console.log(user);
    return res.send(success(201, user));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err.message));
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(success(201, users));
  } catch (error) {

  }
}

export {
  getUser,
  getAllUsers
}