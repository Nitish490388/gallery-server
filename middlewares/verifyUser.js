import jwt from 'jsonwebtoken';
import { success, error } from "../utils/responseWrapper.js";
const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
          return res.send(error(404, "Unauthorized login again !"))
        }
        const { _id } = data;
        //console.log(_id, email);
        req._id = _id;
        next();
      });

    } else if (req.user) {
      req._id = req.user._id;
      next();
    }
  } catch (error) {
    return res.send(error(500, "Something went wrong"));
  }

}

export default verifyUser;