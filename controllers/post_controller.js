const Post = require('../models/post');

const create = (req, res) => {
    Post.Post.create({
        content: req.body.content,
        user: req.user._id
    }, (err, post) => {
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('back');
    });
}

module.exports = {
    create
};