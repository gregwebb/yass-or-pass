const Post = require('../models/post');

module.exports = {
    create,
    deleteDislike
}

async function create(req, res){
 
    try {
        const post = await Post.findById(req.params.id);
        post.dislikes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await post.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
       
        res.json({data: err})
    }
    
}

async function deleteDislike(req, res){
    try {
        
        const post = await Post.findOne({'dislikes._id': req.params.id, 'dislikes.username': req.user.username});
        post.dislikes.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await post.save() // after you mutate a document you must save
        res.json({data: 'dislike removed'})
    } catch(err){
        res.json({error: err})
    }
}