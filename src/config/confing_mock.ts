import { secret_config } from "./secret_config"

const config = {
    system:{
        api_server:{
            port: 3000,
            corsConfig: {
                origin: true,
                credentials: true,
            },
            rate_limiter:{
                windowMs: 5 * 60 * 1000, // 5 minutes in milliseconds
                max: 100,
                message: "You have exceeded the 1000 requests in 10 minutes limit!", 
                headers: false,
            },
        },
        mongo:{
            connection_props:{
                connection_string: "mongodb://user:pass@mongo:27017",
                databse_name: "wisdo"
            },
            collections: {
                users:'users',
                post: 'post',
                communities: 'communities',
            }
        },
        error_handling:{ //used in development
            return_error_stack_to_client: true, 
            return_native_error_to_client: true, 
            report_unhandled_errors_to_client: true 
        },
        envirnment: {
            GOOGLE_CLIENT_ID:"secret",
            GOOGLE_CLIENT_SECRET:"sercret",
            JWT_SECRET:"ercret"
        },
    },
    bussines:{
        users:{

        },
        communities:{
            max_title_length:60
        },
        post:{
            feed: {
                post_chank_size: 20
            },
            post_validator:{
                max_watchlist_words_for_safe_post: 2
            }
        }
    }
}

config.system.envirnment = secret_config

export {config}
