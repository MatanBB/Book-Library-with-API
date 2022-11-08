import { bookService } from "../services/book-service.js"
import bookReview from '../cmp/book-review.cmp.js'
export default {
  template: `
      <section v-if="book" class="book-details">
          <h1>{{ book.title }}</h1>
          <h3>Written by: {{ bookAuthors }}</h3>
          <h3>Categories: {{ bookCategories }}</h3>
          <h3>{{ book.description }}</h3>
          <h3>Language: {{ book.language }}</h3>
          <h3>{{ bookPageCount }} ({{ this.book.pageCount }} Pages)</h3>
          <h3>Released in: {{ book.publishedDate}} {{publishedDate}}</h3>
          <h3><span :style= "[price ? [price==='black'?{color:'black'}:{color:'red'}] : [price==='black'?{color:'black'}:{color:'green'}]]">
            {{ book.listPrice.amount }} {{CurrencyDisplay}}</span>{{checkSale}}<img 
           class="SalePicture" v-if="onSale" src="Pictures/SALE.jpg" alt=""></h3>
          <img :src="book.thumbnail" alt="">
          <div class="pagingBtns">
          <router-link :to.prevent="'/book/'+prevBookId"><button>Previous Book</button></router-link>
          <router-link :to.prevent="'/book/'+nextBookId"><button>Next Book</button></router-link>
          </div>
          <router-link to='/book'><button class="closeBtn">Close</button></router-link>
          <book-review v-bind:bookId ="book.id"/>
      </section>
      <h1 v-else >Loading ...</h1>
  `, data() {
    return {
      onSale: false,
      nextBookId:null,
      prevBookId: null,
      book:null,
    }
  },
  components:{
    bookReview
  },
  created(){
   this.loadBooks()
  },
  methods:{
    loadBooks(){
      bookService.get(this.bookId)
       .then(book=> {
        this.book = book
        bookService.getPrevBookId(this.book.id)
        .then(prevBookId => { 
          this.prevBookId = prevBookId

        })
        bookService.getNextBookId(this.book.id)
        .then(nextBookId => {
          this.nextBookId = nextBookId
        })
      })
       .catch(err => console.log(err))
    }
  },
  computed: {
    bookId(){
      return this.$route.params.id
    },
    price() {
      let price = this.book.listPrice.amount
      if (price > 150) return true
      if (price < 20) return false
      else return 'black'
    },
    bookAuthors() {
      return this.book.authors.toString()
    },
    bookCategories() {
      return this.book.categories.toString()
    },
    bookPageCount() {
      let pageCount = this.book.pageCount.toString()
      if (pageCount > 500) return 'Long Reading'
      else if (pageCount > 200) return 'Decent Reading'
      else return 'Light Reading'
    },
    CurrencyDisplay() {
      let currency = this.book.listPrice.currencyCode
      if (currency === 'EUR') currency = '€'
      else if (currency === 'ILS') currency = '₪'
      else currency = '$'
      return currency
    },
    publishedDate() {
      let PublishedTime = this.book.publishedDate
      let a = new Date()
      let Distance = a.getFullYear() - PublishedTime
      if (Distance < 1) return ' (New Book)'
      if (Distance > 10) return ' (Veteran Book)'
    },
    checkSale() {
      if (this.book.listPrice.isOnSale) this.onSale = true
      else this.onSale = false
    }
  },
  watch:{
    bookId(){
      console.log('book id changed')
      this.loadBooks()
    }
  }
}