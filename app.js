"use strict";
const path = require("path");
const bodyParser = require("body-parser");
const { App } = require("./config");
const { TodoRouter } = require("./routes/todo");

const cors = require("cors");
const express = require("express");

const app = express();

const fetchView = (name) => {
  return path.resolve(__dirname, "./views", name);
};
app.use("/static", express.static(path.join(__dirname, "./assests")));

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/login", (req, res) => {
  console.log("This is my login page");
});

app.get("/", (req, res) => {
  res.render(fetchView("index"), { name: "My Todo Application", baseUrl: App.BASE_URL });
});

app.use("/todo", TodoRouter);

module.exports = {
  app
}