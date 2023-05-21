const mongoose = require("mongoose");

const adventureSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  telephone: {
    type: Number,
    required: true,
  },

  place: {
    type: String,
    required: true,
  },

  date_and_time: {
    type: Date,
    required: true,
  },

  countOFmembers: {
    type: Number,
    required: true,
  }
})

const Adventure = mongoose.model("Adventure", adventureSchema);
module.exports = Adventure;
