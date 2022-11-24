import { wrap, wrapSync } from "../../../utilities/function_wrapping";
import { logger } from "../../../utilities/logger";

type This = typeof PostUtils
export class PostUtils {

    public static parsePostResponse():void{
    return wrapSync<This["parsePostResponse"]>({name: "PostUtils/parsePostResponse"}, ()=>{

        //some utils machanism
        
    })}

    public static generatePostSummary(post: Post): Post{
        if(!post.summary) post.summary = post.body.substring(0,100)
        return post
    }

}



