<template>

    <div class="container-fluid h-100 d-flex flex-column" id="app">
        <div class="row">
            <div class="col-12" id="navbar-column">
                <NavBar></NavBar>
            </div>
        </div>

        <div class="row flex-fill d-flex">
            <div class="col-12">
       
                
                <div id="map">
                <div id="mapgiorgi"></div>
                </div>
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
    mounted() {
    var database1 = firebase.database();
        

        var loadMap = {
        // Config: {
        //     apiKey:            "AIzaSyD4Knjz8L7b6Tbk9Ipe6lcaSMwFWPZzMfA",
        //     authDomain:        "mapmarkers-dba7e.firebaseapp.com",
        //     databaseURL:       "https://mapmarkers-dba7e.firebaseio.com",
        //     projectId:         "mapmarkers-dba7e",
        //     storageBucket:     "mapmarkers-dba7e.appspot.com",
        //     messagingSenderId: "1047905061223",
        //     dataBase:          "userMarkers"
        // },
        Pos: {
            lat: null,
            lng: null
        },
        Map: null,
        Database: null,
        Bounds: {},
        UserName: 'default',
        UserData: {},
        CUserData: {},

        GetMyPos : function () {

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    loadMap.Pos = {
                        lng: position.coords.longitude,
                        lat: position.coords.latitude
                    };
                    loadMap.LoadFromDatabase();
                    loadMap.DrawMap();
                });
            }
        },

        LoadFromDatabase : function () {
            // loadMap.Database = firebase.initializeApp(loadMap.Config);
            // loadMap.Database = loadMap.Database.database();

            loadMap.Database.ref("userMarkers").on("value", function(snapshoot){
                
                loadMap.UserData = snapshoot.val();
                
                for (var key in loadMap.UserData ) {
                    if (loadMap.UserData.hasOwnProperty(key)) {
                        loadMap.AddMarkerOn(loadMap.UserData[key].lat, loadMap.UserData[key].lng);
                    }
                }
                loadMap.Map.fitBounds(loadMap.Bounds);
            });

        },

        //loadMap.Config.dataBase
        UserEvent: function () {
            loadMap.Database.ref("/userMarkers/" + loadMap.UserName).set({
                name: loadMap.UserName,
                icon: "userIcon",
                lat: loadMap.Pos.lat,
                lng: loadMap.Pos.lng
            });
        },

        DrawMap : function () {
            console.log("DrawMap")

            loadMap.Map = new google.maps.Map(document.getElementById("mapgiorgi"), {
                center: {lat: loadMap.Pos.lat, lng: loadMap.Pos.lng},
                zoom:9
            });
            loadMap.Bounds = new google.maps.LatLngBounds({lat: loadMap.Pos.lat, lng: loadMap.Pos.lng});

            loadMap.AddMarkerOn(loadMap.Pos.lat, loadMap.Pos.lng);
        },
        AddMarkerOn : function (lat, lng) {

            if (lat == undefined || lng == undefined) return;

            var newMarker = new google.maps.Marker({position:{lat, lng}});
            newMarker.setMap(loadMap.Map);
            
            google.maps.event.addListener(newMarker,'click',function(){
                loadMap.Map.setZoom(14);
                loadMap.Map.setCenter(newMarker.getPosition());
                loadMap.Map.panTo(this.getPosition());
            });

            loadMap.Bounds.extend({lat: lat, lng: lng});
        }
        };
        loadMap.Database = database1;

        loadMap.GetMyPos();

        console.log("000000000")










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
#map, #mapgiorgi{
    height: 100%;
}

</style>