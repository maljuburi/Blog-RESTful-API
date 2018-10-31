// Validation
const Joi = require("joi");
const faker = require("faker");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Create a Post Model
// ====================
const Post = mongoose.model("post", postSchema);

// Read ALL
router.get("/", async (req, res) => {
  // throw new Error("coudnt get posts");
  const result = await Post.find();
  res.send(result);
});

// Read
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid Post");
  const post = await Post.findById(req.params.id);
  res.send(post);
});

// Create
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { title, body } = req.body;
  const q = `insert into posts(title, body) values("${title}", "${body}")`;
  connection.query(q, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Update
router.put("/:id", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id } = req.params;
  const { title, body } = req.body;
  const q = `update posts set title = "${title}", body = "${body}" where id = ${id}`;

  connection.query(q, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0)
      return res.status(404).send("Post does not exist!");
    console.log(result.affectedRows);
    res.send(result);
  });
});

// Delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const q = `delete from posts where id = ${id} `;

  connection.query(q, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0)
      return res.status(404).send("Post already deleted!");
    res.send(result);
  });
});

const validateCourse = post => {
  const schema = {
    title: Joi.string()
      .min(3)
      .required(),
    body: Joi.string()
      .min(10)
      .required()
  };

  return (result = Joi.validate(post, schema));
};

module.exports = router;
