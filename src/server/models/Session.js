const mongoose = require("mongoose");

// Define the User schema
const sessionSchema = new mongoose.Schema({
  idsession: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  players: {
    type: Array,
    required: false,
   
  },
  inventories: {
    type: Array,
    required: false
  },
  Maps: {
    type: Array,
    required: false
  },
 PlayersPos: {
    type: Array,
    required: false
  },
  Npcs: { 
    type:Array,
    required:false
  },
  Others: { 
    type: Array,
    required:false
  },
  
},{ collection: 'sessions' });


const Session = mongoose.model("Session", sessionSchema);


module.exports = Session;