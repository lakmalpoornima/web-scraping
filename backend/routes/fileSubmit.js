const express = require('express');
const router = express.Router();
const multer = require('multer');
const XlsxPopulate = require('xlsx-populate')
const Item = require('../models/item');


// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadAndAddData', upload.single('excelFile'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const workbook = await XlsxPopulate.fromDataAsync(fileBuffer);
    const sheet = workbook.sheet(0);

    const data = sheet.usedRange().value();

    for (let i = 1; i < data.length; i++) {
      const newItem = new Item({
        PId: data[i][0],
        categories: data[i][1],
          name_brand: data[i][2],
          name_i: data[i][3],
          name_j: data[i][4],
          stock_status_T: data[i][5],
          stock_status_C: data[i][6],
          Wprice: data[i][7],
          Psp: data[i][8],
          Pinfo: data[i][9],
          Pinfo2: data[i][10],
          Blink: data[i][11],
          img_links: data[i][12],
      });

      await newItem.save();
    }
    console.log('Data:', data);
    res.status(201).json({ message: 'Data added to the database.' });
  } catch (err) {
    console.error('Error processing Excel file and adding data: ', err);
    console.log('Data:', data); // Log the data for debugging purposes
    res.status(500).send('Error processing Excel file and adding data.');
  }
});

module.exports = router;
