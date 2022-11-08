import { bookService } from '../services/book-service.js'

import sendMsg from '../cmp/user-msg.cmp.js'
import bookFilter from '../cmp/book-filter.cmp.js'
import bookList from '../cmp/book-list.cmp.js'
import searchBar from '../cmp/search-bar.cmp.js'
export default {
  template: `
    <section v-if="books" class="book-app">
       <h1 class='pageTitle'>Books</h1>
       <book-list 
       :books="booksToShow"
       @selected="selectBook" 
       @remove="removeBook" 
       ></book-list>
       <send-msg></send-msg>
       </section>

    `,
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: {},
    }
  },
  created(){
    bookService.query()
    .then(books =>
      this.books = books)
  },
  methods: {
    removeBook(bookId) {
      bookService.remove(bookId)
      .then(()=> {
      const idx = this.books.findIndex(book => book.id === bookId)
      this.books.splice(idx, 1)
    })

    },
    selectBook(book) {
      this.selectedBook = book
      console.log(this.selectedBook)
    },
    setFilter(filterBy) {
      console.log(filterBy)
      this.filterBy = filterBy
    }
  },
  computed: {
    booksToShow() {
      let bookArr = this.books
      bookArr = this.books.filter(book => book.listPrice.amount>this.filterBy.price? false:book)
      const regex = new RegExp(this.filterBy.title, 'i')
      return bookArr.filter(book => regex.test(book.title))
    }
  },
  components: {
    sendMsg,
    bookFilter,
    bookList,
    searchBar
  }
}