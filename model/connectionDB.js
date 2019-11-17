const mongoose = require("mongoose");

function connection() {
  mongoose.connect(
    "mongodb://localhost:27017/CRUD",
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => {
      if (!err) {
        console.log("database is up and running...");
      } else {
        console.log("there is error connecting to the database...");
      }
    }
  );

  mongoose.set("useFindAndModify", false);
}

module.exports = connection;
