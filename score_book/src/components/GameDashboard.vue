<template>
<div>
    <div class="buttonControls">
        <b-button class="inLineButtons" :disabled="gameStarted" rounded type="is-primary" @click="addPlayer">Add Players <span class="buttonIcon"><i class="fas fa-user-plus"></i></span></b-button>
        <div v-if="players.length >= 2 && !gameStarted">
            <b-button @click="startGame" rounded type="is-success">Start Game <span class="buttonIcon"><i class="fas fa-play"></i></span></b-button>
        </div>
        <div v-if="gameStarted">
            <b-button rounded type="is-danger" @click="endGame">End Game</b-button>
        </div>
    </div>
    <div v-if="!gameStarted">
        <div v-for="(player, index) in players" :key="index">
            <create-player-card :player="player" :index="index"></create-player-card>
        </div>
    </div>
    <div class="section columns" v-if="gameStarted">
        <div class="column" v-for="(player, index) in players" :key="index">
            <playing-player class="column" :player="player"></playing-player>
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
import { Game } from '../models/game'

export default {
    beforeDestroy() {
        let _self = this;
        _self.$root.$off('RemovePlayer', _self.removePlayer)
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
        },
        endGame(){
            let _self = this;
            let maxScore = Math.max.apply(Math, _self.game.players.map((player) => {
                return player.score
            }));
           let winner =  _self.getWinner(maxScore)
           this.$buefy.toast.open({
                   duration: 10000,
                    message: `${winner.firstName} is the winner!`,
                    type: 'is-success'
                })

        },
        getWinner(score){
            let _self = this;
            for(let i = 0; i < _self.game.players.length; i++){
                if(_self.game.players[i].score === score){
                    return _self.game.players[i]
                }
            }
        }
    },
    mounted() {
        let _self = this;
        _self.$root.$on('RemovePlayer', _self.removePlayer)
    },
    components: {
        CreatePlayerCard,
        PlayingPlayer
    },
    data() {
        return {
            players: [],
            gameStarted: false,
            game: new Game()
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
