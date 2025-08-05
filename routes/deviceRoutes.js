const express = require("express");
const router = express.Router();
const deviceControler = require("../controllers/deviceController");
const infomation = require("../controllers/infoController");

router.post('/DeviceRegister',deviceControler.DeviceRegister);
router.post("/getDevice",deviceControler.getDevice);
router.post('/Delete_device',deviceControler.deleteDevice);
router.post("/Update_device",deviceControler.update_device);

router.post("/add_Info",infomation.DeviceInfo);
router.post("/get_Info",infomation.get_DeviceInfo);
router.get("/Get_info_excle",infomation.Get_info_excle);


module.exports = router;

