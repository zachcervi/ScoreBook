<template>
    <div class="section">
        <div class="container">
            <span class="rt remove"><button class="removeButton is-danger" @click="removePlayer(index)" size="is-small"><span><i class="fas fa-user-times"></i></span></button></span>
        <div class="AddPlayer">
             
            <b-field label="First Name">
                <b-input v-model="player.firstName"></b-input>
            </b-field>
            <b-field  label="Last Name">
                <b-input v-model="player.lastName"></b-input>
            </b-field>

        </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number,
            player: Object
        },
        methods: {
            removePlayer(index){
                let _self = this;
                _self.$root.$emit('RemovePlayer', index)
               
            }
        }
    }
</script>

<style>
.remove {
    margin: 15px;
}
.removeButton {
    border: none;
    color: red;
    background-color: #e5f5f9;
}
</style>