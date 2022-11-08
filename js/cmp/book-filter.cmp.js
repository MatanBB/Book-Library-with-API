export default {
  template: `
      <section class="book-filter">
        <label>Title Search</label>
          <input 
              @input="filter"
              v-model="filterBy.title" 
              type="text" 
              placeholder="Search">
        <label>Price Search</label>
          <input
              :max = '200'
              :min = '0'
              :title = "filterBy.price" 
              @input="filter"
              v-model="filterBy.price" 
              type="range" 
              placeholder="Search">
      </section>
  `,
  data(){
      return { 
          filterBy: {
              title: '',
              price:'',
          }
      }
  },
  methods : {
      filter(){
          this.$emit('filter', this.filterBy)
      }
  }
}