import { config } from "../../../config/confing_mock";
import { User } from "../../users____/types/users_types";
import { Post } from "../../post_/types";


export class feed {


    constructor(
        private post_chank_size:number = config.bussines.post.feed.post_chank_size
    ){}

    buildUserFeed(user:User): Post[]{
        const currentFeedState = this.getCurrentFeedState()
    }

    buildUserFeedOfOneDay(){}

    getCurrentFeedState(){}

    private getAllPostFromUserComunities(): Post[]{
        //todo:
    }

    private timeCalcualator(){
        const date1 = new Date()
        const date2 = new Date("2013-02-20T12:01:04.753Z")
        var diff = Math.abs(date1.getTime() - date2.getTime());
        var diffDays = diff / (1000 * 3600 * 24); 
        console.log(diffDays)
    }

    private calculatePost

}