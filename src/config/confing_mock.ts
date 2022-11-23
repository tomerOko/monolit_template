export const config = {
    system:{
        api_server:{
            port: 3000,
            corsConfig: {
                origin: true,
                credentials: true,
            }
        },
        mongo:{
            //TODO: the connection string shuld come from procces.env
            MONGO_URI: "mongodb://user:pass@mongo:27017",
            expected_collections: ['members', 'posts', 'communities']
        },
    },
    bussines:{
        users:{

        },
        communities:{

        },
        posts:{
            feed: {
                post_chank_size: 20
            },
            post_validator:{
                max_watchlist_words_for_safe_post: 2
            }
        }
    }
}
