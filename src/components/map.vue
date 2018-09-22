<template>

    <div id="set-map" class="h-100">
      <GmapMap
        ref="myMap"
        :center="userPosition"
        :zoom="15"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
        >   
            <GmapMarker
                v-if="userMarker"
                :position="{lat: userMarker.lat, lng: userMarker.lng}"
                :clickable="true"
                :draggable="false"
                @click="center={lat: userMarker.lat, lng: userMarker.lng}"
            />
            <GmapMarker
                :key="index"
                v-for="(m, index) in mapMarkerArray"
                :position="{lat: m.lat, lng: m.lng}"
                :clickable="true"
                :draggable="false"
                @click="center={lat: m.lat, lng: m.lng}"
            />
        </GmapMap>
    </div>
    
    
    
</template>

<script>

export default {
    name: 'Map',
    props: ['mapMarkerArray', 'userMarker'],
    updated: function() {
        this.resetBounds();
    },
    mounted: function() {
        // const currentUser = firebase.auth().currentUser;
        // if (currentUser) {
        //     const userId = currentUser.uid;
        //     this.userId = userId;
        //     const userRef = firebase.database().ref('/users/' + userId);

        //     userRef.once('value').then((snapshot) => {
        //         if (navigator.geolocation) {
        //             navigator.geolocation.getCurrentPosition((position) => {
        //                 var userPosition = {
        //                     lng: position.coords.longitude,
        //                     lat: position.coords.latitude
        //                 };
        //                 var userObject = snapshot.val();
        //                 this.persistLocation(userId, userObject.userName, userPosition);
        //                 this.resetBounds();
        //             });
        //         }
        //     });
        // }
        this.resetBounds();
    },
    data() {
        return {
            userId: null,
            userPosition: {lat: 0, lng: 0}
        }
    },
    methods: {
        resetBounds: function() {
            this.$refs.myMap.$mapPromise.then((map) => {
                const bounds = new google.maps.LatLngBounds();

                for (let i = 0; i < this.mapMarkerArray.length; i++) {
                    bounds.extend({
                        lat: this.mapMarkerArray[i].lat,
                        lng: this.mapMarkerArray[i].lng
                    });
                }
                if (this.userMarker) {
                    bounds.extend(this.userMarker);
                }
                if (this.userMarker || this.mapMarkerArray.length > 0) {
                    this.$refs.myMap.fitBounds(bounds);
                }
            })
        }
    }
}

</script>