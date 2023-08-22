const express = require('express')

const {graphqlHTTP} = require('express-graphql')

const {buildSchema} = require('graphql')

const {books} = require('./resources/data.json')

console.log( books )

const schema = buildSchema(`
    type Query{
        message : String
    }
`)

const app = express()

const root = {
    message : ()=> "Hello World!!"
}

app.use('/graphql',graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}))

const PORT = process.env.PORT || 4500

app.listen(PORT,()=>console.log(`Server Listen at Port ${PORT}`))