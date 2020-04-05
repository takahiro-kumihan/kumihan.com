// MongooseのSchemaオブジェクトで『オブジェクトの分割代入』を使って記述。
const mongoose = require("mongoose"), { Schema } = mongoose;

// Schema
var memberSchema = new Schema({
  name:     { first:
              { type: String, required: true },
              last:
              { type: String, required: true}  },
  email:    { type: String,
              required: true,
              lowercase: true,
              unique: true },
  c_code:   { type: Number,
              min: 100, max: 999 },
  password: { type: String,
              required: true },
  courses: [{ type: Schema.Types.ObjectId,
              ref: "Course" }],
  useredAccount: { type: Schema.Types.ObjectId,
                   ref: "User"}},
{ timestanps: true });

// Methods
memberSchema.virtual("fullName")
  .get(function() {
    return `${ this.name.last } ${ this.name.first }`
  });

// memberSchema.methods.getInfo = function() {
//   return `氏名：${ this.name }、メールアドレス：${ this.email }、コース番号：${ this.c_code }`;
// };

module.exports = mongoose.model("Member", memberSchema);
