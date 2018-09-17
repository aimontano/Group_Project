<template>

    <div>
        <NavBar></NavBar>
        <!-- <Map></Map> -->
        <Chat></Chat>
    </div>

</template>


<script>

import NavBar from './nav.vue'
// import Map from './map.vue'
import Chat from './chat.vue'

export default {
    name: 'Home',
    components: {
        NavBar,
        Map,
        Chat
    },
    data() {
        return {
            title: 'Donde'
        }
    },
    methods: {

    }
}


</script>