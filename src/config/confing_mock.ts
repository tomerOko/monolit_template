export const config = {
    api_server:{
        port: 3000,
    },
    mongo:{
        //TODO: the connection string shuld come from procces.env
        MONGO_URI: "mongodb://user:pass@mongo:27017",
        expected_collections: ['members', 'posts', 'communities']
    }
}
