const express = require("express");
const router = express.Router();
const deviceControler = require("../controllers/deviceController");

router.post('/DeviceRegister',deviceControler.DeviceRegister);
router.post("/getDevice",deviceControler.getDevice);

module.exports = router;

