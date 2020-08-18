<template>
    <div class="section">
        <div class="container">
            <span class="rt remove"><button class="removeButton is-danger" @click="removePlayer(index)" size="is-small"><span><i class="fas fa-user-times"></i></span></button></span>
        <div class="AddPlayer">
             
            <b-field label="First Name">
                <b-input></b-input>
            </b-field>
            <b-field  label="Last Name">
                <b-input></b-input>
            </b-field>

        </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number
        },
        methods: {
            removePlayer(index){
                console.log(index)
               
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