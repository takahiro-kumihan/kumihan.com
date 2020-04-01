"use strict";

const express = require("express"),
  app = express(),
  homeContoller = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

////////////////////////////////////////////////////// 質問200314
// bodyの解析でURLエンコーディングとJSONのパラメータの処理をする。
// と説明だったが、全然イメージできてない。
// 時間がないだろうから、次回に廻す可能性が大きい。
app.use(
  express.urlencoded({
    extended: false
  })
  );
app.use(express.json());
  
////////////////////////////////////////////////////// 質問200314

// パスの経路よりも先にassetsを読み込ませてみる。
// CSS、JavaScript、 画像等の置き場は『public』と設定する。
// 確認用のパス　http://localhost:3000/images/cat.jpg
//             http://localhost:3000/css/bootstrap.css
app.use(express.static('public'));
// あとは、layout.ejsにCSSのパスを教えればいいはず。

// 以下2行の記述順が
// app.get("path/to/path", homeController.hogehogeMethod);)
// よりも早く読み込ませないといけない罠があるので注意。
// expressのインスタンスに『express-ejs-layouts』を使うことを宣言してる。
app.use(layouts);

// プロジェクトディレクトリの『views』ディレクトリを
// テンプレートの置き場にしていると設定する。
// app.set("views", "./views");  // あとでコメントインする
app.set("view engine", "ejs");


// Routing
// ルートのアクセスを設定しておく
// for test
// app.get("/", (req, res) => {
//   res.send("<h3>仮想のインデックス　ここはルート。</h3>");
// });
app.get("/", (req, res) => {
  res.render("index");
});
// viewsの中を見て、controllerを参照してちゃんとファイルを読んでいる。
app.get("/about", homeContoller.showAbout);
app.get("/access", homeContoller.showAccess);
app.get("/works", homeContoller.showWorks);
app.get("/contact", homeContoller.getSignUpForm);
app.get("/trafic_data", homeContoller.getDataForm);

app.get("/bootstrap_sample", homeContoller.showBootstrap);

// エラー処理
// app.use(errorController.logErrors);
app.use(errorController.resNoResourceFound);
app.use(errorController.resInternalError);

// 環境変数でポートの指定がなければ3000番を使う
// 『app.get』で値を取り出す
app.set("port", process.env.PORT || 3000);
// ここで実行
app.listen(app.get("port"), () => {
  console.log(`Webサーバは起動しています。このポートを監視中: ${ app.get("port") }番`);
});