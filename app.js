const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./route.js"));

app.listen(3000, () => {
  console.log("App is running sucessfully in address 3000");
});
