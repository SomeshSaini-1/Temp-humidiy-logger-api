
const Device = require('../models/Device')

exports.DeviceRegister = async (req,res) => {
    try{
        const {devicename, deviceid, region, category, comment, date, status, Organization, City, Mode} = req.body;
        
        const device = new Device({devicename, deviceid, region, category, comment, date, status, Organization, City, Mode});
        await device.save();
        
        res.status(201).json({message : "Device Created"});
        

    }catch(error){
        res.status(500).json({ error: error.message });
        console.error("this error : ",error);
    }
}



exports.getDevice = async (req,res) => {
    try{
        const {devicename} = req.body;
        console.log(devicename);
        let device ;
        if(devicename === "all"){
         device   = await Device.find();
        }else{
         device   = await Device.find({devicename : devicename});
        }

        res.status(200).json(device)
    }catch(error) {
        console.error("Databass error : ", error);
        res.status(500).json({ error: error.message });
    }
}