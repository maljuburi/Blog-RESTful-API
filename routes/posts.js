// Validation
const Joi = require("joi");
// const faker = require("faker");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Read ALL
router.get("/", (req, res) => {
  Post.find()
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(ex => {
      console.log(ex);
      res.status(500).send("Something went wrong!");
    });
});

// Create Post
router.post("/", (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body
  });

  post
    .save()
    .then(result => {
      console.log("Created!", result);
      res.status(200).json({
        message: "Post created!",
        post: result
      });
    })
    .catch(ex => {
      console.log("didn't save", ex);
      res.status(500).json({
        error: ex
      });
    });
});

// Read Post
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .exec()
    .then(result => {
      if (result) {
        console.log(result);
        res.status(200).send(result);
      } else {
        res.status(404).json({
          message: "Post's not found"
        });
      }
    })
    .catch(ex => {
      console.log("Invalid Post", ex);
      res.status(500).json({
        error: ex
      });
    });
});

// Update Post
router.put("/:id", (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const { title, body } = req.body;
  Post.update(
    {
      _id: id
    },
    {
      $set: {
        title: title,
        body: body
      }
    },
    { new: true }
  )
    .exec()
    .then(result => {
      console.log("Updated!", result);
      res.status(200).json({
        message: "Post updated!",
        UpdatedPost: result
      });
    })
    .catch(ex => {
      console.log("Unable to update", ex);
      res.status(500).json({
        message: "Unable to update",
        error: ex
      });
    });
});

// Post deleted
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(ex => {
      res.status(500).send(ex);
    });
});

// Implementing Joi to validate inputs
// =============================
const validatePost = params => {
  const schema = {
    title: Joi.string()
      .min(3)
      .required(),
    body: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(params, schema);
};

module.exports = router;
