const mongoose = require("mongoose");

const Dog = new mongoose.Schema({
  name: String,
  gender: String,
  ownerName: String,
});

const DogModel = mongoose.model("Dog", Dog);

module.exports = { DogModel };
