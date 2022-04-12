'use strict'

const express = require('express');
const path = require('path');
//require('dotenv').config()

//const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./auth');

const app = express();

app.use(cookieSession({
    name: 'session',
    maxAge: 24*60*60*1000,
    keys: ["Yellow panda","Green rat"],
}));



function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
  // if(!res.user){
  //   return res.send("User already logged in.");
  // }
  // res.sendStatus(401);
}

//app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
// Authenticate the session based on keys and call deseriliazeUser.
app.use(passport.session());

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'));
})

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  //console.log(req)
  res.json(req.user);
});

app.get('/logout', (req, res) => {
  req.logout();
  //req.session.destroy();
  req.session = null;
  res.send('Goodbye!');
  //res.redirect('/');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


app.listen(3000,()=>{
   console.log(3000);
 })
