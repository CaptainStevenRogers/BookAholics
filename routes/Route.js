const express = require('express')
const fs = require('fs')
const crypto = require('crypto')

const {body, check, oneOf, validationResult } = require('express-validator');
const router = express.Router()


//This router renders index page 
router.get('/', (_, res) => {
    //First we need to read jsondata
    let books_rawdata = fs.readFileSync('./data/books.json')
    //Then we parse it to array
    let books_data = JSON.parse(books_rawdata)
    res.render('index', {
        books: books_data
    })
})

// GET by ISBN
router.get('/books/:isbn',(req, res) => {
    let books_rawdata = fs.readFileSync('./data/books.json')
    let books_data = JSON.parse(books_rawdata)
    if(!req.params['isbn']) {
        return redirect('/')
    }
    let isbn_code = req.params['isbn']
    const searchedBook = books_data.find(book => book.isbn === isbn_code)
    if(searchedBook) {
        res.render('book', {
            book: searchedBook
        })
    }
    else {
        res.render('no-way')
    }
})


//CREATE
router.get('/book/create', (req, res) => {
    res.render('create')
})

router.post('/books/create-book',   
        body('title').not().isEmpty(),
        body('author').not().isEmpty(),
        body('published').not().isEmpty(),
        body('description').not().isEmpty(), (req, res) => {
            
    let bookCreation = req.body
    let books_rawdata = fs.readFileSync('./data/books.json')
    let books_data = JSON.parse(books_rawdata)
    if (req.body) {
        let newBook = {}
        newBook.isbn = crypto.randomBytes(16).toString("hex");
        newBook.title = bookCreation.title
        newBook.description = bookCreation.description
        newBook.author = bookCreation.author
        newBook.published = bookCreation.published
        books_data.push(newBook)
        let data = JSON.stringify(books_data);
        fs.writeFileSync('./data/books.json', data);
        res.redirect('/')
    }else {
        res.render('no-way') 
    }
})


//Updating by ISBN
router.route('/update/:isbn')
    .get((req, res) => {
        let isbn_code = req.params['isbn']
        let books_rawdata = fs.readFileSync('./data/books.json')
        let books_data = JSON.parse(books_rawdata)
        let book = books_data.find(book=> book.isbn == isbn_code)
        if(book) {
            res.render('edit-book', {book: book})
        }
        else {
            res.render('no-way')
        }
    })
    .put((req, res) => {
        let isbn_code = req.params['isbn']
        let books_rawdata = fs.readFileSync('./data/books.json')
        let books_data = JSON.parse(books_rawdata)
        let book = books_data.find(book=> book.isbn==isbn_code)

        let index_of_book = books_data.indexOf(book)

        books_data[index_of_book].title = req.body.title
        books_data[index_of_book].author = req.body.author
        books_data[index_of_book].descripotion = req.body.descripotion
        books_data[index_of_book].published = req.body.published
        let data = JSON.stringify(books_data);
        fs.writeFileSync('./data/books.json', data);
        res.redirect('/')
})

//Deleteing by ISBN of a book
router.delete('/delete/:isbn', (req, res) => {
        let isbn_code = req.params['id']
        let books_rawdata = fs.readFileSync('./data/books.json')
        let books_data = JSON.parse(books_rawdata)
        let book = books_data.find(book=> book.isbn==isbn_code)
        let index_of_book = books_data.indexOf(book)
        books_data.splice(index_of_book, 1)
        let data = JSON.stringify(books_data);
        fs.writeFileSync('./data/books.json', data);
        res.redirect('/')
})


module.exports = router