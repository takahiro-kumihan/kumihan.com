"use strict";

require("dotenv").config();

// const GMP = process.env.GOOGLE_MAP_API_KEY;

exports.showAbout = (req, res) => {
  res.render("about");
};

exports.showAccess = (req, res) => {
  res.render("access");
};

// exports.showAccess = (req, res) => {
//   res.render("access");
// };
exports.showAccess = (req, res) => {
  res.render("access", {
    googleMapApiKey: process.env.GOOGLE_MAP_API_KEY,
    greet: "hello"
  });
  // console.log(process.env.GOOGLE_MAP_API_KEY);
};

exports.showWorks = (req, res) => {
  res.render("works");
};

exports.getSignUpForm = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

exports.getDataForm = (req, res) => {
  res.render("trafic_data");
};

exports.showBootstrap = (req, res) => {
  res.render("bootstrap_sample");
};

