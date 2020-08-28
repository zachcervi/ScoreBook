<template>
<div class="section">
    <div class="container">
        <span class="rt remove"><button class="removeButton is-danger" @click="removePlayer(index)" size="is-small"><span><i class="fas fa-user-times"></i></span></button></span>
        <div class="AddPlayer">

            <b-field label="Player Name">
                <!-- <b-input v-model="player.firstName"></b-input> -->
                <b-autocomplete rounded v-model="selectedUsername" :data="filteredDataArray" icon="user" clearable @select="option => selectedUsername = option">
                    <template slot="empty">No results found</template>
                </b-autocomplete>
            </b-field>

        </div>
    </div>
</div>
</template>

<script>
import {Player} from '../models/player'
export default {
    props: {
        index: Number,
        users: Array,
        players: Array
    },
    methods: {
        removePlayer(index) {
            let _self = this;
            _self.$root.$emit('RemovePlayer', index)
            _self.players.splice(index, 1)

        },
        mapSelectUserToUserProfile(selectedUsernameUser){
            let _self = this;
            _self.users.forEach(user => {
                if(selectedUsernameUser === user.id){
                    _self.player = user
                    _self.player.score = 0;
                    _self.players.push(_self.player)
                    _self.$root.$emit('Players',_self.players )
                } else {
                    return
                }
            })
        }
    },
    data() {
        return {
            name: '',
            selectedUsername: null,
            userNames: [],
            player: new Player()
        }
    },
    computed: {
        filteredDataArray() {
            let _self = this;
            _self.users.forEach(user => {
                _self.userNames.push(user.id)
            })
            return _self.userNames

        }
    },
    watch: {
        
        'selectedUsername'(to){
            let _self = this;
            _self.mapSelectUserToUserProfile(to)
        }
    }

}
</script>

<style>

</style>
