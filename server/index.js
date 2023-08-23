const express = require('express')

const {graphqlHTTP} = require('express-graphql')

const {buildSchema} = require('graphql')

const {books} = require('./resources/data.json')

const cors = require('cors')

const schema = buildSchema(`
    type Query{
        findAll : [Book]
        findById(id:Int!) : Book
        findByGenre(genre:String) : [Book]
    },

    type Author{
        name : String,
        country : String
    }

    type Book{
        id : Int
        title : String
        author : Author
        pages : Int
        genre : String
        year : Int
    }
`)

const app = express()

app.use(cors())

let findByGenre = (args)=>{
    if( args.genre ){
        
        return books.filter( book => book.genre === args.genre)
    }   
    
    return books
}

const root = {
    findAll : ()=> books, 
    findById : (args)=>books.find(book => book.id == args.id ),
    findByGenre : findByGenre
}

app.use('/graphql',graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}))

const PORT = process.env.PORT || 4500

app.listen(PORT,()=>console.log(`Server Listen at Port ${PORT}`))
