import { PostsDAL } from "../dal/posts_dal";

export class PostsLogic{
    constructor(){}
    static user_dal = new PostsDAL();
}