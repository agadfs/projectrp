const mongoose = require("mongoose");

// Define the User schema
const InventorySchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  gameId: {
    type: String,
    required: true
  },
  Items: {
    type: Array,
    required: false,
   
  },
  Stats: {
    type: Object,
    required: false,
   
  }
  
},{ collection: 'Inventory' });


const Inventory = mongoose.model("Inventory", InventorySchema);


module.exports = Inventory;