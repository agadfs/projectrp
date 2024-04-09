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
  weight: {
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
  typewear: {
    type: String,
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
  strength: {
    type: Number,
   required: false,
  },
  dexterity: {
    type: Number,
   required: false,
  },
  constitution: {
    type: Number,
   required: false,
  },
  intelligence: {
    type: Number,
   required: false,
  },
  wisdom: {
    type: Number,
   required: false,
  },
  charisma: {
    type: Number,
   required: false,
  }
  
},{ collection: 'Item' });


const Item = mongoose.model("Item", ItemSchema);


module.exports = Item;