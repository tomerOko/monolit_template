export const config = {
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
            }
        },
        mongo:{
            connection_props:{
                connection_string: "mongodb://user:pass@mongo:27017",
                databse_name: "wisdo"
            },
            collections: {
                users:'users',
                post: 'post',
                communities: 'communities'
            }
        },
    },
    bussines:{
        users:{

        },
        communities:{

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
