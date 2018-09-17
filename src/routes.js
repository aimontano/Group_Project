import Login from './components/login.vue'
import Register from './components/register.vue'
import Map from './components/map.vue'
import Users from './components/users.vue'
import Nav from './components/nav.vue'
import Home from './components/home.vue'
import Chat from './components/chat.vue'




export default [
    { path: '/', component: Login },
    { path: '/register/:email', name: 'register', component: Register, props: true },
    { path: '/map', component: Map },
    { path: '/users', component: Users },
    { path: '/nav', component: Nav },
    { path: '/home', component: Home },
    { path: '/chat', component: Chat }
]