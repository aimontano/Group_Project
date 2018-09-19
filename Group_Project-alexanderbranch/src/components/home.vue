<template>

    <div class="container-fluid h-100 d-flex flex-column" id="app">
        <div class="row">
            <div class="col-12" id="navbar-column">
                <NavBar></NavBar>
            </div>
        </div>

        <div class="row flex-fill d-flex">
            <div class="col-12">
                <Map></Map>
            </div>
        </div>
        <Chat></Chat>
    </div>

</template>


<script>

import NavBar from './nav.vue'
import Map from './map.vue'
import Chat from './chat.vue'

export default {
    name: 'Home',
    components: {
        NavBar,
        Map,
        Chat
    },
    created: function() {
        const currentUser = firebase.auth().currentUser;
        if (currentUser === null) {
            this.$router.push({ path: '/' });
        }
        else {
            const userId = currentUser.uid;
            const userRef = firebase.database().ref('/users/' + userId);
            
            userRef.once('value').then((snapshot) => {
                var userObject = snapshot.val();
                const currentUser = firebase.auth().currentUser
                console.log('current user', currentUser);

            

            
                var uid = firebase.auth().currentUser.uid;
                var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

                var isOfflineForDatabase = {
                    state: 'offline',
                    last_changed: firebase.database.ServerValue.TIMESTAMP,
                    name: userObject.userName
                };

                var isOnlineForDatabase = {
                    state: 'online',
                    last_changed: firebase.database.ServerValue.TIMESTAMP,
                    name: userObject.userName
                };

                firebase.database().ref('.info/connected').on('value', (snapshot) => {
                    // If we're not currently connected, don't do anything.
                    if (snapshot.val() == false) {
                        return;
                    };

                    // If we are currently connected, then use the 'onDisconnect()' 
                    // method to add a set which will only trigger once this 
                    // client has disconnected by closing the app, 
                    // losing internet, or any other means.
                    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                        userStatusDatabaseRef.update(isOnlineForDatabase);
                    });
                    this.checkForOnlineUsers();
                });
            });
        }
    },
    data() {
        return {
            title: 'Donde',
            showUserList: false,
            onlineUsers: []
        }
    },
    methods: {
        minimize: function() {

        },
        checkForOnlineUsers: function() {
            const ref = firebase.database().ref('/status/');
            ref.orderByChild('state').equalTo('online').on('child_added', (snapshot) => {
                console.log('checkforonlineuser', snapshot.val());
                this.onlineUsers.push(snapshot.val().name);
                console.log('online users array', this.onlineUsers);
            })
        }
    }
}


</script>

<style scoped>

#navbar-column {
    padding: 0;
}
</style>