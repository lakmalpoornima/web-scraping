const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  PId: String,
  categories: String,
  name_brand: String,
  name_i: String,
  name_j: String,
  name_tit:String,
  stock_status_T: String,
  stock_status_C: String,
  Wprice: String,
  Psp: String,
  Pinfo: String,
  Pinfo2: String,
  Blink: String,
  img_links: String,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
