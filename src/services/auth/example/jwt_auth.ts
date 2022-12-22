import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";


const mock_config = {
  jwtSecret: "some_secret"
}

export type auth_collection_document = {
  token: string,
  user_id: string,
  username: string,
  password: string
}

type UserCredentials = auth_collection_document

type AuthParams = {
    username: string, 
    password: string
}

const validateAuthParams = (auth_params: AuthParams) => {
  //todo: throw structured errros if enything not right
}

const getUserCredentialsByUsername = async (user_id: string):Promise<UserCredentials> => {
  return "shuld be a user credentials object" as any as UserCredentials
}

export const validate_user_credentials_and_return_user_id = async (auth_params_from_request: AuthParams): Promise<string> => { //returns token or throw error
  validateAuthParams(auth_params_from_request)
  const user_credentials: UserCredentials = await getUserCredentialsByUsername(auth_params_from_request.username)
  validate_password_are_equal(auth_params_from_request.password, user_credentials.password)
  return user_credentials.user_id
}

export const signJwt = (payload: JwtPayload): string => {
  const secret = mock_config.jwtSecret
  const signing_options = { expiresIn: "1h" }
  const jwt_sign_props = [payload, secret, signing_options]
  const token = jwt.sign(...jwt_sign_props);
  return token
}


const hashPassword = (password: string) : any => { // todo: check with the bcrype docs what does 'hashSync' returns
  const hashed_password = bcrypt.hashSync(password, 8);   //'//Hash the password, to securely store on DB'
}

const validate_password_are_equal = (user_paswword_from_db: string, user_password_from_request: string): void => {
  const password_are_equal = bcrypt.compareSync(user_paswword_from_db, user_password_from_request); //todo: what not simply 'const password_are_equal = user_paswword_from_db==user_password_from_request'? i think the password are saved hashed
  if(!password_are_equal)
    throw new Error("shuold be a structured error")
}

type JwtPayload = Record<string, any>

export const validate_token_authenticity = (token: string):JwtPayload => {
  const jwt_payload = jwt.verify(token, mock_config.jwtSecret);
  return jwt_payload
}


/**
 * 
 * ליצור מסמך קדנטיאלס כשיוזר נרשם עם סיסמא מוצפנת
 * 
 * כשיוזר מתחבר לעשות אן האשינג לסיסמא בדאתאבייס או האשינג לסיסמא שהיוזר שלח ולוודא שהן שוות
 * 
 * בלוגין ובכל בקשה להצמיד ללקוח הדר או משהו בסיגנון עם הטוקן שלו
 * 
 * כל פעם שהיוזר ניגש, לוודא שהטוקן שלו מקורי, שלא נגעו בו, ואם כן מבחינתנו זה היוזר
 */
