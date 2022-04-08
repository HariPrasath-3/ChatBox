const Post = require('../models/post');

const home = function(req, res){
    Post.Post.find({})
    .populate('user')
    .populate({
        path: 'Comments',
        populate: {
            path: 'user'
        }
    }).
    exec((err, posts) => {
        return res.render('home', {
            title: "Home",
            posts: posts
        });
    }); 
}

module.exports = {
    home
};