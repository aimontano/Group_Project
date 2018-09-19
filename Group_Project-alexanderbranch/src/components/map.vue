<template>

    <div id="set-map" class="h-100">
      <div id="map-user-inp">
        <div id="c-user" :style="'color:' + Tags.color">{{ Tags.CUser }}</div>
        Name: <input v-model="Tags.UserInput" type="text" name="name" id="user-name">
        <button v-on:click.prevent="GetUserName()" id="submit-name" type="button">submit</button>
        <div>{{ Tags.UserMess }}</div>
        <!-- <div v-for="(m, index) in Markers" :key="index">
            {{ index }}
        </div> -->
      </div>
      <GmapMap
        v-if="userId"
        :center="Pos"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in Markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
            />
        </GmapMap>
    </div>
    
    
    
</template>

<script>

export default {
    name: 'Map',
    created: function() {
        // var pos;
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         pos = {
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude
        //         };
        //         this.userPosition = pos;
        //         console.log(pos);
        //         console.log(this.userPosition);
        //         this.addMarker({
        //             position: pos
        //         });
        //     });
        // }
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            this.userId = userId;
            const userRef = firebase.database().ref('/users/' + userId);

            userRef.once('value').then((snapshot) => {
                console.log(snapshot.val());
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        console.log('position', position);
                        var userPosition = {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude
                        };
                        console.log(this.Pos);
                        var userObject = snapshot.val();
                        this.persistLocation(userId, userObject.userName, userPosition);
                    });
                }
            });
            this.GetMarkers();
        }
        

        
        
    },
    data() {
        return {
            // title: 'Map',
            // userPosition: {lat:10, lng:10},
            // markers: []
            Database: firebase.database(),
            userId: null,
            Pos: {
                lat: 0,
                lng: 0
            },
            Tags: {
                UserInput: '',
                UserMess: 'Login By User Name',
                color: 'green',
                CUser: ''
            },
            Mess: {
                1: "Field ID Empty",
                2: "User Location Has Been Updated",
                3: "User Not Found (New User Is Added)",
                4: "Hello"
            },
            Markers: [],
            Map: null,
            Bounds: {},
            UserName: 'default',
            UserData: {},
            CUserData: {},
            Config: {
                apiKey:            "AIzaSyD4Knjz8L7b6Tbk9Ipe6lcaSMwFWPZzMfA",
                authDomain:        "mapmarkers-dba7e.firebaseapp.com",
                databaseURL:       "https://mapmarkers-dba7e.firebaseio.com",
                projectId:         "mapmarkers-dba7e",
                storageBucket:     "mapmarkers-dba7e.appspot.com",
                messagingSenderId: "1047905061223",
                dataBase:          "userMarkers"
            }
        }
    },
    methods: {
        // addMarker: function(markerObject) {
        //     this.markers.push(markerObject);
        // } 
        GetUserName: function() {
            this.UserName = this.Tags.UserInput;
            if (this.UserName == '') {
                this.SetMess(1, 2);
            } else if (this.CheckUser()) {
                this.SetMess(2, 1);
                this.UserEvent();
            } else {
                this.SetMess(3, 1);
                this.UserEvent();
            }
        },
        SetMess: function(MessID, Type) {
            // this.Tags.UserMess.style.color = Type == 1 ? 'green' : 'red' });
            if (Type == 1) {
                // this.Tags.UserMess.style.color = 'green';
            } else {
                // this.Tags.UserMess.style.color = 'red';
            }
            this.Tags.UserMess = this.Mess[MessID];
        },
        GetMarkers: function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log('position', position);
                    this.Pos = {
                        lng: position.coords.longitude,
                        lat: position.coords.latitude
                    };
                    console.log(this.Pos);
                    this.Load();
                    this.GetUserName();
                });
            }
        },
        CheckUser: function() {
            if (this.UserData[this.UserName]) {
                this.CUserData = this.UserData[this.UserName];
                return true;
            }
            return false;
        },
        Load: function() {
            // this.Database = firebase.initializeApp(this.Config);
            // this.Database = this.Database.database();

            // this.GetMarker();

            this.Database.ref(this.Config.dataBase).on("value", (snapshot) => {
                console.log(snapshot.val());
                this.UserData = snapshot.val();
                // this.GetMarker();
                for (var key in this.UserData ) {
                    if (this.UserData.hasOwnProperty(key)) {
                        this.AddAllMarkers(this.UserData[key].lat, this.UserData[key].lng);
                    }
                }

                // this.Map.fitBounds(this.Bounds);
            });
        },
        // UserEvent: function() {
        //     this.Database.ref("/"+this.Config.dataBase+"/"+this.UserName).set({
        //         name: this.UserName,
        //         icon: "userIcon",
        //         lat: this.Pos.lat,
        //         lng: this.Pos.lng
        //     });
        //     this.SayHi();
        // },
        persistLocation: function(userId, username, position) {
            this.Database.ref("/"+this.Config.dataBase+"/"+userId).update({
                name: username,
                lat: position.lat,
                lng: position.lng
            });
        },
        SayHi: function() {
            this.Tags.CUser = this.Mess[4]+this.UserName;
        },
        GetMarker: function() {
            // this.Map = new google.maps.Map(document.getElementById("map"), {
                this.center = {lat: this.Pos.lat, lng: this.Pos.lng},
                this.zoom = 9
                console.log(this.center);
            // });
            this.Bounds = new google.maps.LatLngBounds({lat: this.Pos.lat, lng: this.Pos.lng});

            this.AddAllMarkers(this.Pos.lat, this.Pos.lng);
        },
        AddAllMarkers: function(lat, lng) {
            if (lat == undefined || lng == undefined) return;

            this.Markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng)
            }));

            // for(i=0; i < this.Markers.length; i++) {
            //     var m = this.Markers[i];
            //     m.setMap(this.Map);

                // google.maps.event.addListener(m,'click',function(){
                //     loadMap.Map.setZoom(8);
                //     loadMap.Map.setCenter(m.getPosition());
                // });
            // }
            // this.Bounds.extend({lat: lat, lng: lng});
        }
    }
}

