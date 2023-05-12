const {ApolloServer} = require('apollo-server');
const mongoose= require('mongoose')

const MONGODB='mongodb+srv://nameera:khan6466@cluster0.arfwhew.mongodb.net/?retryWrites=true&w=majority'

const typeDefs=require('./garphql/typeDefs')
const resolvers=require('./garphql/resolvers')
const server= new ApolloServer({
    typeDefs,resolvers
})
mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(()=>{
    console.log("MongoDB connect successful")
    return server.listen({port: 4000})
})
.then((res)=>{
    console.log(`server running on port ${res.url}`)
})