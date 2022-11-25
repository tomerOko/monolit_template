import { wrap } from "../../../utilities/function_wrapping";
import { CreateManyResult, ReadResult } from "../../../utilities/mongo_generic_queris";
import { UserDAL } from "../../users____/dal/users_dal";
import { PostDAL } from "../dal/posts_dal";
import { Post, PostIdFilter } from "../types/posts_types";
import { PostUtils } from "../utilities/posts_utils";

type This = InstanceType<typeof PostService>

export class PostService {

    constructor( 
        private post_dal: PostDAL = new PostDAL(),
        private user_dal: UserDAL = new UserDAL()
    ) {}

    public createPost = async (post: Post):Promise<void> => {
        /**
         * If an uploaded post contains one or more of the watch list words it should “send” an email alert for all the moderators + super moderators.
For the purpose of this exercise you don’t actually have to implement sending emails. instead use the following dummy function:
function sendEmail({ to, subject, body }: { to: string[], subject: string, body: string }) {
  console.log("sendEmail called", {to, subject, body})
}
The email text is not important but it should include a link to the API for fetching the uploaded post (in a real-world app this link would be to the page presenting this post which is not needed for the exercise)
This email alert should not be coupled to adding the actual post – failing to send the alert should not fail adding the post.
         */
    return await wrap<This["createPost"]>({name:"PostService/createPost"}, async()=>{
        PostUtils.generatePostSummaryIfMissing(post)
        const query_result = await this.post_dal.createPost(post)
    })}

    public getPostById = async (filter: PostIdFilter):Promise<Post> => {
    return await wrap<This["getPostById"]>({name:"PostService/createPost"}, async()=>{
        const post = await this.post_dal.getPostBy({token: filter.token})
        if (post.length == 0) throw new Error("post wasnt found");
        if (post.length>1) throw new Error("more then one post found with the same id");
        return post[0]
    })}

    private validatePostOwner = async (post_token: string, user_token: string): Promise<void> => {
        return await wrap<This["validatePostOwner"]>({name:"PostService/validatePostOwner"}, async()=>{
            const user = this.user_dal.getUserBy({token: user_token})
            if (post.length == 0) throw new Error("post wasnt found");
            if (post.length>1) throw new Error("more then one post found with the same id");
    })}

    private validateModerator = async (post_token: string, user_token: string): Promise<void> => {
        return await wrap<This["validatePostOwner"]>({name:"PostService/validatePostOwner"}, async()=>{
            const user = this.user_dal.getUserBy({token: user_token})
            if (post.length == 0) throw new Error("post wasnt found");
            if (post.length>1) throw new Error("more then one post found with the same id");
    })}




}