// var loadMap = {
    // Pos: {
    //     lat: null,
    //     lng: null
    // },
    // Tags : {
    //     UserInput: "#user-name",
    //     SubmitButton: "#submit-name",
    //     UserMess: "#user-mess",
    //     CUser: "#c-user"
    // },
    // Mess : {
    //     1: "Fieled id empty",
    //     2: "User Location has been updated",
    //     3: "User not found (new user is added).",
    //     4: "hello "
    // },
    // Markers : [],
    // Map: null,
    // Database: null,
    // Bounds: {},
    // UserName: 'default',
    // UserData: {},
    // CUserData: {},
    // GetUserName: function () {
    //     $(loadMap.Tags.SubmitButton).on('click', function () {
    //         loadMap.UserName = $(loadMap.Tags.UserInput).val();
    //         if (loadMap.Tags.UserName == "") {
    //             loadMap.SetMess(1, 2);
    //         } else if (loadMap.CheckUser()) {
    //             loadMap.SetMess(2, 1);
    //             loadMap.UserEvent();
    //         } else {
    //             loadMap.SetMess(3, 1);
    //             loadMap.UserEvent();
    //         }
    //     });
    // },
    // SetMess: function (MessID, Type) {
    //     $(loadMap.Tags.UserMess).css({'color' : Type == 1 ? 'green' : 'red' }).text(loadMap.Mess[MessID]);
    // },
    // GetMarkers : function () {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             loadMap.Pos = {
    //                 lng: position.coords.longitude,
    //                 lat: position.coords.latitude
    //             };
    //             loadMap.Load();
    //             loadMap.GetUserName();
    //         });
    //     }
    // },
    // CheckUser : function () {

    //     if (loadMap.UserData[loadMap.UserName]) {
    //         loadMap.CUserData = loadMap.UserData[loadMap.UserName];
    //         return true;
    //     }

    //      return null;
    // },
    // Load : function () {
    //     loadMap.Database = firebase.initializeApp(loadMap.Config);
    //     loadMap.Database = loadMap.Database.database();

    //     loadMap.GetMarker();

    //     loadMap.Database.ref(loadMap.Config.dataBase).on("value", function(snapshoot){
    //         loadMap.UserData = snapshoot.val();
    //         loadMap.GetMarker();
    //         for (var key in loadMap.UserData ) {
    //             if (loadMap.UserData.hasOwnProperty(key)) {
    //                 loadMap.AddAllMarkers(loadMap.UserData[key].lat, loadMap.UserData[key].lng);
    //             }
    //         }

    //         loadMap.Map.fitBounds(loadMap.Bounds);
    //     });
    // },
    // UserEvent: function () {
    //     loadMap.Database.ref("/"+loadMap.Config.dataBase+"/"+loadMap.UserName).set({
    //         name: loadMap.UserName,
    //         icon: "userIcon",
    //         lat: loadMap.Pos.lat,
    //         lng: loadMap.Pos.lng
    //     });
    //     loadMap.SayHi();
    // },
    // SayHi : function () {
    //     $(loadMap.Tags.CUser).text(loadMap.Mess[4]+loadMap.UserName);
    // },
    // GetMarker : function () {

    //     loadMap.Map = new google.maps.Map(document.getElementById("map"), {
    //         center: {lat: loadMap.Pos.lat, lng: loadMap.Pos.lng},
    //         zoom:9
    //     });
    //     loadMap.Bounds = new google.maps.LatLngBounds({lat: loadMap.Pos.lat, lng: loadMap.Pos.lng});

    //     loadMap.AddAllMarkers(loadMap.Pos.lat, loadMap.Pos.lng);
    // },
//     AddAllMarkers : function (let, lng) {

//         if (let == undefined || lng == undefined) return;

//         loadMap.Markers.push(new google.maps.Marker({
//             position: new google.maps.LatLng(let, lng)
//         }));

//         for(i=0;i< loadMap.Markers.length;i++)
//         {
//             var m = loadMap.Markers[i];
//             m.setMap(loadMap.Map);

//             // google.maps.event.addListener(m,'click',function(){
//             //     loadMap.Map.setZoom(8);
//             //     loadMap.Map.setCenter(m.getPosition());
//             // });
//         }
//         loadMap.Bounds.extend({lat: let, lng: lng});
//     }
// };

// this.GetMarkers();

</script>