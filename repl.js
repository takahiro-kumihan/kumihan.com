const mongoose = require("mongoose");
const User = require("./models/user");
const Course = require("./models/course");

mongoose.connect(
  "mongodb://localhost:27017/kumihan_site",
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true }
);

var tmpUser,
    tmpCourse;

mongoose.Promise = global.Promise;

//////////////////////////////////////////////////////////////////////////
// アソシエーション　応用バージョン
User.deleteMany({})
  .then(ins => console.log(`\n>> ${ins.n}のドキュメントを破棄しました。`))
  .then(() => {
    return Course.deleteMany({});
  })
  .then(ins => console.log(`>> ${ins.n}のドキュメントを破棄しました。`))
  .then(() => {
    return User.create({
      name: "高広和恵",
      email: "kazue@email.com",
      c_code: 226 });
  })
  .then(User => {
    console.log(
      `>> Userモデルのドキュメント\n>> ${User.getInfo()}\n>> を生成しました。`
    );
  })
  .then(() => {
    return User.findOne({ name: /高広/ });
  })
  .then(ins => {
    tmpUser = ins;
    console.log(`>> 検索したユーザーは\n>> ${ins.getInfo()}`);
  })
  .then(() => {
    return Course.create({
      title: "西洋史",
      description: "西洋史概論を6ヶ月間で学ぶコースです。",
      c_code: 331,
      tag: ["バッハ", "パスカル"]
    });
  })
  .then(ins => {
    tmpCourse = ins;
    console.log(`>> ${ins.title}コースを生成しました。`);
  })
  .then(() => {
    tmpUser.courses.push(tmpCourse);
    tmpUser.save();
  })
  .then(() => {
    return User.populate(tmpUser, "courses");
  })
  .then(ins => console.log(ins))
  .then(() => {
    return User.find({
      courses: mongoose.Types.ObjectId(tmpCourse._id)
    });
  })
  .then(ins => console.log(ins))
  .catch(error => console.log(error));
