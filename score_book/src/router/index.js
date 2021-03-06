import Vue from 'vue'
import Router from 'vue-router';
import LeaderBoard from '@/components/LeaderBoard';
import CreateGame from '@/components/CreateGame';
import Home from '@/components/Home'
import SignUp from '@/components/auth/SignUp'
import Login from '@/components/auth/Login'
import Profile from '@/components/user/Profile'
import CurrentGame from '@/components/CurrentGame'
import GameHistory from '@/components/GameHistory'
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/CreateGame',
            name: 'CreateGame',
            component: CreateGame

        },
        {
            path: '/CurrentGame',
            name: 'CurrentGame',
            component: CurrentGame
        },
        {
            path: '/GameHistory',
            name: 'GameHistory',
            component: GameHistory
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