const mongoose = require("mongoose");

const InfoScama = new mongoose.Schema({
    id: String,
    devicename: String,
    device_id: String,
    Temp: String,
    hume: String,
    pm: String,
    date: String,
}, { timestamps: true })

module.exports = mongoose.model("Info", InfoScama);