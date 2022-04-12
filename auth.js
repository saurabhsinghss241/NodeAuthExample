// Import Passport and strategy.
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Define clientId and Secret.
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Define our strategy.
// If passReqToCallback is true request will be available to using which we can check current status of user.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://NodeAuthExample.saurabhsingh47.repl.co/auth/google/callback",
  passReqToCallback: true,
},
  function(request, accessToken, refreshToken, profile, done) {
    if(request.user){
      console.log('User already logged in.')
    }
    return done(null, profile);
  }));

// Creates cookie and saves the session data in that cookie.
passport.serializeUser(function(user, done) {
  const userData = {
    id:user.id,
    displayName:user.displayName,
    photo : user.photos[0].value,
  }
  console.log(userData)
  done(null, userData);
});

// Read the session info from the cookie.
passport.deserializeUser(function(user, done) {
  done(null, user);
});