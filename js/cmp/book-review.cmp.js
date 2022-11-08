import { bookService } from "../services/book-service.js"
export default {
  props: ['bookId'],
  template: `
      <section class="book-review">
        <form>
          <div>
          <label>Reader's Name</label>
          <input placeholder="Reader's name" ref="readerName" type="text" v-model="review.Reviewer">
          </div>
          
          <div>
          <label for="rate">Rate :</label>
          <select name="cars" id="rate" v-model="review.Rate">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          </div>
          
          <div>
          <label>Read At: </label>
          <input type="date" v-model="review.ReadAt">
          </div>

          <div>
          <label>Your Review: </label>
          <textarea rows="8" cols="25" v-model="review.Review" placeholder="Type review here"></textarea>
          </div>

          <button @click.prevent="sendForm($event)">Send review</button>
        </form>
      </section>
  `,
  data(){
    return{
      review:{
        Reviewer:'',
        Rate:'',
        ReadAt:'',
        Review:'',
      }
    }
  },
  mounted() {
    this.$refs.readerName.focus()
  },
  methods:{
    sendForm(){
      console.log(this.review)
      console.log(this.bookId)
      let Book = bookService.get(this.bookId)
      .then(book => {
        book.review = this.review
        return book
      }).then(book => {
        bookService.replace(book)
      } )
    }
  },
}