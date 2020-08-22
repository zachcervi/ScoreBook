<template>
<h1>This is the {{user.name}}'s profile page.</h1>
</template>

<script>
import db from "@/firebase/init";
import firebase from 'firebase';
export default {
    data() {
        return {
            user: null
        }
    },
    created() {
        let ref = db.collection('users');
        ref.where('user_id', '==', firebase.auth().currentUser.uid)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    (this.user = doc.data()), (this.user.id = doc.id);
                })
            })
    }
}
</script>

<style>

</style>
