const Comment = require('../models/comment');
const Post = require('../models/post');

const create = (req, res) => {
    Post.Post.findById(req.body.post, (err, post) => {
        if(post){
            console.log(post);
            Comment.comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, (err, comment) => {
                if(err){console.log('error in creating a post'); return;}
                post.Comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
};

module.exports = {
   create
};