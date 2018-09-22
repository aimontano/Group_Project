<template>

    <div class="container-fluid h-100 d-flex flex-column" id="app">
        <div class="row">
            <div class="col-12" id="navbar-column">
                <NavBar v-bind:users="onlineUsers.length" v-on:toggle-chat="toggleChat($event)" v-on:toggle-user-list="toggleUserList($event)"></NavBar>
            </div>
        </div>

        <div class="row flex-fill d-flex">
            <div class="col-12">
                <Map v-bind:map-marker-array="mapMarkerArray" v-bind:user-marker="userMarker"></Map>
                <Users v-if="showUserList" v-bind:online-users="onlineUsers" v-on:user-selected="onUserSelected($event)"></Users>
            </div>
        </div>
        <Chat v-if="showChat"></Chat>
    </div>

</template>


<script>

import NavBar from './nav.vue'
import Map from './map.vue'
import Chat from './chat.vue'
import Users from './users.vue'

export default {
    name: 'Home',
    components: {
        NavBar,
        Map,
        Chat,
        Users
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
            
                var uid = firebase.auth().currentUser.uid;
                this.userId = uid;
                var userStatusDatabaseRef = firebase.database().ref('/users/' + uid);
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

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        var userPosition = {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude
                        };
                        var userObject = snapshot.val();
                        this.userMarker = userPosition;
                        console.log('this.userMarker', this.userMarker);
                        this.persistLocation(userId, userObject.userName, userPosition).then(() => {
                            firebase.database().ref('.info/connected').on('value', (snapshot) => {
                                // If we're not currently connected, don't do anything.
                                if (snapshot.val() == false) {
                                    return;
                                };

                                // If we are currently connected, then use the 'onDisconnect()' 
                                // method to add a set which will only trigger once this 
                                // client has disconnected by closing the app, 
                                // losing internet, or any other means.
                                userStatusDatabaseRef.onDisconnect().update(isOfflineForDatabase).then(function() {
                                    userStatusDatabaseRef.update(isOnlineForDatabase);
                                });
                                this.checkForOnlineUsers();
                            });
                        });
                        
                    });
                }
            });
        }
    },
    data() {
        return {
            title: 'Donde',
            showUserList: false,
            showChat: false,
            userId: '',
            onlineUsers: [],
            mapMarkerArray: [],
            userMarker: null
        }
    },
    methods: {
        minimize: function() {

        },
        checkForOnlineUsers: function() {
            const ref = firebase.database().ref('/users/');
            ref.orderByChild('state').equalTo('online').on('child_added', (snapshot) => {
                const user = snapshot.val();
                user.id = snapshot.key;

                // is current user, so go ahead and push to mapMarkerArray
                if (snapshot.key === this.userId) {
                    // this.userMarker = user;
                } else {
                    //otherwise add to list of online users
                    this.onlineUsers.push(user);
                }
            });


            ref.orderByChild('state').equalTo('online').on('child_removed', (snapshot) => {
                const id = snapshot.key;
                for (let i = 0; i < this.onlineUsers.length; i++) {
                    if (this.onlineUsers[i].id == id) {
                        this.onlineUsers.splice(i, 1);
                    }
                }
                for (let i = 0; i < this.mapMarkerArray.length; i++) {
                    if (this.mapMarkerArray[i].id == id) {
                        this.mapMarkerArray.splice(i, 1);
                    }
                }
            });
        },
        onUserSelected: function(userIndex) {
            const userObject = this.onlineUsers[userIndex];
            //check if user is already added to mapMarkerArray
            for(let i = 0; i < this.mapMarkerArray.length; i++) {
                if (userObject === this.mapMarkerArray[i]) {
                    this.mapMarkerArray.splice(i, 1);
                    return;
                }
            }

            this.mapMarkerArray.push(userObject);
        },
        toggleUserList: function(showUserList) {
            if (showUserList === true) {
                this.showUserList = true;
            } 
            else {
                this.showUserList = false;
            }
        },
        toggleChat: function(showChat) {
            if (showChat === true) {
                this.showChat = true;
            }
            else {
                this.showChat = false;
            }
        },
        persistLocation: function(userId, username, position) {
            return firebase.database().ref('/users/' + userId).update({
                lat: position.lat,
                lng: position.lng
            });
        },
    }
}


</script>

<style scoped>

#navbar-column {
    padding: 0;
}

</style>