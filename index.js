const config = require("config");
const posts = require("./routes/posts");
const express = require("express");
const app = express();

require("./DB/db")();
require("./middleware/prod")(app);

app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", posts);

app.get("/", (req, res) => {
  const data = {
    site_title: "POST API",
    header: "Welcome to this RESTful API"
  };
  res.render("home", data);
});

console.log(config.get("name"));
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
