<template>
<div>
    <h1 class="title">{{player.username}}</h1>
    <h2 class="subtitle is-2">{{player.score}}</h2>
    <div class="pointButtons">
        <b-button @click="addPoint()" class="is-success pointButton"><span><i class="fas fa-plus"></i></span></b-button>
        <b-button @click="removePoint()" class="is-danger pointButton"><span><i class="fas fa-minus"></i></span></b-button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        player: Object
    },
    methods: {
        addPoint() {
            let _self = this;
            _self.player.score++;
            _self.update();

        },
        removePoint() {
            let _self = this;
            _self.player.score--;
            _self.update();
        },
        update() {
            let _self = this;
            _self.$root.$emit('updatePoints', _self.player);
        }
    }
}
</script>

<style>
.pointButton {
    margin-right: 5px;
}
</style>
