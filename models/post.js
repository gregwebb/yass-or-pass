const mongoose = require('mongoose');

const yassSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const passSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
  })

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,
    yass: [yassSchema],
    pass: [passSchema]
  })
 

module.exports = mongoose.model('Post', postSchema);