const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
connectToDb();

const cors = require("cors");

app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);
module.exports = app;
