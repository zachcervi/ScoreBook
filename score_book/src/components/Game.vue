<template>
<div>
    <div class="buttonControls">
        <b-button  class="inLineButtons" rounded type="is-primary" @click="addPlayer">Add Players <span class="buttonIcon"><i class="fas fa-user-plus"></i></span></b-button>
        <div v-if="players.length >= 2">
            <b-button rounded type="is-success">Start Game <span class="buttonIcon"><i class="fas fa-play"></i></span></b-button>
        </div>
    </div>
    <div v-for="(player, index) in players" :key="index">
        <player-card :index="index" ></player-card>
    </div>
</div>
</template>

<script>
import PlayerCard from './PlayerCard'
import {
    Player
} from '../models/player'

export default {
    methods: {
        addPlayer() {
            let _self = this;
            let player = new Player();
            player.firstName = 'Zach'
            player.lastName = 'Cervi'
            _self.players.push(player)

        }
    },
    components: {
        PlayerCard
    },
    data() {
        return {
            players: []
        }
    }
}
</script>

<style>
.buttonControls {
    display: inline-flex;
}

.buttonControls > button{
 margin-left: 10px;
    margin-right: 10px;
}

</style>
