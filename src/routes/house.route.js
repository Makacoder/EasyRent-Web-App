const express = require("express");
const {
  addHouse,
  updateHouseInfo,
  searchForHouse,
  viewCategory,
  fetchHouse,
  viewBedroomType,
} = require("../controllers/house.controller");
const { authorize, iAmAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/newHouse",
  authorize,
  iAmAdmin,
  upload.single("aptImage"),
  house.addHouse
);
router.patch("/updatehouse", house.updateHouseInfo);
router.get("/searchhouse", house.searchForHouse);
router.get("/view-category/:category", house.viewCategory);
router.get("/viewHouse", house.fetchHouse);
router.get("/bedroomType/:bedroom", house.viewBedroomType);
// router.post("/addhouse", authorize, iAmAdmin, addHouse);

module.exports = router;
