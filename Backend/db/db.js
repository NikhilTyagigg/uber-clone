const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Meow Connected to Db");
    })
    .catch((err) => console.log("Bhaw Error", err));
}

module.exports = connectToDb;
