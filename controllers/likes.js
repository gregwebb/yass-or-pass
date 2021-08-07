const Post = require('../models/post');

module.exports = {
    create,
    deleteLike,
    match
}


async function create(req, res){
 
    try {
        const post = await Post.findById(req.params.id);
        post.likes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await post.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.json({data: err})
    }
    
}

async function deleteLike(req, res){
    try {
        
        const post = await Post.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        post.likes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await post.save() // after you mutate a document you must save
        res.json({data: 'like removed'})
    } catch(err){
        res.json({error: err})
    }
}

async function match(req, res) {
    try {
      const [posts, dislikedPosts] = await Promise.all([ 
          Post.find(
          { likes: { $elemMatch: { user: req.user }}}),
          Post.find(
            { dislikes: { $elemMatch: { user: req.user }}}),
      ]);
            let total = [];
            let agree = [];
            let disagree = [];
    
            for (post in posts) {
                posts[post].likes.forEach(elem => 
                    agree.push(elem.username) &&
                    total.push(elem.username));
            }
            for (post in posts) {
                posts[post].dislikes.forEach(elem => 
                    disagree.push(elem.username) &&
                    total.push(elem.username));
            }
        
            for (post in dislikedPosts) {
                dislikedPosts[post].dislikes.forEach(elem => 
                    agree.push(elem.username) &&
                    total.push(elem.username));
            }
            for (post in dislikedPosts) {
                dislikedPosts[post].likes.forEach(elem => 
                    disagree.push(elem.username) &&
                    total.push(elem.username));
            }

              let countedAgrees = agree.reduce(function (agreeTotal, agreed) {
                if (agreed in agreeTotal) {
                  agreeTotal[agreed]++
                }
                else {
                  agreeTotal[agreed] = 1
                }
                return agreeTotal
              }, {});

              let countedTotal = total.reduce(function (counted, item) {
                if (item in counted) {
                  counted[item]++
                }
                else {
                  counted[item] = 1
                }
                return counted
              }, {})

              let match = [];
              Object.entries(countedAgrees).forEach(([k,v]) => {
                  let perc = (v/countedTotal[k]);
                  match.push({[k]: perc, total: countedTotal[k]});
              })
            
   
      res.status(200).json({ match });
    } catch (err) {}
  }