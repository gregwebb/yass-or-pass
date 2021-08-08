const Post = require("../models/post");
const User = require("../models/user");

module.exports = {
  create,
  index,
  deletePost,
};

async function create(req, res) {
  const post = await Post.create({
    content: req.body.content,
    user: req.user,
  });
  const populatedPost = await post.populate("user").execPopulate();
  res.status(201).json({ post: populatedPost });
}

async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ posts });
  } catch (err) {}
}

async function deletePost(req, res) {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.json({ data: "post removed" });
  } catch (err) {
    console.log(err, "error deleting post");
  }
}
