import bookPreview from './book-preview.cmp.js'
import { bookService } from '../services/book-service.js'
import searchBar from '../cmp/search-bar.cmp.js'
export default {
    props: ['books'],
    template: `
        <search-bar
        v-if='results'
        :options = 'results'
        @update = 'updateResults'
        />
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id" class="bookDiv">
                    <book-preview :book="book"/>
                    <section class="actions">
                        <button @click="remove(book.id)">x</button> 
                        <router-link :to="'/book/'+book.id"><button>Details</button></router-link>
                    </section>
                </li>
            </ul>
        </section>
    `,
    created() {
        bookService.queryBooks()
            .then(books => {
                this.results = books.items
            })
    },
    data() {
        return {
            results: null,
            answer: []
        }
    },
    methods: {
        updateResults() {
            bookService.queryBooks()
                .then(books => {
                    this.results = books.items
                })
        },
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        showDetails(book) {
            this.$emit('selected', book)
        }
    },
    components: {
        bookPreview,
        searchBar
    }
}