const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  index,
  profile,
};

async function profile(req, res) {
  console.log(req.params);
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) res.status(404).json({ message: "bad parameters" });
    const [posts, likedPosts, dislikedPosts, myLikedPosts, myDislikedPosts] =
      await Promise.all([
        Post.find({
          $or: [
            { likes: { $elemMatch: { userId: user._id } } },
            { dislikes: { $elemMatch: { userId: user._id } } },
          ],
        }),
        Post.find({ likes: { $elemMatch: { userId: user._id } } }),
        Post.find({ dislikes: { $elemMatch: { userId: user._id } } }),
        Post.find({ likes: { $elemMatch: { userId: req.user._id } } }),
        Post.find({ dislikes: { $elemMatch: { userId: req.user._id } } }),
      ]);

    let total = [];
    let agree = [];
    let disagree = [];

    for (post in myLikedPosts) {
      myLikedPosts[post].likes.forEach(
        (elem) => agree.push(elem.username) && total.push(elem.username)
      );
    }

    for (post in myLikedPosts) {
      myLikedPosts[post].dislikes.forEach(
        (elem) => disagree.push(elem.username) && total.push(elem.username)
      );
    }

    for (post in myDislikedPosts) {
      myDislikedPosts[post].dislikes.forEach(
        (elem) =>
          agree.push(elem.username) && total.push([elem.username, elem.emoji])
      );
    }

    for (post in myDislikedPosts) {
      myDislikedPosts[post].likes.forEach(
        (elem) => disagree.push(elem.username) && total.push(elem.username)
      );
    }

    let countedAgrees = agree.reduce(function (agreeTotal, agreed) {
      if (agreed in agreeTotal) {
        agreeTotal[agreed]++;
      } else {
        agreeTotal[agreed] = 1;
      }
      return agreeTotal;
    }, {});

    let countedTotal = total.reduce(function (counted, item) {
      if (item in counted) {
        counted[item]++;
      } else {
        counted[item] = 1;
      }
      return counted;
    }, {});

    result = [
      (
        (countedAgrees[user.username] / countedTotal[user.username]) *
        100
      ).toFixed(2),
    ];

    res.status(200).json({
      posts: posts,
      user: user,
      likedPosts: likedPosts,
      dislikedPosts: dislikedPosts,
      result: result,
    });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, " this user in login");
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function index(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {}
}

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}
