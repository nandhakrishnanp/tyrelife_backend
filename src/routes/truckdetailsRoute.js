const express = require("express");
const router = express.Router();

const {
  GetTruckData,
  getAllTruckdetails,
} = require("../controller/truckdetailController");



router.get("/", getAllTruckdetails);
router.get("/:registrationNumber", GetTruckData);

module.exports = router;
