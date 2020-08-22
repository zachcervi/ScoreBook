import Vue from 'vue'
import Router from 'vue-router';
import LeaderBoard from '@/components/LeaderBoard';
import GameDashboard from '@/components/GameDashboard';
import Home from '@/components/Home'
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
        }
    ]
})

export default router;