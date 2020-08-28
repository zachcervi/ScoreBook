<template>
<div class="section">
    <div class="container">
        <div class="buttonControls">
            <b-button class="inLineButtons" v-if="!gameStarted" rounded type="is-primary" @click="addPlayer">Add Players <span class="buttonIcon"><i class="fas fa-user-plus"></i></span></b-button>

            <div v-if="players.length >= 2 && !gameStarted">
                <b-button @click="startGame" rounded type="is-success">Start Game <span class="buttonIcon"><i class="fas fa-play"></i></span></b-button>
            </div>
            <div v-if="gameStarted && !isGameOver">
                <h1 class="title">{{game.title}}</h1>
                <b-button class="inLineButtons" rounded type="is-danger" @click="endGame">End Game</b-button>
            </div>
            <div v-if="isGameOver">
                <b-button class="inLineButtons" rounded type="is-primary" @click="newGame">New Game</b-button>
            </div>
        </div>
        <div v-if="!gameStarted">
            <div class="container">
                <b-field class="title" label="Title">
                    <b-input v-model="game.title"></b-input>
                </b-field>
            </div>

            <div v-for="(player, index) in players" :key="index">
                <create-player-card :users="users" :players="game.players" :index="index"></create-player-card>
            </div>
        </div>

        <div class="" v-if="gameStarted">

            <section class="section">
               
            </section>

            <div class="section columns">
                <div class="column" v-for="(player, index) in game.players" :key="index">
                    <playing-player class="column" :player="player"></playing-player>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';
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
        _self.$root.$off('Players', _self.addedPlayers)
    },
    created() {
        let _self = this;
        db.collection('users')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let user = doc.data();
                    user.id = doc.id;
                    _self.users.push(user)
                })
            })
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
        addedPlayers(players) {
            let _self = this;
            _self.game.players = players;
        },
        startGame() {
            let _self = this;
            let result = _self.validatePlayers();
            console.log(result)
            _self.gameStarted = true;

            _self.timer = setInterval(() => {
                _self.elapsedTime += 1000;
            }, 1000)

            _self.game.players.forEach(player => {
                firebase.database().ref(`games/players/${player.username}`).set({
                    id: player.id,
                    name: player.name,
                    score: player.score,
                    user_id: player.user_id,
                    username: player.username
                })
            })
        },
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
        getWinner(score) {
            let _self = this;
            for (let i = 0; i < _self.game.players.length; i++) {
                if (_self.game.players[i].score === score) {
                    return _self.game.players[i]
                }
            }
        },
        newGame() {
            let _self = this;
            _self.gameStarted = false;
            _self.game.players.forEach(player => {
                player.score = 0
            })
            _self.game = new Game();
            _self.elapsedTime = 0;
            _self.isGameOver = false;

        },
        validatePlayers() {
            let _self = this;
            var isValid = {
                valid: null,
                message: null
            }
            _self.players.forEach(player => {
                if (player.firstName === null || player.firstName === '') {
                    isValid.valid = false;
                    isValid.message = 'First Name is required.'

                } else if (player.lastName === null || player.lastName === '') {
                    isValid.valid = false;
                    isValid.message = 'Last Name is required.';

                }
            });
            return isValid;
        },
        leaderBoard() {
            let _self = this;
            _self.$router.push({
                name: 'LeaderBoard'
            })
        }

    },
    mounted() {
        let _self = this;
        _self.$root.$on('RemovePlayer', _self.removePlayer)
        _self.$root.$on('Players', _self.addedPlayers)
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
            isGameOver: false,
            winner: '',
            users: []
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

.title {
    margin-top: 10px;
}
</style>
