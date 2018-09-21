<template>
    <div class="card" id="user-list" style="width: 18rem;">
        <ul class="list-group list-group-flush">
            <li v-for="(user, index) in onlineUsers" v-bind:key="index" class="list-group-item">
                <button class="btn btn-primary" v-on:click.prevent="$emit('user-selected', index)">{{ user.userName }}</button>
            </li>
        </ul>
        <span v-if="onlineUsers.length === 0">No users online...</span>
    </div>

</template>

<script>

export default {
    name: 'Users',
    props: ['onlineUsers'],
    data() {
        return {
            title: 'Users',
            userList: [],
            selected: []
        }
    },
    methods: {
        
    }
}

</script>

<style scoped>

#user-list {
    position: fixed;
    right: 0;
    top: 55px;
}

</style>