const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        //find the user and establish the identiy
        User.user.findOne({email: email}, (err, user) => {
            if(err){
                console.log('Error in finding user --> passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid Username/password');
                return done(null, false);
            }
            console.log(user.name, " just logged in");
            return done(null, user);
        });
    }    
));

//serializing the user to decide which key is to be kept in the cookie

passport.serializeUser((user, done) => {
    console.log("Serializing the user, ",user.name);
    done(null, user.id);
});
// deserializing the user from the key in the cookie
passport.deserializeUser((id, done) => {
    console.log("The id to deserialize is ",id);
    // User.user.findById(id,function(err,user){
    //     if(err){
    //         console.log("Cannot find deserialized error",err);
    //         return  done(err);
    //     }
    //     else{
    //         return done(null, user);
    //     }
    // });

    // User.user.findOne({_id:id},function(err,user){
    //     if(err){
    //         console.log("Cannot find deserialized error",err);
    //         return  done(err);
    //     }
    //     else{
    //         return done(null, user);
    //     }
    // });

    User.user.findOne({_id: id}, (err, user) => {
        if(err){
            console.log('Error in deserializing');
            return  done(err);
        }
        console.log("The serialized user is ",user.name);
        return done(null, user);
    });
});

//check if the user is authenticate
passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = (req, res, next) => {
    console.log("in setauthen..\n",req.user);
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = {
    passport
};