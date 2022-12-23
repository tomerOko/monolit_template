import { Request, Response, Router } from "express"

import passport from 'passport';

export class AuthController {
    
    constructor(
    ){}


    public passport_authenticate = passport.authenticate(
        "google-one-tap",
        { failureRedirect: "/login" },
        (err, user) => {
          // Do whatever you need
        }
    )

    public post_succseful_authentication = async (req: Request, res: Response) => {
        // Successful authentication, redirect home.
        res.redirect("/");
    }
    


    
}
