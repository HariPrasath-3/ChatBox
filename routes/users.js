const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/users_controller');
const passport = require('passport');
const { user } = require('../models/user');

console.log('router loaded');

router.get('/profile', passport.checkAuthentication, usercontroller.profile);
router.get('/signup', usercontroller.signup);
router.get('/signin', usercontroller.signin);
router.post('/create', usercontroller.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'}
), usercontroller.createSession);
router.get('/signout', usercontroller.destroysession);
module.exports = router;