export default {
  props:['book'],
  template: `
      <section v-bind:style="{ backgroundImage: 'url(' + book.thumbnail + ')' } " class="book-preview">
          <h3 class='bookTitle'>{{ book.title }}</h3>
          <h5>{{ book.listPrice.amount }} {{ CurrencyDisplay }}</h5>
          
      </section>
  `,computed: {
        CurrencyDisplay(){
            let currency = this.book.listPrice.currencyCode
            if(currency === 'EUR') currency = '€'
            else if (currency === 'ILS') currency = '₪'
            else currency = '$'
            return currency
        }
    },
}