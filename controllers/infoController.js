const Info = require('../models/Info');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');


exports.Get_info_excle = async (req, res) => {
    try {
        const { device_id, from, to } = req.query;
        console.log(device_id, from, to);

        const info = await Info.find({
            device_id: device_id,
            createdAt: {
                $gte: new Date(`${from}T00:00:00Z`),
                $lte: new Date(`${to}T23:59:59Z`)
            }
        }).lean(); // use .lean() to return plain JS objects  

        if (info.length === 0) {  
            return res.status(404).json({ message: "No data found for the given criteria.  " });
        }

        // Convert to worksheet
        const worksheet = XLSX.utils.json_to_sheet(info);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Info');

        // Generate buffer
        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Set headers
        res.setHeader('Content-Disposition', 'attachment; filename="info-data.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send the file
        res.send(buffer);

    } catch (error) {
        console.error("error : ", error);
        res.status(500).json({ message: "error", error: error.message });
    }
};

exports.Get_info_pdf = async (req, res) => {
  try {
    const { device_id, from, to } = req.query;

    const info = await Info.find({
      device_id: device_id,
      createdAt: {
        $gte: new Date(`${from}T00:00:00Z`),
        $lte: new Date(`${to}T23:59:59Z`)
      }
    }).lean();

    if (info.length === 0) {
      return res.status(404).json({ message: "No data found for the given criteria." });
    }

    // Create PDF document
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Set response headers
    res.setHeader('Content-Disposition', 'attachment; filename="info-data.pdf"');
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF stream to response
    doc.pipe(res);

    // Title
    doc.fontSize(18).text('Info Data Report', { align: 'center' });
    doc.moveDown();

    // Table header
    const headers = Object.keys(info[0]);
    doc.fontSize(12).font('Helvetica-Bold');
    headers.forEach(h => doc.text(h, { continued: true, width: 100 }));
    doc.moveDown(0.5);
    doc.font('Helvetica');

    // Table data
    info.forEach(record => {
      headers.forEach(key => {
        const value = record[key] !== null ? record[key].toString() : '';
        doc.text(value, { continued: true, width: 100 });
      });
      doc.moveDown(0.5);
    });

    doc.end(); // Finish writing

  } catch (error) {
    console.error("error : ", error);
    res.status(500).json({ message: "error", error: error.message });
  }
};


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


// exports.Get_info_excle = async (req, res) => {
//     try {
//         const { device_id, from, to } = req.body;
//         console.log(device_id,from,to);

//         const info = await Info.find({
//             device_id : device_id,
//             createdAt: {
//                 $gte: `${from}T00:00:00Z`,
//                 $lte: `${to}T23:59:59Z`
//             }
//         });

//         console.log(info);

//         res.status(200).json(info);


//     } catch (error) {
//         console.error("error : ", error);
//         res.status(500).json({message : "error",error : error.message})
//     }
// }

