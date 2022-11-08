import { bookService } from '../services/book-service.js'
import { utilService } from '../services/util-service.js'
export default {
  props: ['options'],
  template: `
      <section class="send-msg">
      <label for="bookSearch">Online search book: </label>
      <input @change="renderSearches" v-model='txt' list="booksSearch" id="bookSearch" name="bookSearch">
      <div class="searchResult" v-for="option in options">
        <p>{{ option.volumeInfo.title.slice(0,20) }}</p>
        <button @click="addBook(option)">+</button>
      </div>
      </section>
  `,
  created(){
    
  },
  data() {
    return {
      txt:''
    }
  },
  methods:{
    renderSearches(){
      axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.txt}`)
      .then((res)=> {
        utilService.saveToStorage('Searches',res.data)
        this.$emit('update')
      })
    },
    addBook(book){
      let bookInfo = bookService.renderBook(book)
      let bookList = bookService.query().then((list) => {
        return list})
      .then((list)=>{
        bookList = list
        bookList.push(bookInfo)
        utilService.saveToStorage('books',bookList)
      })
    }
  },
}