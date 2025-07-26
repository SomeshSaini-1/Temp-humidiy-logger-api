const Device = require('../models/Device');

// Create a new device
exports.DeviceRegister = async (req, res) => {
  try {
    const {
      devicename,
      deviceid,
      region,
      category,
      comment,
      date,
      status,
      Organization,
      City,
      Mode,
    } = req.body;

    if (!devicename || !deviceid) {
      return res.status(400).json({ error: "Device name and ID are required" });
    }

    const device = new Device({
      devicename,
      deviceid,
      region,
      category,
      comment,
      date,
      status,
      Organization,
      City,
      Mode,
    });

    await device.save();

    res.status(201).json({ message: "Device Created" });
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get devices (use ?devicename=all or specific name)
exports.getDevice = async (req, res) => {
  try {
    const { devicename } = req.body;
    console.log("Requested device:", devicename);

    let devices;
    if (devicename === "all") {
      devices = await Device.find();
    } else {
      devices = await Device.find({ devicename });
    }

    res.status(200).json(devices);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a device (use DELETE /api/device/:deviceid)
exports.deleteDevice = async (req, res) => {
  try {
    const { deviceid } = req.body;
    await Device.deleteOne({ deviceid });

    res.status(200).json({ message: "Device deleted successfully." });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a device
exports.update_device = async (req, res) => {
  try {
    const {
      devicename,
      deviceid,
      region,
      category,
      comment,
      date,
      status,
      Organization,
      City,
      Mode,
    } = req.body;

    if (!deviceid) {
      return res.status(400).json({ error: "Device ID is required for update" });
    }

    const updateResult = await Device.updateOne(
      { deviceid },
      {
        $set: {
          devicename,
          region,
          category,
          comment,
          date,
          status,
          Organization,
          City,
          Mode,
        },
      }
    );

    res.status(200).json({ message: "Device updated", result: updateResult });
  } catch (error) {
    console.error("Error updating device:", error.message);
    res.status(500).json({ error: error.message });
  }
};
