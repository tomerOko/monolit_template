import { Post } from "../../test/types";

export class Utilities {

    static generatePostSummary(post: Post): Post{
        if(!post.summary) post.summary = post.body.substring(0,100)
        return post
    }

}


