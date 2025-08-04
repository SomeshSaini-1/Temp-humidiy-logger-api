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
        const { device_id, page = 1, limit = 100 } = req.body;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        let query = {};
        if (device_id && device_id !== "all") {
            query.device_id = device_id;
        }

        const info = await Info.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ date: -1 });

        const total = await Info.countDocuments(query);

        res.status(200).json(info)

        // res.status(200).json({
        //     data: info,
        //     currentPage: parseInt(page),
        //     totalPages: Math.ceil(total / limit),
        //     totalItems: total
        // });
    } catch (error) {
        console.error("Databass error : ", error);
        res.status(500).json({ error: error.message });
    }
}