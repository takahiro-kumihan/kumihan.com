const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const userSchema = new Schema({
  name:     { type: String,
              required: true },
  email:    { type: String,
              required: true,
              lowercase: true,
              unique: true },
  c_code:   { type: Number,
              min: 100, max: 999 },
  courses: [{ type: mongoose.Schema.Types.ObjectId,
              ref: "Course" }]
});

// Methods
userSchema.methods.getInfo = function() {
  return `氏名：${ this.name }、メールアドレス：${ this.email }、コース番号：${ this.c_code }`;
};

module.exports = mongoose.model("User", userSchema);
