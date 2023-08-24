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
    },

    type Mutation{
        updateBook(id:Int!,title:String,pages:Int!,year:Int,genre:String):Book
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

let updateBook = ({id,title,year,pages,genre})=>{
    books.map( book => {
        if( book.id == id ){
            book.title = title
            book.year = year
            book.pages = pages
            book.genre = genre

            return book
        }
    })
    return books.find(book=>book.id == id)    
}

const root = {
    findAll : ()=> books, 
    findById : (args)=>books.find(book => book.id == args.id ),
    findByGenre : findByGenre,
    updateBook : updateBook    
}

app.use('/graphql',graphqlHTTP({
    schema : schema,
    rootValue : root,
    graphiql : true
}))

const PORT = process.env.PORT || 4500

app.listen(PORT,()=>console.log(`Server Listen at Port ${PORT}`))
