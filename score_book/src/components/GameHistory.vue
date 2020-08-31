<template>
<div class="section">
    <div class="container">
        <h1 class="header">Game History <i class="fas fa-history"></i></h1>
    </div>
    <div class="container">
        <b-table :data="games" :columns="columns" focusable>
        </b-table>

    </div>
</div>
</template>

<script>
import db from "@/firebase/init";
export default {
    created() {
        let _self = this;
        db.collection('games')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let game = doc.data();  
                _self.games.push(game)
            })
        })
    },
   
    data() {
        return {
            games: [],
            columns: [
                {
                field: 'game.date',
                label: 'Date',
                centerd: true
                }, {
                    field: 'game.players',
                    label: 'Players',
                    centerd: true
                }
            ]
        }
    },
    methods: {
        formatDate(game){
            let gameDate = game.date;
            console.log(gameDate)
        }
    }
   
    
}
</script>

<style>
.header {
    font-size: 30px;
    margin-bottom: 20px;
}
</style>
