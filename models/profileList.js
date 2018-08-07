const mongoose = require("mongoose");

const ProfileList = mongoose.model(
  "ProfileList",
  new mongoose.Schema({
    profile: String
  })
);

exports.ProfileList = ProfileList;
