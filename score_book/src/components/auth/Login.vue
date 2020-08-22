<template>
<div class="section">
    <div class="container">
        <h1 class="header">Login</h1>
    </div>
    <div class="container loginCard">
        <section>
            <b-field label="Email">
                <b-input type="email" v-model="email">
                </b-input>
            </b-field>
            <b-field label="Password">
                <b-input v-model="password" type="password" value="" password-reveal>
                </b-input>
            </b-field>
            <b-button @click="login" class="loginButton" rounded>Login</b-button>
            <b-button rounded>Forgot Password?</b-button>
        </section>
    </div>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login() {
            let _self = this;
            if (_self.email && _self.password) {
                firebase.auth()
                    .signInWithEmailAndPassword(_self.email, _self.password)
                    .then(cred => {
                        console.log(cred.user);
                        _self.$router.push({
                            name: 'Profile'
                        })
                    }).catch(err => {
                        _self.feedback = err
                    })
            } else {
                _self.feedback = 'You must enter email and password'
            }
        }
    }
}
</script>

<style>
.loginButton {
    margin-right: 10px;
}
</style>
