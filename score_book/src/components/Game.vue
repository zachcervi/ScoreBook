<template>
  <div>
       <b-button type="is-primary" @click="addPlayer">Add Players</b-button>
       <div v-for="(player, index) in players" :key="index">
           <player-card></player-card>
       </div>
  </div> 
</template>

<script>
import PlayerCard from './PlayerCard'
import {Player} from '../models/player'

export default {
methods: {
    addPlayer(){
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
data(){
    return {
        players: []
    }
}
}
</script>

<style>

</style>