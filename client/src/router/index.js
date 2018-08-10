import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong'
import EditSong from '@/components/EditSong'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'root',
    //   component: HelloWorld
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/song/new',
      name: 'create-song',
      component: CreateSong
    },
    {
      path: '/song/:songId',
      name: 'view-song',
      component: ViewSong
    },
    {
      path: '/song/edit/:songId',
      name: 'edit-song',
      component: EditSong
    },
    {
      path: '*',
      redirect: 'songs'
    }
  ]
})
