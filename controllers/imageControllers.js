import { success, error } from "../utils/responseWrapper.js"
import cloudinary from "cloudinary";
import Image from "../models/imageModel.js";
import User from "../models/userModel.js";

const createImages = async (req, res) => {
  try {

    let images = [];
    if (typeof (req.body.images) === "string") {
      images.push(req.body.images);
    }
    else {
      images = req.body.images;
    }

    const user = await User.findById(req._id);

    const newImages_id = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Images"
      });

      const new_image = await Image.create({
        public_id: result.public_id,
        url: result.url,
        creator: user._id
      });


      user.uploads.push(new_image._id);
    }

    await user.save();

    return res.send(success(201, "Image Saved!"));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err.message));
  }
}

const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    return res.send(success(201, images));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err.message));
  }
}

// const getImages = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter (default to 1)
//     const itemsPerPage = parseInt(req.query.itemsPerPage) || 10; // Set the default number of items per page

//     const skip = (page - 1) * itemsPerPage;

//     const images = await Image.find()
// .sort({ createdAt: -1 }) // Sort by creation timestamp in descending order (latest first)
// .skip(skip)
// .limit(itemsPerPage);

//     const totalImages = await Image.countDocuments();

//     const totalPages = Math.ceil(totalImages / itemsPerPage);

//     return res.send(success(200, { images, totalPages }));
//   } catch (err) {
//     console.log(err);
//     return res.send(error(500, err.message));
//   }
// };



const deleteImage = async (req, res) => {
  try {
    return res.send(success(201, "Ok DltImg"));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err.message));
  }
}

const saveUserImage = async (req, res) => {
  try {
    const id = req._id;
    const { image } = req.body;

    //console.log(image);
    const user = await User.findById(id);
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "Avatar"
    });
    user.avatar.public_id = result.public_id;
    user.avatar.url = result.url;
    await user.save();

    return res.send(success(201, "Avatar Updated successfully"));
  } catch (error) {
    console.log(error);
    return res.send(error(500, err.message));
  }
}

export {
  createImages,
  getImages,
  deleteImage,
  saveUserImage
}