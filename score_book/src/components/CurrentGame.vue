<template>
<div class="section">

    <div v-if="snapshot !== null">
        <div class="columns is-centered">
            <div class="column is-half">
                <h1 class="title">{{snapshot.title.title}}</h1>
                <figure class="timer">
                 <!-- <p> {{formattedElapsedTime}}</p> -->
                </figure>
                <b-button rounded type="is-danger" @click="endGame">End Game</b-button>
            </div>
        </div>
        <div class="columns">
            <div class="column" v-for="(player, index) in snapshot.players" :key="index">
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
        }
    },
    methods: {
        endGame() {
            let _self = this;
            clearInterval(_self.timer);
            _self.isGameOver = true
            let maxScore = Math.max.apply(Math, _self.game.players.map((player) => {
                return player.score
            }));
            let winner = _self.getWinner(maxScore)
            _self.game.winner = winner.username;
            _self.game.time = _self.elapsedTime;

            _self.$buefy.toast.open({
                duration: 5000,
                message: `${winner.username} is the winner!`,
                type: 'is-success'
            });

            let game = {
                winner: _self.game.winner,
                elapsedTime: _self.game.time
            }
            game = Object.assign({}, game);
            db.collection('games').add({
                game: game
            }).then(() => {
                console.log('game saved')
            }).catch(err => {
                console.error('game could not be saved. ', err)
            })
        },
        updatePoints(player) {

            var updates = {};
            updates[`games/players/${player.username}/score`] = player.score
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
