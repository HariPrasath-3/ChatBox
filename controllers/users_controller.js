const User = require('../models/user');

const profile = (req, res) => {
    return res.render('user_profile', {
        title: "Profile"
    }); 
};

const signup = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('./profile');
    }
    return res.render('user_signup', {
        title: "chatbox | sign up"
    });
}; 

const signin = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('./profile');
    }
    return res.render('user_signin', {
        title: "chatbox | sign in"
    });
};


const create = (req, res) => {
    if(req.body.password != req.body.confirm_password){
        return  res.redirect('back');
    }
    User.user.findOne({email: req.body.email}, (err, user) => {
        if(err){console.log('error in finding user in signing up');return;}
        if(!user){
            User.user.create(req.body, (err, user) => {
                if(err){console.log('error in creating user while signing up');return;}
                return res.redirect('/users/signin');
            });
        }else{
            return  res.redirect('back');
        }
    });
};

const createSession = (req, res) => {
    return res.redirect('/');
};

const destroysession = (req, res) => {
    req.logout();
    return res.redirect('/');
}
module.exports = {
    profile,
    signin,
    signup,
    create,
    createSession,
    destroysession
};