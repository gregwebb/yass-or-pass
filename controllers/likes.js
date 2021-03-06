const Post = require("../models/post");

module.exports = {
  create,
  deleteLike,
  matches,
};

async function create(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    post.likes.push({
      username: req.user.username,
      userId: req.user._id,
      emoji: req.user.emoji,
    });
    await post.save();
    res.status(201).json({ data: "like added" });
  } catch (err) {
    res.json({ data: err });
  }
}

async function deleteLike(req, res) {
  try {
    const post = await Post.findOne({
      "likes._id": req.params.id,
      "likes.username": req.user.username,
    });
    post.likes.remove(req.params.id);
    await post.save();
    res.json({ data: "like removed" });
  } catch (err) {
    res.json({ error: err });
  }
}

async function matches(req, res) {
  try {
    const [posts, dislikedPosts] = await Promise.all([
      Post.find({ likes: { $elemMatch: { userId: req.user._id } } }),
      Post.find({ dislikes: { $elemMatch: { userId: req.user._id } } }),
    ]);
    let total = [];
    let agree = [];
    let disagree = [];

    for (post in posts) {
      posts[post].likes.forEach(
        (elem) =>
          agree.push([elem.username, elem.emoji]) &&
          total.push([elem.username, elem.emoji])
      );
    }

    for (post in posts) {
      posts[post].dislikes.forEach(
        (elem) =>
          disagree.push([elem.username, elem.emoji]) &&
          total.push([elem.username, elem.emoji])
      );
    }

    for (post in dislikedPosts) {
      dislikedPosts[post].dislikes.forEach(
        (elem) =>
          agree.push([elem.username, elem.emoji]) &&
          total.push([elem.username, elem.emoji])
      );
    }

    for (post in dislikedPosts) {
      dislikedPosts[post].likes.forEach(
        (elem) =>
          disagree.push([elem.username, elem.emoji]) &&
          total.push([elem.username, elem.emoji])
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

    let values = [];
    Object.entries(countedAgrees).forEach(([k, v]) => {
      let perc = v / countedTotal[k];
      values.push(k.split(","), perc);
    });

    values = values.flat();

    matches = values.reduce(function (result, value, index, array) {
      if (index % 3 === 0) result.push(array.slice(index, index + 3));
      return result;
    }, []);

    matches = matches.sort(function (a, b) {
      return b[2] - a[2];
    });

    matches = [].concat.apply([], matches);
    let index = matches.indexOf(req.user.username);
    matches.splice(index, 3);

    matches = matches.reduce(function (result, value, index, array) {
      if (index % 3 === 0) result.push(array.slice(index, index + 3));
      return result;
    }, []);

    rivals = matches.slice(matches.length-2, matches.length);
    besties = matches.slice(0,2);

    matches = matches.slice(0, 4);

    res.status(200).json({ countedAgrees, matches, rivals, besties });
  } catch (err) {}
}
