import { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


passport.use(new GoogleStrategy({
  clientID: 'Your Client ID',
  clientSecret: 'Your Client Secret',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
  // This function is called after the user has authenticated with Google.
  // You can use the accessToken, refreshToken, and profile to store the user's
  // information in a database or perform other actions.
  return cb(null, profile);
}));
