const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./server/routes/authRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  requireAuth,
  checkUser,
} = require("./server/middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use(requireAuth);
app.get("*", checkUser);

const routes = require("./server/routes/diseaseRoutes.js");
app.use("/", routes);

app.use(authRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));
