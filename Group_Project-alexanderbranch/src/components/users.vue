<template>
    <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
            <li v-for="(user, index) in onlineUsers" v-bind:key="index" class="list-group-item">{{ userList }}</li>
        </ul>
    </div>

</template>

<script>

export default {
    name: 'Users',
    props: ['onlineUsers'],
    data() {
        return {
            title: 'Users',
            userList: []
        }
    },
    methods: {
        
    }
}

</script>