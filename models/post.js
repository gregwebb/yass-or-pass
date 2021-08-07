const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId },
});

const dislikeSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId },
});

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  likes: [likeSchema],
  dislikes: [dislikeSchema],
});

module.exports = mongoose.model("Post", postSchema);
