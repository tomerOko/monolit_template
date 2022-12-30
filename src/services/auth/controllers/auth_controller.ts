import { Request, Response, Router } from "express"
import { create_error } from "../../../errors/error_factory";
import { OAuth2Client } from 'google-auth-library';
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";


import { config } from "../../../config/confing_mock";
import { wrap, wrapSync} from "../../../utilities/function_wrapping";

export type GoogleUser = {
    name: string,
    family_name: string,
    email: string
    //TODO: add profile picture
}

//TODO: think about sign in vs sign up flows

//TODO: clean this, create service, helpers, etc

//TODO: i will use user_email as user_id because user id might not be exsiting yet becuse sign in and sign up are the same flow now

export type AuthPayload = {
    user_email: string,
}
    

export type JwtPayload = Record<string, any>


export class AuthController {
    
    private google_client: OAuth2Client
    
    constructor(){
        this.google_client = new OAuth2Client();
    }

    // גם עם סיסמא וגם עם גוגל
    // אני מחפש את המייל מהסרביס של היוסר
    // חיבור גוגל משתמש גוגל מחזיר לו טוקן בהדר עם היוסר אידי ותשובה של התחברות מוצלחת ויוסר אי די ושהקליינט יבקש את הפרטים מגט יוסר בי אי די
         // בבקשה הבאה כל סרביס נעזר בהלפר אצלי לוודא שהיוסר שהטוקן שלו תקין ולא פג תוקף
    // חיבור סיסמא משתמש סיסמא מחזיר לו טוקן בהדר עם היוסר אידי ותשובה של התחברות מוצלחת ויוסר אי די ושהקליינט יבקש את הפרטים מגט יוסר בי אי די
    // חיבור גוגל משתמש סיסמא מחזיר לו תשובה שכבר יש חשבון על שמו עם סיסמא ולא שם לו שום הדר
    //  חיבור סיסמא משתמש גוגל מחזיר לו תשובה שכבר יש חשבון על שמו עם סיסמא ולא שם לו שום הד
    // חיבור גוגל אין את המייל - יוצר משתמש בסרביס משתמשים ומחזיר לו טוקן בהדר עם היוסר אידי ותשובה של התחברות מוצלחת ויוסר אי די ושהקליינט יבקש את הפרטים מגט יוסר בי אי די, לא הכי יעיל אבל קריא
    // חיבור סיסמא אין את המייל
        // יוצר לו יוסר עם מייל בלבד ושהיוסר סרביס יתמודד איתו
            // שולח מייל וידוי לכתובת מייל שסופקה
            // כשהקליינט מקבל את היוסר אי די הוא מבקש פרטים כמו בכל פלוו אחר, מקבל שגיאה שהמייל לא מוודא, ומציג למשתמש שהוא צריך לוודא מייל 
            // אחר כך ניגש שוב לקבל את הפרטים ומקבל שגיאה שחסרים פרטים ושולח ליוסר סרביס בקשה 
    // אפשר ליצור לו מתמש לא פעיל ולהגיד ולהחזיר לקליינט שגיאה שהמשתמש לא פעיל
    // אפשר ליצור בבסיס נתונים שלי יוסר חלקי, להחזיר לו טוקן עם אי די של הזמני, לבקשר ממנו עוד פרטים, ואז ליצור משתמש
    // אפשר להגיד לקליינט שהמשתמש לא קיים ושישלח בקשה ליצירת משתמש
    // אבל אז כל אחד יכול ליצור משתמש וצריך גם לוודא את המייל
    // אפשר בסרביס של היוסרים ליצור משתמש זמני שהמייל לא עבר ווידוי, ושחסרים פרטים
        // ואז מה, ואז אני שם לו טוקן של המייל שהוא נתן, יוצר משתמש זמני

    public googleAuthentication = async (req: Request, res: Response): Promise<GoogleUser> => { 
    return await wrap({name: 'AuthController/postSuccsefulAuthentication'}, async () => {
        this.validateCsrf(req);
        const request_credential = req.body.credential
        const ticket = await this.verifyGoogleToken(request_credential);
        const google_user: GoogleUser = this.extractGoogleUserFromToken(ticket);
        res.redirect("/");
        return google_user;
    })}


    private extractGoogleUserFromToken(ticket) {
    return wrapSync({name: 'AuthController/extractGoogleUserFromToken'}, () => {
        const payload = ticket.getPayload();
        console.log(payload);
        if (!payload || !payload.name || !payload.family_name || !payload.email) {
            throw new Error("GoogleUser is not valid");
        }
        const google_user: GoogleUser = {
            name: payload.name as string,
            family_name: payload.family_name,
            email: payload.email
        };
        return google_user;
    })}


    private async verifyGoogleToken(request_credential: any) {
    return wrap ({name: 'AuthController/verifyGoogleToken'}, async () => {
        return await this.google_client.verifyIdToken({
            idToken: request_credential,
            audience: config.system.envirnment.GOOGLE_CLIENT_ID
        });
    })}


    private validateCsrf(req) {
    wrapSync({name: 'AuthController/validateCsrf'}, () => {
        const body_csrf_token = req.body.g_csrf_token;
        const cookie_csrf_token = req.cookies.g_csrf_token;
        const csrf_tokens_are_valid = body_csrf_token && cookie_csrf_token && body_csrf_token === cookie_csrf_token;
        if (!csrf_tokens_are_valid) {
            const error = create_error("document was not deleted"); //TODO: create real error, TODO: currently the error stack in not presented
            throw error;
        }
    })}



    private signJwt = (payload: JwtPayload): string => {
        const secret =  config.system.envirnment.GOOGLE_CLIENT_ID
        const signing_options = { expiresIn: "1h" }
        const jwt_sign_props = [payload, secret, signing_options]
        const token = jwt.sign(...jwt_sign_props);
        return token
    }

    private ValidateAndDecodeJwt = (token: string): JwtPayload => {
        const jwt_payload = jwt.verify(token, config.system.envirnment.JWT_SECRET);
        return jwt_payload
    }


    private hashPassword = (password: string) : any => { // todo: check with the bcrype docs what does 'hashSync' returns
        const hashed_password = bcrypt.hashSync(password, 8);   //'//Hash the password, to securely store on DB'
    }
  
    private validate_password_are_equal = (user_paswword_from_db: string, user_password_from_request: string): void => {
        const password_are_equal = bcrypt.compareSync(user_paswword_from_db, user_password_from_request); //todo: what not simply 'const password_are_equal = user_paswword_from_db==user_password_from_request'? i think the password are saved hashed
        if(!password_are_equal)
            throw new Error("shuold be a structured error")
    }
  


    


}
    


