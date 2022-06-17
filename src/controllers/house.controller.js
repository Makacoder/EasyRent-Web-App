const House = require("../models/house.model");
const cloudinaryUploadMethod = require("../utils/cloudinary");
const path = require("path");
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const AppError = require("../utils/appError");
require("dotenv").config();

//creating data for houses
exports.addHouse = async (req, res, next) => {
  try {
    let {
      address,
      city,
      state,
      description,
      isItFurnished,
      propertyType,
      bedroom,
      bathroom,
      toilet,
      amenities,
      price,
      negotiable,
      photos,
    } = req.body;

    if (
      !address ||
      !city ||
      !state ||
      !description ||
      !isItFurnished ||
      !propertyType ||
      !bedroom ||
      !bathroom ||
      !toilet ||
      !amenities ||
      !price ||
      !negotiable ||
      !photos
    ) {
      return res.status(401).json({
        message: "Please Fill in the required fields",
      });
    }
    let urls = [];
    let files = req.files;
    if (!files) return next(new AppError("No picture attached..", 400));
    for (let file of files) {
      let { path } = file;
      let newPath = await cloudinaryUploadMethod(path);

      urls.push(newPath);
    }
    photos = urls.map((url) => url.res);
    let newHouse = await House.create({
      address,
      city,
      state,
      description,
      isItFurnished,
      propertyType,
      bedroom,
      bathroom,
      toilet,
      amenities,
      price,
      negotiable,
      photos,
      //user: req.user.id,
    });
    return successResMsg(res, 201, {
      message: "House added successfully",
      newHouse,
    });
  } catch (error) {
    console.log(error);
    return errorResMsg(res, 500, { message: error.message });
  }
};

// update house
exports.updateHouseInfo = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const houseUpdated = await House.findOneAndUpdate({ _id: _id }, req.body, {
      new: true,
    });
    return successResMsg(res, 200, {
      message: "success",
      houseUpdated,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

// users searching for houses
exports.searchForHouse = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const searchHouse = await House.find({ _id });
    return successResMsg(res, 200, {
      message: "success",
      searchHouse,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

// users viewing houses by categories
exports.viewCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const viewCategory = await House.find({ category });
    return successResMsg(res, 200, {
      message: "success",
      viewCategory,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

// viewing the details of all registered houses
exports.fetchHouse = async (req, res, next) => {
  try {
    const viewHouse = await House.find();
    return successResMsg(res, 200, {
      message: "success",
      viewHouse,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

// viewing all bedroomType results
exports.viewBedroomType = async (req, res, next) => {
  try {
    const { bedroomType } = req.params;
    const bedroomTypes = await House.find({ bedroomType });
    return successResMsg(res, 200, {
      message: "success",
      bedroomTypes,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

// post house images using cloudinary
exports.addhouseimage = async (req, res, next) => {
  try {
    const urls = [];
    const files = req.files;
    if (!files) return next(new AppError("No picture attached..", 400));
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryUploadMethod(path);

      urls.push(newPath);
    }
    images = urls.map((url) => url.res);
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

exports.fetchBookmarkList = async (req, res, next) => {
  try {
    // const filename = req.file;
    const bookmarkList = await House.find();
    return successResMsg(res, 200, {
      message: "Bookmark listed successfully",
      bookmarkList,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

exports.fetchPropertyDetails = async (req, res, next) => {
  try {
    // const filename = req.file;
    const propertyDetails = await House.find();
    return successResMsg(res, 200, {
      message: "Property displayed successfully",
      propertyDetails,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
