const express = require("express");
const Tkph = require("../model/tkphschemea");
const router = express.Router();



router.get("/:registrationNumber", async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  try {
    const tkph = await Tkph.findOne({
      truck: registrationNumber,
    });
    console.log(tkph);
    console.log("tkph send");
    
    res.json(tkph).status(200);
  }
  catch  (error) {
        res.json({ message: error.message }).status(400);
    }
}
);



module.exports = router;