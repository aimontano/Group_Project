<template>

    <div id="map"></div>

</template>

<script>

export default {
    name: 'Map',
    created: function() {
        console.log('map created');
    },
    data() {
        return {
            title: 'Map'
        }
    },
    methods: {

    }
}

function initMap() {
    var pos;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
    
        var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: pos
        });
    
        var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Your location!'
        });
    })
    }
  
}

</script>