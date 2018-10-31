const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  console.log(config.get("db"));
  mongoose
    .connect(
      config.get("db"),
      { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(ex => console.error("Couldn't connect to DB"));
};
