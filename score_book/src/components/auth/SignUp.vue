<template>
<div class="section">
    <div class="container">
        <h1 class="header">Sign up for Score Book</h1>
    </div>
    <div class="container signUpCard">
        <section>
            <b-field label="Name">
                <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Email" type="" message="">
                <b-input v-model="email" type="email" value="" maxlength="">
                </b-input>
            </b-field>

            <b-field label="Username">
                <b-input v-model="username" maxlength="30"></b-input>
            </b-field>

            <b-field label="Password">
                <b-input v-model="password" type="password" password-reveal>
                </b-input>
            </b-field>
            <p v-if="feedback">{{feedback}}</p>
            <b-button @click="signUp" rounded>Sign Up</b-button>
        </section>
    </div>
</div>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';
import slufigly from 'slugify';
export default {
    data() {
        return {
            email: null,
            password: null,
            username: null,
            name: null,
            slug: null,
            feedback: null
        }
    },
    methods: {
        signUp() {
            let _self = this;
            if (_self.email && _self.username && _self.password && _self.name) {
                _self.feedback = null;
                _self.slug = slufigly(_self.username, {
                    replacement: "-",
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                });
                let ref = db.collection('users').doc(_self.slug);
                ref.get().then(doc => {
                    if (doc.exists) {
                        _self.feedback = 'That username already exists.'
                    } else {
                        firebase.auth()
                            .createUserWithEmailAndPassword(_self.email, _self.password)
                            .then(cred => {
                                let user = {username: _self.username, user_id: cred.user.uid, name: _self.name}
                                ref.set(Object.assign({}, user))
                            }).then(() => {
                                this.$router.push({
                                    name: 'Profile'
                                })
                            }).catch(err => {
                                console.error(err);
                                _self.feedback = err;
                            })
                    }
                })
            } else {
                _self.feedback = 'Please fill in all fields.'
            }
        }
    }
}
</script>

<style>

</style>
