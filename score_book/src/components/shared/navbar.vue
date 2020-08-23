<template>
<b-navbar>
    <template slot="brand">
        <b-navbar-item tag="router-link" :to="{path: '/'}">
            ScoreBook <i class="fas fa-dice logo"></i>
        </b-navbar-item>
    </template>
    <template slot="start">
        <b-navbar-item v-if="user" href="#" tag="router-link" :to="{ path: '/GameDashboard' }">
            Game Dashboard
        </b-navbar-item>
        <b-navbar-item v-if="user" href="#" tag="router-link" :to="{path: '/LeaderBoard'}">
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
                <a v-if="!user" class="button is-primary" @click="SignUp">
                    <strong>Sign up</strong>
                </a>
                <a v-if="!user" class="button is-light" @click="Login">
                    Log in
                </a>
                <a v-if="user" class="userProfile" @click="Profile">{{userProfile.name}}</a>
                <a v-if="user" @click="Logout">Logout</a>
            </div>
        </b-navbar-item>
    </template>
</b-navbar>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
    created() {
        let _self = this;
        firebase.auth().onAuthStateChanged(user => {

            if (user) {
                _self.user = user;
                let ref = db.collection('users');
                ref.where('user_id', '==', firebase.auth().currentUser.uid)
                    .get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            (this.userProfile = doc.data()), (this.userProfile.id = doc.id);
                        })
                    })
            } else {
                _self.user = null;
            }
        });

    },
    data() {
        return {
            user: null,
            userProfile: null
        }
    },
    methods: {
        SignUp() {
            let _self = this;
            _self.$router.push({
                name: 'SignUp'
            })
        },
        Login() {
            let _self = this;
            _self.$router.push({
                name: 'Login'
            })
        },
        Logout() {
            let _self = this;
            firebase.auth().signOut()
                .then(() => {
                    _self.$router.push({
                        name: 'Login'
                    })
                })
        },
        Profile() {
            let _self = this;
            _self.$router.push({name: 'Profile'})
        }
    }
}
</script>

<style>
.logo {
    font-size: 30px;
    margin-left: 5px;
}
.userProfile {
    margin-right: 10px;
}
</style>
