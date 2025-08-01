const Info = require('../models/Info');


exports.DeviceInfo = async (req, res) => {
    try {

        const { id, devicename, device_id, Temp, hume, pm, date } = req.body;
        const infomation = new Info({
            id, devicename, device_id, Temp, hume, pm, date
        });

        await infomation.save();

        res.status(201).json({ message: "Data is successfully inserted." });
    } catch (error) {
        console.error("Databass error : ", error);
        res.status(500).json({ message: "Databass error", error: error.message })
    }

}



exports.get_DeviceInfo = async (req, res) => {
    try {
        const { device_id } = req.body;

        let info;
        if (device_id === "all") {
            info = await Info.find();
        } else {
            info = await Info.find({device_id});
        }
        res.status(200).json(info);
    } catch (error) {
        console.error("Databass error : ", error);
        res.status(500).json({ error: error.message });
    }
}