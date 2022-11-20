export const config = {
    port: 3000,
    mongo:{
        MONGO_URI: "mongodb://root:example@mongo:27017",
        expected_collections: ['members', 'posts', 'communities']
    }
}
