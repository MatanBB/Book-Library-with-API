const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

import bookApp from './views/book-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import bookDetails from './views/book-details.cmp.js'

import appHeader from './cmp/app-header.cmp.js'

const options = {
    template: `
    <app-header/>
    <router-view/>
    `,
    components: {
        bookApp,
        appHeader,
        bookDetails
    }
}

const routerOptions = {
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:homePage
        },
        {
            path:'/book',
            component:bookApp
        },
        {
            path:'/book/:id',
            component:bookDetails
        },
        {
            path:'/about',
            component:aboutPage
        },   
    ]
}
const app = createApp(options)
const router = createRouter(routerOptions)
app.use(router)
app.mount('#app')
