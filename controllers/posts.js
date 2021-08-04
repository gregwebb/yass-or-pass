const Post = require("../models/post");


module.exports = {
    create,
    index,
  };

 async function create (req, res) {
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

