<template>
<div class="section">
    <div class="container">
        <h1 class="header">Leader Board <i class="fas fa-trophy"></i></h1>
    </div>
    <div class="container">
        <b-table :data="data" :columns="columns" :selected.sync="selected" focusable>
        </b-table>

    </div>

</div>
</template>

<script>
export default {
    data() {
        const data = [{
                'first_name': 'Jesse',
                'last_name': 'Simmons',
                'wins': 10,
                'losses': 2,
                'total_games': 12
            },
            {

                'first_name': 'John',
                'last_name': 'Jacobs',
                'wins': 10,
                'losses': 2,
                'total_games': 12
            },
            {

                'first_name': 'Tina',
                'last_name': 'Gilbert',
                'wins': 10,
                'losses': 2,
                'total_games': 12
            },
            {

                'first_name': 'Clarence',
                'last_name': 'Flores',
                'wins': 10,
                'losses': 2,
                'total_games': 12
            },
            {

                'first_name': 'Anne',
                'last_name': 'Lee',
                'wins': 10,
                'losses': 2,
                'total_games': 12
            }
        ]

        return {
            data,
            selected: data[1],
            columns: [

                {
                    field: 'first_name',
                    label: 'First Name',
                    centered: true
                },
                {
                    field: 'last_name',
                    label: 'Last Name',
                    centered: true
                },
                {
                    field: 'wins',
                    label: 'Wins',
                    centered: true
                },
                {
                    field: 'losses',
                    label: 'Losses',
                    centered: true
                },
                {
                    field: 'total_games',
                    label: 'Total Games',
                    centered: true
                },

            ]
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
