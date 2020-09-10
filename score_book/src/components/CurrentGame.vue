<template>
<div class="section">

    <div v-if="snapshot !== null">
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="title">{{getTitle.title}}</h1>
                <figure class="timer">
                    <!-- <p> {{formattedElapsedTime}}</p> -->
                </figure>
                <b-button rounded type="is-danger" @click="endGame">End Game</b-button>
            </div>
        </div>
        <div class="columns">
            <div class="column" v-for="(player, index) in snapshot[gameId].players" :key="index">
                <playing-player class="column" :player="player"></playing-player>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>There are no current games in play.</h1>
    </div>

</div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';
import PlayingPlayer from './Player'

export default {
    beforeDestroy() {
        let _self = this;
        _self.$root.$off('updatePoints', _self.updatePoints)
    },
    created() {
        let _self = this;
        var database = firebase.database();

        database.ref('games').on('value', snapshot => {
            _self.snapshot = snapshot.val()
        });

        _self.timer = setInterval(() => {
            _self.elapsedTime += 1000;
        }, 1000)
    },
    computed: {
        formattedElapsedTime() {
            const date = new Date(null);
            date.setSeconds(this.elapsedTime / 1000);
            const utc = date.toUTCString();
            return utc.substr(utc.indexOf(":") - 2, 8);
        },
        getTitle() {
            let _self = this;
            _self.gameId = _self.$route.query.id
            return _self.snapshot[_self.gameId].title
        },
        getGameId() {
            let _self = this;
            return _self.gameId = _self.$route.query.id
        }

    },

    components: {
        PlayingPlayer
    },
    data() {
        return {
            snapshot: null,
            elapsedTime: 0,
            timer: undefined,
            gameId: null
        }
    },
    methods: {
        endGame() {
            let _self = this;
        
            let game = {
                date: new Date().toDateString(),
                players: _self.snapshot[_self.gameId].players,
                title: _self.snapshot[_self.gameId].title
            }
            game = Object.assign({}, game);
            db.collection('games').add({
                game: game
            }).then(() => {
                console.log('game saved')
            }).catch(err => {
                console.error('game could not be saved. ', err)
            })
            _self.$router.push({name: 'CreateGame'})
        },
        updatePoints(player) {
            let _self = this;
            var updates = {};
            updates[`games/${_self.gameId}/players/${player.username}/score`] = player.score
            const db = firebase.database().ref();
            db.update(updates)
        }
    },
    mounted() {
        let _self = this;
        _self.$root.$on('updatePoints', _self.updatePoints)
    }
}
</script>

<style>

</style>
