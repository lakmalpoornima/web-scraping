const express = require('express');
const router = express.Router();
const multer = require('multer');
const XlsxPopulate = require('xlsx-populate')
const Item = require('../models/item');
//const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const ExcelJS = require('exceljs');


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
          name_tit:data[i][5],
          stock_status_T: data[i][6],
          stock_status_C: data[i][7],
          Wprice: data[i][8],
          Psp: data[i][9],
          Pinfo: data[i][10],
          Pinfo2: data[i][11],
          Blink: data[i][12],
          img_links: data[i][13],
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

router.get('/items/export', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
    //console.log(items)
   
    // const csvWriter = createCsvWriter({
    //   path: "G:/robotikka/items.csv",
    //   header: [
    //     { id: "PId", title: "PId" },
    //     { id: "categories", title: "categories" },
    //     { id: "name_brand", title: "name_brand" },
    //     { id: "name_i", title: "name_i" },
    //     { id: "name_j", title: "name_j" },
    //     { id: "name_tit", title: "name_tit" },
    //     { id: "stock_status_T", title: "stock_status_T" },
    //     { id: "stock_status_C", title: "stock_status_C" },
    //     { id: "Wprice", title: "Wprice" },
    //     { id: "Psp", title: "Psp" },
    //     { id: "Pinfo", title: "Pinfo" },
    //     { id: "Pinfo2", title: "Pinfo2" },
    //     { id: "Blink", title: "Blink" },
    //     { id: "img_links", title: "img_links" },
    //   ],
    //   encoding: "utf8",
    // });
    
    // csvWriter
    //   .writeRecords(items)
    //   .then(() =>
    //     console.log("Write to bezkoder_mongodb_csvWriter.csv successfully!")
    //   );

    const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('items');

worksheet.columns = [
  { header: "PId", key: "PId" , width: 20},
      { header: "categories", key: "categories", width: 20 },
      { header: "name_brand", key: "name_brand", width: 20 },
      { header: "name_i", key: "name_i" , width: 20},
      { header: "name_j", key: "name_j", width: 20 },
      { header: "name_tit", key: "name_tit", width: 20 },
      { header: "stock_status_T", key: "stock_status_T", width: 20 },
      { header: "stock_status_C", key: "stock_status_C", width: 20 },
      { header: "Wprice", key: "Wprice" , width: 20},
      { header: "Psp", key: "Psp" , width: 20},
      { header: "Pinfo", key: "Pinfo" , width: 20},
      { header: "Pinfo2", key: "Pinfo2" , width: 20},
      { header: "Blink", key: "Blink", width: 20 },
      { header: "img_links", key: "img_links" , width: 20},
  
];

items.forEach((item) => {
  worksheet.addRow(item);
});

// Save the workbook to a file
workbook.xlsx.writeFile('item.xlsx')
  .then(() => {
    console.log('File saved.');
  })
  .catch((error) => {
    console.error('Error saving file:', error);
  });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

module.exports = router;
