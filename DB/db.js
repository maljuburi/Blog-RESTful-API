const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      "mongodb://localhost/restful_api",
      { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(ex => console.error("Couldn't connect to DB"));
};
