<template>
<div class="section">
    <div class="container">
        <span class="rt remove"><button class="removeButton is-danger" @click="removePlayer(index)" size="is-small"><span><i class="fas fa-user-times"></i></span></button></span>
        <div class="AddPlayer">

            <b-field label="Player Name">
                <!-- <b-input v-model="player.firstName"></b-input> -->
                <b-autocomplete rounded v-model="player.username" :data="filteredDataArray" icon="user" clearable @select="option => selected = option">
                    <template slot="empty">No results found</template>
                </b-autocomplete>
            </b-field>

        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        index: Number,
        users: Array,
        player: Object
    },
    methods: {
        removePlayer(index) {
            let _self = this;
            _self.$root.$emit('RemovePlayer', index)

        }
    },
    data() {
        return {
            name: '',
            selected: null,
            userNames: []
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
        'selected'(to) {
            console.log(to)
        }
    }
}
</script>

<style>

</style>
