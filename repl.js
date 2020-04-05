const mongoose = require("mongoose");
const User = require("./models/user");
const Member = require("./models/member");
const Course = require("./models/course");

mongoose.connect(
  "mongodb://localhost:27017/kumihan_site",
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true }
);

var tmpUser,
    targetUser,
    tmpMember,
    tmpCourse;

mongoose.Promise = global.Promise;

Member.deleteMany({})
  .then(ins => console.log(`\n>> ${ins.n}のドキュメントを破棄しました。`))
  .then(() => {
    return Member.create({
      name: { last: "高広", first: "和恵" },
      email: "kazue@email.com",
      password: "626" })
  })
  .then(new_member => {
    tmpMember = new_member;
    console.log(new_member);
    console.log(`${ new_member.fullName }さんをメンバーに追加しました。`);
    return User.findOne({ email: new_member.email });
  })
  .then(found_user => {
    tmpMember.useredAccount = found_user;
    tmpMember.save()
  .then(member => console.log(`${ member.fullName }のデータを更新しました。`))
  })
  .catch(error => console.log(error.message));

// //////////////////////////////////////////////////////////////////////////
// // アソシエーション　応用バージョン
// User.deleteMany({})
//   .then(ins => console.log(`\n>> ${ins.n}のドキュメントを破棄しました。`))
//   .then(() => {
//     return Course.deleteMany({});
//   })
//   .then(ins => console.log(`>> ${ins.n}のドキュメントを破棄しました。`))
//   .then(() => {
//     return User.create({
//       name: "高広和恵",
//       email: "kazue@email.com",
//       c_code: 226 });
//   })
//   .then(User => {
//     console.log(
//       `>> Userモデルのドキュメント\n>> ${User.getInfo()}\n>> を生成しました。`
//     );
//   })
//   .then(() => {
//     return User.findOne({ name: /高広/ });
//   })
//   .then(ins => {
//     tmpUser = ins;
//     console.log(`>> 検索したユーザーは\n>> ${ins.getInfo()}`);
//   })
//   .then(() => {
//     return Course.create({
//       title: "西洋史",
//       description: "西洋史概論を6ヶ月間で学ぶコースです。",
//       c_code: 331,
//       tag: ["バッハ", "パスカル"]
//     });
//   })
//   .then(ins => {
//     tmpCourse = ins;
//     console.log(`>> ${ins.title}コースを生成しました。`);
//   })
//   .then(() => {
//     tmpUser.courses.push(tmpCourse);
//     tmpUser.save();
//   })
//   .then(() => {
//     return User.populate(tmpUser, "courses");
//   })
//   .then(ins => console.log(ins))
//   .then(() => {
//     return User.find({
//       courses: mongoose.Types.ObjectId(tmpCourse._id)
//     });
//   })
//   .then(ins => console.log(ins))
//   .catch(error => console.log(error));
