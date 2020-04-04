const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Schema
const courseSchema = new Schema({
  title:       { type: String,
                 required: true },
  description: { type: String,
                 required: true,
                 lowercase: true,
                 unique: true },
  c_code:      { type: Number,
                 min: 100, max: 999 },
  tag: [] 
});

// Methods

// モジュール化
module.exports = mongoose.model("Course", courseSchema);