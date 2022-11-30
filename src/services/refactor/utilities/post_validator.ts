import { User } from "../../users____/types/users_types"
import { Post } from "../../post_/types"

/**
 * A list of “problematic” words that should trigger an alert when a user writes 1+ of them in a certain post(see Features to implement) 
 */
 export type WatchlistWord = string

 export type Watchlist = Record<WatchlistWord, boolean>
 
 export type WatchlistValidationResult = {
     watchlist_word_found: Record<WatchlistWord, number>,
     watchlist_word_overall_count: number
 }
 
 export type Alert = WatchlistValidationResult & {
     user: User["token"],
     post: Post["token"],
 
 }

export class PostValidator {


    static validate_post(post: Post, watchlist_word: Watchlist): Alert | null{
        
        const post_as_word_list = PostValidator.splitPostToWordsList(post)
        const watchlist_validation_result = PostValidator.validateWordsList(post_as_word_list, watchlist_word)
        
        const is_safe_post = watchlist_validation_result.watchlist_word_overall_count<2

        const result: Alert | null = is_safe_post? null : {
            post: post.token,
            user: post.author,
            watchlist_word_found:{},
            watchlist_word_overall_count:0
        }

        return result
        
    }

    private static splitPostToWordsList(post: Post): string[] {
        const post_as_one_string = this.composeOneStringFromPost(post)
        const result = this.splitStringToWordsList(post_as_one_string)
        return result
    }

    private static composeOneStringFromPost(post:Post){
        const parts_to_validate = [post.body, post.title, post.summary]
        let result = ''
        parts_to_validate.forEach(str => {
            result = result+str+' '
        })
        return result
    }

    private static splitStringToWordsList(str:string):string[]{
        const result = str.split(/(\s+)/).filter( e => e.trim().length > 0)
        return result
    }


    private static validateWordsList(word_list:string[], watchlist_word: Watchlist): WatchlistValidationResult{
        
        const result:WatchlistValidationResult = {
            watchlist_word_found:{},
            watchlist_word_overall_count:0
        }

        word_list.forEach(word => {
            if (watchlist_word[word]){
                if (!result.watchlist_word_found[word]) result.watchlist_word_found[word] = 0
                result.watchlist_word_found[word]++;
                result.watchlist_word_overall_count++
            }
        })
        
        return result
    }

 
}

