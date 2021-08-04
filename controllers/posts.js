const Post = require("../models/post");
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3();
const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
    create,
    index,
  };

  function create(req, res) {
    console.log(req.body, req.user)
      const post = new Post({...req.body});
      try {
        post.content = "testing";
        post.user = req.user;
        post.save();
        const populatedPost = post.populate("user").execPopulate();
        res.json({ token });
      } catch (err) {
        // Probably a duplicate email
        res.status(400).json(err);
      }
    }
  
  async function index(req, res) {
    try {
      const posts = await Post.find({}).populate("user").exec();
      res.status(200).json({ posts });
    } catch (err) {}
  }

