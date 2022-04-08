const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongo');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
//extracts styles and scripts from subpage into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


var store = new MongoStore({
    uri: 'mongodb://localhost:27017/Chatbox_development',
    databaseName: 'Chatbox_development',
    collection: 'sessions'
},function(err){
    if(err){
        console.log("Error ",err);
    }
    else{
        console.log('Working...')
    }
});
  
// Catch errors
store.on('error', function(error) {
    console.log("error in storing",err);
});


app.use(require('express-session')({
secret: 'This is a secret',
cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
},
store: store,
resave: true,
saveUninitialized: true
}));

//mongo store used to store the session cookie in the db
// app.use(session({
//     name: 'Chatbox',
//     secret: 'kjbsakcasc',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: new MongoStore(
//         { 
//             uri: 'mongodb://localhost:27017/Chatbox_development',
//             collection: 'sessions'
//         }
//     )
// }));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router
app.use('/', require('./routes')); 

app.listen(port, (err) => {
    if(err)
        console.log(`Error in running: ${err}`);
    console.log(`server is running on port: ${port}`);
});