import { Request, Response, Router } from "express"

import passport from 'passport';

export class AuthController {
    
    constructor(

    ){}
    
    public google =  passport.authenticate('google', {
        scope: ['profile']
    })
  
    public google_callback = passport.authenticate('google', {
        failureRedirect: '/login'
    })
    
    public after_google_callbeack = (req: Request, res: Response) => {
        console.log("hallow world")
        // This function is called after the user has authenticated with Google and
        // is redirected back to the app. You can use the information in the request
        // object (req) to redirect the user to the appropriate page or perform other
        // actions.
        res.redirect('/');
    }
  
}
