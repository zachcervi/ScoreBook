<template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{path: '/'}">
                ScoreBook <i class="fas fa-dice"></i>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#" tag="router-link" :to="{ path: '/GameDashboard' }">
                Game Dashboard
            </b-navbar-item>
            <b-navbar-item href="#" tag="router-link" :to="{path: '/LeaderBoard'}">
                Leader Board
            </b-navbar-item>
            <!-- <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown> -->
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
export default {

}
</script>

<style>

</style>