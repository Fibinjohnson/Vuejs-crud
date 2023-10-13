import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../components/HomeWidget.vue"
import LoginForm from "../components/LoginForm.vue"
import AddWidget from "../components/AddWidget.vue"


const routes = [
  {
    path: '/AddUser',
    name :'Adduser',
    component:AddWidget
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter:(to,from,next)=>{
       const user=localStorage.getItem('user')
  
      if(user){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path: '/',
    name: 'login',
    component: LoginForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

