import { AuthLogic } from "./base_auth_logic_class";
import {auth_helpers} from './helpers/.'

export class UserService extends AuthLogic{
    constructor(){super()}
    static auth_helper = auth_helpers
}