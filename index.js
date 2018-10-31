require("express-async-errors");
const error = require("./middleware/error");
const appDebugger = require("debug")("app-debug");
const config = require("config");
const helmet = require("helmet");

const posts = require("./routes/posts");
const express = require("express");
const app = express();

require("./DB/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use("/api/posts", posts);

// handle errors
// ==============
app.use(error);

app.listen(8000, () => {
  appDebugger("Listening on port 8000...");
});
