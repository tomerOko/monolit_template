import { PostDAL } from "../dal/posts_dal";
import {post_helpers} from './helpers/post_helpers_index'

export class PostLogic{
    constructor(){}
    static post_dal = new PostDAL();
    static post_helper = post_helpers
}