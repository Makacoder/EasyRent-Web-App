const express = require("express");
const House = require("../controllers/house.controller");
const authorize = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/auth.middleware");

const router = express.Router();
const upload = require("../utils/multer");
router.post(
  "/newHouse",
  // authorize,
  // isAdmin,
  House.addHouse
  // upload.single("aptImage"),
);
router.post("/addhouse", upload.array("pictures"), House.addHouse);
router.patch("/updateHouse", House.updateHouseInfo);
router.get("/searchHouse", House.searchForHouse);
router.get("/view-category/:category", House.viewCategory);
router.get("/viewHouse", House.fetchHouse);
router.get("/bedroomType/:bedroom", House.viewBedroomType);

module.exports = router;
