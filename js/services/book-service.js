import { utilService } from '../services/util-service.js'
import { storageService } from './async-storage.service.js'
import bookStart from '../../data/books.json' assert {type: 'json'}
import gSearches from '../../data/search.json' assert {type: 'json'}

const SEARCH_KEY = 'Searches'
const BOOKS_KEY = 'books'
_createBooks()
saveBooks()

export const bookService = {
  replace,
  get,
  query,
  remove,
  save,
  getEmptyBook,
  saveBooks,
  queryBooks,
  renderBook,
  getNextBookId,
  getPrevBookId
}

function saveBooks() {
  let ranBooks = utilService.loadFromStorage('Searches')
  if(!ranBooks||!ranBooks.length){
    utilService.saveToStorage(gSearches)
  }else return
}

function queryBooks() {
  return storageService.query(SEARCH_KEY)
}


function query() {
  return storageService.query(BOOKS_KEY)
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function replace(bookId) {
  return storageService.put(BOOKS_KEY, bookId)
}
function remove(bookId) {
  // const books = query()
  // const idx = books.findIndex(book => book.id === bookId)
  // books.splice(idx, 1)
  // utilService.saveToStorage(BOOKS_KEY, books)
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  // book.id = utilService.makeId()
  // const books = query()
  // books.push(book)
  // utilService.saveToStorage(BOOKS_KEY, books)
  // return book
  if (book.id) {
    return storageService.put(BOOKS_KEY, book)
  } else {
    return storageService.post(BOOKS_KEY, book)
  }
}

function getNextBookId(bookId){
  return storageService.query(BOOKS_KEY)
  .then(books =>{
    const idx= books.findIndex(book => bookId === book.id)
    if(idx === books.length-1) idx = -1
    return books[idx+1].id
  })
}

function getPrevBookId(bookId){
  return storageService.query(BOOKS_KEY)
  .then(books =>{
    const idx= books.findIndex(book => bookId === book.id)
    if(idx === 0) idx = books.length-1
    return books[idx-1].id
  })
}

function renderBook(book) {
  let bookInfo = getEmptyBook()
  bookInfo.authors = book.volumeInfo.authors
  bookInfo.categories = book.volumeInfo.categories
  bookInfo.description = book.volumeInfo.description
  bookInfo.id = book.id
  bookInfo.language = book.volumeInfo.language
  bookInfo.listPrice = { amount: Math.floor(Math.random() * 250), currencyCode: 'ILS', isOnSale: false }
  bookInfo.pageCount = book.volumeInfo.pageCount
  bookInfo.publishedDate = book.volumeInfo.publishedDate
  bookInfo.subtitle = book.volumeInfo.subtitle
  bookInfo.thumbnail = book.volumeInfo.imageLinks.thumbnail
  bookInfo.title = book.volumeInfo.title
  bookInfo.title.slice(0,15)
  return bookInfo
}
function getEmptyBook() {
  return {
    id: "",
    title: "",
    subtitle: "",
    authors: [],
    publishedDate: '',
    description: "",
    pageCount: '',
    categories: [],
    thumbnail: "http://coding-academy.org/books-photos/14.jpg",
    language: "sp",
    listPrice: {
      amount: '',
      currencyCode: "ILS",
      isOnSale: false
    }
  }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    books = bookStart
    utilService.saveToStorage(BOOKS_KEY, books)
  }
  console.log('Books To Render', books)
  return books
}

