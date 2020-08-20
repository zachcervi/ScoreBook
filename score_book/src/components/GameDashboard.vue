<template>
<div>
    <div class="buttonControls">
        <b-button class="inLineButtons" v-if="!gameStarted" rounded type="is-primary" @click="addPlayer">Add Players <span class="buttonIcon"><i class="fas fa-user-plus"></i></span></b-button>
        <div v-if="players.length >= 2 && !gameStarted">
            <b-button @click="startGame" rounded type="is-success">Start Game <span class="buttonIcon"><i class="fas fa-play"></i></span></b-button>
        </div>
        <div v-if="gameStarted && !isGameOver">
            <b-button class="inLineButtons" rounded type="is-danger" @click="endGame">End Game</b-button>
        </div>
        <div v-if="isGameOver">
            <b-button class="inLineButtons" rounded type="is-primary" @click="newGame">New Game</b-button>
        </div>
    </div>
    <div v-if="!gameStarted">
        <div v-for="(player, index) in players" :key="index">
            <create-player-card :player="player" :index="index"></create-player-card>
        </div>
    </div>
    <div class="" v-if="gameStarted">

        <section class="section">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-half">
                        <figure class="timer">
                            <p> {{formattedElapsedTime}}</p>
                        </figure>
                    </div>
                </div>
            </div>
        </section>

        <div class="section columns">
            <div class="column" v-for="(player, index) in players" :key="index">
                <playing-player class="column" :player="player"></playing-player>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CreatePlayerCard from './CreatePlayerCard'
import PlayingPlayer from './Player'
import {
    Player
} from '../models/player'
import {
    Game
} from '../models/game'

export default {
    beforeDestroy() {
        let _self = this;
        _self.$root.$off('RemovePlayer', _self.removePlayer)
    },
    computed: {
        formattedElapsedTime() {
            const date = new Date(null);
            date.setSeconds(this.elapsedTime / 1000);
            const utc = date.toUTCString();
            return utc.substr(utc.indexOf(":") - 2, 8);
        }
    },
    methods: {
        addPlayer() {
            let _self = this;
            let player = new Player();
            _self.players.push(player)

        },
        removePlayer(index) {
            let _self = this;
            if (_self.players.length > 0) {
                _self.players.splice(index, 1);
            }
        },
        startGame() {
            let _self = this;
            _self.gameStarted = true;
            _self.game.players = _self.players;
            _self.timer = setInterval(() => {
                _self.elapsedTime += 1000;
            }, 1000)
        },
        endGame() {
            let _self = this;
            clearInterval(_self.timer);
            _self.isGameOver = true
            let maxScore = Math.max.apply(Math, _self.game.players.map((player) => {
                return player.score
            }));
            let winner = _self.getWinner(maxScore)
            _self.$buefy.toast.open({
                duration: 7000,
                message: `${winner.firstName} is the winner!`,
                type: 'is-success'
            })
        },
        getWinner(score) {
            let _self = this;
            for (let i = 0; i < _self.game.players.length; i++) {
                if (_self.game.players[i].score === score) {
                    return _self.game.players[i]
                }
            }
        }, 
        newGame(){
            let _self = this;
            _self.gameStarted = false;
            _self.game.players.forEach(player => {
                player.score = 0
            })
            _self.game = new Game();
            _self.elapsedTime = 0;
            _self.isGameOver = false;
            
        }
    },
    mounted() {
        let _self = this;
        _self.$root.$on('RemovePlayer', _self.removePlayer)
    },
    components: {
        CreatePlayerCard,
        PlayingPlayer,

    },
    data() {
        return {
            players: [],
            gameStarted: false,
            game: new Game(),
            elapsedTime: 0,
            timer: undefined,
            isGameOver: false
        }
    }
}
</script>

<style>
.buttonControls {
    display: inline-flex;
 
}

.buttonControls>button {
    margin-left: 10px;
    margin-right: 10px;
}


.players {
    margin-top: 20px;
}
</style>
