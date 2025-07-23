const mongoose = require("mongoose");

const DeviceScama = new mongoose.Schema({
    devicename:  {type:String, required : true, unique: true},
    deviceid:  {type:String, required : true, unique: true},
    region:  String,
    category:  String,
    comment:  String,
    date:  String,
    status:  String,
    Organization : String,
    City: String,
    Mode: String,
},{ timestamps: true })

module.exports = mongoose.model("Device",DeviceScama)