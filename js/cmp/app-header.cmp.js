export default {
  template: `
      <section class="appHeader flex-box">
         <h2>BookReviews<span class="styleA" :style="{ 'font-size': '20px','padding-inline-start': '9px' }">.org</span></h2>
         <nav class="navBar flex-box">
          <router-link to="/">Home</router-link>
          <router-link to="/book">Books</router-link>
          <router-link to="/about">About</router-link>
         </nav>
      </section>
  `,
}