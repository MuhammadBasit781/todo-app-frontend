import { createRouter, createWebHistory } from 'vue-router';
import UserDetails from './components/UserDetails'
import UserListing from './components/UserListing'
// import AddressApp from "@/views/AddressApp.vue";
// import TodoApp from "@/views/TodoApp.vue";
const routes = [
    {
        path: '/', component: UserListing
    },
    {
        path: '/users/:userId/details', component: UserDetails
    },
    
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})


export default router;