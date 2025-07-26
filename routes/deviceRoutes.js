const express = require("express");
const router = express.Router();
const deviceControler = require("../controllers/deviceController");

router.post('/DeviceRegister',deviceControler.DeviceRegister);
router.post("/getDevice",deviceControler.getDevice);
router.post('/Delete_device',deviceControler.deleteDevice);
router.post("/Update_device",deviceControler.update_device)

module.exports = router;

