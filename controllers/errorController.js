"use strict";

const httpStatus = require("http-status-codes");

// // エラー処理用のミドルウェアの実装　その1
// exports.logErrors = (err, req, res, next) => {
//   console.error(`=======アプリ内でエラーが発生しました。=======\n${ err.stack }`);
//   next(err);
// };

// エラー処理用のミドルウェアの実装　その1
exports.resNoResourceFound = (req, res) => {
  let errCode = httpStatus.NOT_FOUND;
  res.status(errCode);
  // 1 とりあえずHTMLで表示させる素っ気ないパターン
  // res.send(`${ errCode } | このページは存在しません。`);
  // 2　publicに置いたHTMLを読ませるパターン
  // res.sendFile(`./public/${ errCode }.html`, {
  //   root: "./"
  // });
  // viewsに置いたejsを読ませるパターン　他のファイルと見せ方を共通できる。
  res.render("error");
};

exports.resInternalError = (err, req, res, next) => {
  let errCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`エラーが発生しました。:\n${ errCode }`);
  res.status(errCode);
  res.send(`${ errCode } | アプリ内部でエラーが発生しています。`)
};