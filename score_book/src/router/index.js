import Vue from 'vue'
import Router from 'vue-router';
import LeaderBoard from '@/components/LeaderBoard';
import GameDashboard from '@/components/GameDashboard';
import Home from '@/components/Home'
import SignUp from '@/components/auth/SignUp'
import Login from '@/components/auth/Login'
import Profile from '@/components/user/Profile'
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/GameDashboard',
            name: 'GameDashboard',
            component: GameDashboard

        },
        {
            path: '/LeaderBoard',
            name: 'LeaderBoard',
            component: LeaderBoard
        },
        {
            path: '/SignUp',
            name: 'SignUp',
            component: SignUp
        }, {
            path: '/Login',
            name: 'Login',
            component: Login
        }, {
            path: '/Profile',
            name: 'Profile',
            component: Profile
        }
    ]
})

export default router;