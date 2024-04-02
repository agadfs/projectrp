const mongoose = require("mongoose");

// Define the User schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cantrade: {
    type: Boolean,
    required: false,
   
  },
  value: {
    type: String,
    required: false,
   
  },
  canequip: {
    type: Boolean,
    required: false,
  },
  atk: {
    type: String,
    required: false,
  },
  def: {
    type: String,
    required: false,
  },
  others: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  
},{ collection: 'Item' });


const Item = mongoose.model("Item", ItemSchema);


module.exports = Item;